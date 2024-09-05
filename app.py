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
        # Fetch Data
        static.response_data = fetch_external_data()
        # Calculate min_max data
        static.response_data = calculateMinMax(static.response_data)
        # Update last_fetched
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


@app.route('/fetchLeague', methods=['GET'])
def fetchLeagueDetails():
    try:
        if static.response_data is None:
            get_data()
        leagueId = request.args.get("league_id")
        leagueDetails = fetchLeague(leagueId)
        return jsonify(leagueDetails)
    except Exception as ex:
        print("Error while fetching league", ex)
        return jsonify({"error": "Failed to team details"}), 500

# if __name__ == '__main__':
#     app.run(debug=False, use_reloader=False)
