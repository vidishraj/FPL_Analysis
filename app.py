from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import requests

app = Flask(__name__)
CORS(app)

# Initialize the variables
last_fetched = datetime.now()
response_data = None
base_url = 'https://fantasy.premierleague.com/api/'


def fetch_external_data():
    # Call the external endpoint
    external_url = "https://www.fantasyfootballhub.co.uk/player-data/player-data.json"  # Replace with actual external API URL
    try:
        external_response = requests.get(external_url)
        external_response.raise_for_status()  # Raise an error for bad status codes
        return external_response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None


@app.route('/awake', methods=['GET'])
def awake():
    # This request is there to ensure that the server doesn't sleep.
    print("I am awake.")


@app.route('/data', methods=['GET'])
def get_data():
    global last_fetched, response_data

    # Check if an hour has passed or if response is None
    if response_data is None or datetime.now() - last_fetched > timedelta(hours=1):
        print("Fetching data from external API")
        response_data = fetch_external_data()
        last_fetched = datetime.now()
    if response_data:
        return jsonify(response_data)
    else:
        return jsonify({"error": "Failed to fetch data"}), 500


def getTeamIdsForTeam(team_id, gw):
    r = requests.get(base_url + f'entry/{team_id}/event/{gw}/picks/').json()
    return [item['element'] for item in r['picks']]


@app.route('/fetchTeam', methods=['GET'])
def fetchTeamDetails():
    try:
        if response_data is None:
            get_data()
        teamId = request.args.get("team_id")
        # Fetch current gameweek
        cgw = getCurrentGW()

        # fetchTeamDetailsForLastGW
        teamIds = getTeamIdsForTeam(teamId, cgw)
        # fetch Corresponding rows in our json
        teamDetails = fetchDataFromJson(teamIds)

        return jsonify(teamDetails)
    except Exception as ex:
        print(ex)
        return jsonify({"error": "Failed to team details"}), 500


def fetchDataFromJson(teamIds):
    idMap = {}
    response = []
    for playerId in teamIds:
        idMap[playerId] = True
    for playerData in response_data:
        if idMap.get(playerData['fpl']['id']) is not None:
            response.append(playerData)
    return response


def getCurrentGW():
    r = requests.get(base_url + 'bootstrap-static/').json()
    cgw = 1
    for week in r['events']:
        if week['finished']:
            cgw = week['id']
        else:
            break
    if type(cgw) == int:
        return cgw
    else:
        print("CurrentGW not found")
        return -1


if __name__ == '__main__':
    app.run(debug=True)
