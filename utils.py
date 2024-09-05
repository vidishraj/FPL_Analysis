import requests
import static


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


# Function to update min and max values
def update_min_max(value, attribute):
    if value is not None:
        try:
            # Convert string to float if necessary
            if isinstance(value, str):
                value = float(value)
            static.min_max_values[attribute]["min"] = min(static.min_max_values[attribute]["min"], value)
            static.min_max_values[attribute]["max"] = max(static.min_max_values[attribute]["max"], value)
        except ValueError:
            pass  # Skip invalid data


def calculateMinMax(league_details):
    # Iterate over each player and update min and max values
    for player in league_details:
        # Handle fpl_ownership (it's outside the 'fpl' or 'data' subfields)
        update_min_max(player.get("fpl_ownership"), "fpl_ownership")

        # Attributes inside 'data'
        update_min_max(player["data"].get("nowCost"), "nowCost")
        update_min_max(player["data"].get("next_gw_xmins"), "next_gw_xmins")
        update_min_max(player["data"].get("weighted_prediction"), "weighted_prediction")

        # Attributes inside 'fpl'
        fpl_attrs = player.get("fpl", {})
        for attr in [
            "form", "bonus", "saves", "starts", "threat", "assists", "ict_index", "influence", "own_goals",
            "red_cards", "creativity", "threat_rank", "clean_sheets", "goals_scored", "total_points",
            "penalties_saved", "points_per_game", "yellow_cards", "expected_goals_per_90",
            "goals_conceded_per_90", "expected_assists_per_90", "expected_goal_involvements_per_90"
        ]:
            value = fpl_attrs.get(attr)
            update_min_max(value, attr)

    return calculate_player_scores(league_details, static.min_max_values)


def calculate_player_scores(players, min_max_values):
    for player in players:
        position_id = str(player['data']['positionId'])  # Use positionId from the 'data' field
        total_score = 0

        # Initialize a dictionary to store individual attribute scores
        player_scores = {}

        for attribute, min_max in min_max_values.items():
            if attribute in player['data']:
                # Get the player's value for the current attribute
                player_value = player['data'][attribute]
            elif attribute in player['fpl']:
                player_value = player['fpl'][attribute]
            else:
                player_value = player[attribute]

            # Get min and max values for the attribute
            min_value = min_max["min"]
            max_value = min_max["max"]

            # Avoid division by zero
            if max_value > min_value:
                # Normalize the player's value for the attribute
                normalized_value = (float(player_value) - float(min_value)) / (float(max_value) - float(min_value))
            else:
                normalized_value = 0  # If min == max, the normalized value is 0

            # Get the weight for the player's position
            weight = min_max["weights"].get(position_id, 0)

            # Add the weighted score for the attribute to the total score
            weighted_score = normalized_value * weight
            total_score += weighted_score

            # Store the normalized score and weighted score for the attribute
            player_scores[attribute] = {
                "normalized": normalized_value,
                "weighted_score": weighted_score
            }

        # Store the total score and individual attribute scores in 'fplAnalScores'
        player['fplAnalScores'] = {
            "total_score": total_score,
            "attribute_scores": player_scores
        }

    return players


def getCurrentGW():
    try:
        r = requests.get(static.base_url + 'bootstrap-static/')
        if r.status_code == 200:
            r = r.json()
            cgw = 1
            for week in r['events']:
                if week['finished']:
                    cgw = week['id']
                else:
                    break
            if isinstance(cgw, int):
                print("Current GW found.")
                return cgw
            else:
                print("CurrentGW not found")
                return -1
        else:
            print("Request failed while fetching currentGW")
            print(r.text, r.request.headers, r.status_code)
    except Exception as ex:
        print(ex)
        return -1


def getTeamIdsForTeam(team_id, gw):
    try:
        r = requests.get(static.base_url + f'entry/{team_id}/event/{gw}/picks/', headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/127.0.0.0 Safari/537.36"
        })
        if r.status_code == 200:
            r = r.json()
            return [item['element'] for item in r['picks']]
        else:
            print("Request failed")
            print(r.text, r.request.headers, r.status_code, r.url)
            return static.response_data
    except Exception as ex:
        print(ex)
        return static.response_data


def fetchDataFromJson(team_ids):
    id_map = {}
    response = []
    for player_id in team_ids:
        id_map[player_id] = True
    for player_data in static.response_data:
        if id_map.get(player_data['fpl']['id']) is not None:
            response.append(player_data)
    return response
