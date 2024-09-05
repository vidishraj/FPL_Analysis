import requests

from utils import getCurrentGW, fetchDataFromJson, getTeamIdsForTeam


def fetchLeague(leagueId):
    """We will fill the top 100 in our response"""
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
        while responseJson['standings']["has_next"] and len(responseObject['standings']) < 100:
            page += 1
            responseJson = requests.get(f"https://fantasy.premierleague.com/api/leagues-classic/{leagueId}/standings"
                                        f"/page_standings={page}/").json()
            for item in responseJson['standings']['results']:
                responseObject['standings'].append(item)
        # Top max(playerInLeague, 100) players found. Now fetch the teams individually and calculate the metrics
        responseObject = fetchTeams(responseObject)
        responseObject = calculateMetrics(responseObject)
    return responseObject


def calculateMetrics(leagueDetails):
    for leaguePlayer in leagueDetails['standings']:
        attackScore = 0
        defenseScore = 0
        overallScore = 0
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


def fetchTeams(leagueDetails):
    cgw = getCurrentGW()
    for player in leagueDetails['standings']:
        # fetchTeamDetailsForLastGW
        teamIds = getTeamIdsForTeam(player['entry'], cgw)
        # fetch Corresponding rows in our json
        player['team'] = fetchDataFromJson(teamIds)
    return leagueDetails
