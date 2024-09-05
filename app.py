from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import requests

import static
from league import fetchLeague

from utils import getCurrentGW, getTeamIdsForTeam, fetchDataFromJson, calculateMinMax, fetch_external_data

app = Flask(__name__)
CORS(app)
# Initialize the variables

last_fetched = datetime.now()


@app.route('/awake', methods=['GET'])
def awake():
    # This request is there to ensure that the server doesn't sleep.
    print("I am awake.")
    return jsonify({"Message": "I am awake"}), 200


@app.route('/data', methods=['GET'])
def get_data():
    global last_fetched

    # Check if an hour has passed or if response is None
    if static.response_data is None or datetime.now() - last_fetched > timedelta(hours=1):
        print("Fetching data from external API")
        static.response_data = fetch_external_data()
        static.response_data = calculateMinMax(static.response_data)
        last_fetched = datetime.now()
    if static.response_data:
        return jsonify(static.response_data)
    else:
        return jsonify({"error": "Failed to fetch data"}), 500


@app.route('/fetchTeam', methods=['GET'])
def fetchTeamDetails():
    try:
        if static.response_data is None:
            get_data()
        teamId = request.args.get("team_id")
        # Fetch current game week
        cgw = getCurrentGW()

        # fetchTeamDetailsForLastGW
        teamIds = getTeamIdsForTeam(teamId, cgw)
        # fetch Corresponding rows in our json
        teamDetails = fetchDataFromJson(teamIds)

        return jsonify(teamDetails)
    except Exception as ex:
        print(ex)
        return jsonify({"error": "Failed to team details"}), 500


def getCurrentGW():
    try:
        r = session.get(base_url + 'bootstrap-static/')
        print(r.request.headers)
        if r.status_code == 200:
            r = r.json()
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
        else:
            print("Request failed")
            print(r.text, r.request.headers, r.status_code)
    except Exception as ex:
        print(ex)
        return -1


def getTeamIdsForTeam(team_id, gw):
    try:
        r = session.get(base_url + f'entry/{team_id}/event/{gw}/picks/', headers={"User-Agent": "Mozilla/5.0 ("
                                                                                                 "Macintosh; Intel Mac"
                                                                                                 " OS X 10_15_7) "
                                                                                                 "AppleWebKit/537.36 ("
                                                                                                 "KHTML, like Gecko) "
                                                                                                 "Chrome/127.0.0.0 "
                                                                                                 "Safari/537.36"})
        if r.status_code == 200:
            r = r.json()
            return [item['element'] for item in r['picks']]
        else:
            print("Request failed")
            print(r.text, r.request.headers, r.status_code)
            return response_data
    except Exception as ex:
        print(ex)
        return response_data


def fetchDataFromJson(teamIds):
    idMap = {}
    response = []
    for playerId in teamIds:
        idMap[playerId] = True
    for playerData in response_data:
        if idMap.get(playerData['fpl']['id']) is not None:
            response.append(playerData)
    return response


if __name__ == '__main__':
    app.run(debug=True)
