import requests
from bs4 import BeautifulSoup
from datetime import datetime, timezone


def fetchLiveLeague(leagueId):
    """We will only fetch the top 100 players and calculate the metrics for them"""
    page = 1

    current_utc_time = datetime.now(timezone.utc)
    current_timestamp = current_utc_time.timestamp()
    current_timestamp = int(current_timestamp * 1000)
    firstResponse = requests.get(f"https://www.anewpla.net/fpl/league/json.php?id={leagueId}&page={page}&_"
                                 f"={current_timestamp}")
    if firstResponse.status_code == 200:
        responseJson = firstResponse.json()
        responseObject = {
            "leagueId": leagueId,
            "standings": extractData(responseJson['data'])
        }
        try:
            while responseJson['pagination']["more"] and len(responseObject['standings']) < 100:
                page += 1
                responseJson = requests.get(f"https://www.anewpla.net/fpl/league/json.php?id={leagueId}&page={page}"
                                            f"&_={current_timestamp}")
                responseJson = responseJson.json()
                leagueData = extractData(responseJson['data'])
                for item in leagueData:
                    responseObject['standings'].append(item)
            return responseObject
        except Exception as ex:
            print("End", ex)


def clean_html(html):
    soup = BeautifulSoup(html, "html.parser")
    return soup.get_text()


def extract_players(players_html):
    soup = BeautifulSoup(players_html, "html.parser")
    players = []
    for li in soup.find_all('li'):
        name = li.text.strip()
        points = li.find('b')
        if points:
            points = points.text.strip()
        else:
            points = "0"
        players.append({"name": name, "points": points})
    return players


def extractData(data):
    extracted_data = []
    for entry in data:
        extracted_entry = {
            "Rank": clean_html(entry["Rank"]),
            "Movement": clean_html(entry["Movement"]),
            "Name": clean_html(entry["Name"].split("<br />")[1]),  # Extract manager's name
            "Team": entry["Team"],
            "Live Points": entry["Live Points"],
            "Total": entry["Total"],
            "Bank": entry["Bank"],
            "Total Value": entry["Total Value"],
            "Old GW Rank": entry["Old GW Rank"],
            "Old Overall Rank": entry["Old Overall Rank"],
            "Captain": entry["Captain"],
            "Vice-Captain": entry["Vice-Captain"],
            "Transfers": clean_html(entry["Transfers (Cost)"]),
            "Formation": clean_html(entry["Formation / Chip"]),
            "Players": extract_players(entry["Players"])
        }
        extracted_data.append(extracted_entry)
    return extracted_data
