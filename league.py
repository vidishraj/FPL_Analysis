import concurrent.futures
import requests

from utils import getCurrentGW, fetchDataFromJson, getTeamIdsForTeam


def fetchLeague(leagueId):
    """We will only fetch the top 100 players and calculate the metrics for them"""
    page = 1
    firstResponse = requests.get(f"https://fantasy.premierleague.com/api/leagues-classic/{leagueId}/standings"
                                 f"/?page_standings={page}")
    responseObject = None
    if firstResponse.status_code == 200:
        responseJson = firstResponse.json()
        responseObject = {
            "leagueId": leagueId,
            "name": responseJson['league']['name'],
            "standings": [item for item in responseJson['standings']['results']]
        }
        try:
            while responseJson['standings']["has_next"] == True and len(responseObject['standings']) < 100:
                page += 1
                responseJson = requests.get(
                    f"https://fantasy.premierleague.com/api/leagues-classic/{leagueId}/standings"
                    f"/page_standings={page}/")
                responseJson = responseJson.json()
                for item in responseJson['standings']['results']:
                    responseObject['standings'].append(item)
        except Exception as ex:
            print("End", ex)
        # Top max(playerInLeague, 100) players found. Now fetch the teams individually
        responseObject = fetchTeams(responseObject)
        # Object filled with each player's team. We calculate the metrics now.
        responseObject = calculateMetrics(responseObject)
    return responseObject


def fetchTeamDetails(player, cgw):
    """Fetch team details for a given player."""
    teamIds = getTeamIdsForTeam(player['entry'], cgw)
    player['team'] = fetchDataFromJson(teamIds)
    return player


def fetchTeams(leagueDetails):
    cgw = getCurrentGW()
    # Use ThreadPoolExecutor for multithreading
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(fetchTeamDetails, player, cgw) for player in leagueDetails['standings']]
        for future in concurrent.futures.as_completed(futures):
            # Might need for later
            player_result = future.result()

    return leagueDetails


def calculateMetrics(leagueDetails):
    for leaguePlayer in leagueDetails['standings']:
        # Score for forwards and midfielders
        attackScore = 0
        # Score for only defenders and gks
        defenseScore = 0
        # Complete team score
        overallScore = 0
        # Find current team value. Add up all the costs
        teamValue = 0
        for player in leaguePlayer['team']:
            teamValue += player['data']['nowCost']
            overallScore += player['fplAnalScores']['total_score']
            if player['data']['positionId'] in [4, 3]:
                attackScore += player['fplAnalScores']['total_score']
            else:
                defenseScore += player['fplAnalScores']['total_score']
        teamValue /= 10
        leaguePlayer['teamValue'] = teamValue
        leaguePlayer['overallScore'] = overallScore
        leaguePlayer['attackScore'] = attackScore
        leaguePlayer['defenseScore'] = defenseScore
    return leagueDetails
