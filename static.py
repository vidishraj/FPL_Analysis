response_data = None
min_max_values = {
    "fpl_ownership": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.5,
            '2': 0.5,
            '3': 0.5,
            '4': 0.5
        }
    },
    "nowCost": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': -0.5,
            '2': -0.5,
            '3': -0.5,
            '4': -0.5
        }
    },
    "next_gw_xmins": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.5,
            '2': 0.5,
            '3': 0.5,
            '4': 0.5
        }
    },
    "weighted_prediction": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.6,
            '2': 0.6,
            '3': 0.6,
            '4': 0.6
        }
    },
    "form": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.6,
            '2': 0.6,
            '3': 0.6,
            '4': 0.6
        }
    },
    "bonus": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.6,
            '2': 0.6,
            '3': 0.6,
            '4': 0.6
        }
    },
    "saves": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.9,
            '2': 0,
            '3': 0,
            '4': 0
        }
    },
    "starts": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.6,
            '2': 0.6,
            '3': 0.6,
            '4': 0.6
        }
    },
    "threat": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.7,
            '2': 0.7,
            '3': 0.7,
            '4': 0.7
        }
    },
    "assists": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.2,
            '2': 0.3,
            '3': 0.7,
            '4': 0.6
        }
    },
    "ict_index": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.2,
            '2': 0.3,
            '3': 0.7,
            '4': 0.6
        }
    },
    "influence": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.6,
            '2': 0.6,
            '3': 0.6,
            '4': 0.6
        }
    },
    "own_goals": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': -0.1,
            '2': -0.1,
            '3': -0.1,
            '4': -0.1
        }
    },
    "red_cards": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': -0.2,
            '2': -0.2,
            '3': -0.2,
            '4': -0.2
        }
    },
    "creativity": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.1,
            '2': 0.3,
            '3': 0.7,
            '4': 0.6
        }
    },
    "threat_rank": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.1,
            '2': 0.2,
            '3': 0.3,
            '4': 0.3
        }
    },
    "clean_sheets": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.9,
            '2': 0.9,
            '3': 0.7,
            '4': 0.4
        }
    },
    "goals_scored": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0,
            '2': 0.3,
            '3': 0.6,
            '4': 0.9
        }
    },
    "total_points": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.7,
            '2': 0.7,
            '3': 0.7,
            '4': 0.7
        }
    },
    "penalties_saved": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.9,
            '2': 0,
            '3': 0,
            '4': 0
        }
    },
    "points_per_game": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.7,
            '2': 0.7,
            '3': 0.7,
            '4': 0.7
        }
    },
    "yellow_cards": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': -0.3,
            '2': -0.3,
            '3': -0.3,
            '4': -0.3
        }
    },
    "expected_goals_per_90": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0,
            '2': 0.3,
            '3': 0.6,
            '4': 0.8
        }
    },
    "goals_conceded_per_90": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': -0.7,
            '2': -0.7,
            '3': -0.4,
            '4': -0.2
        }
    },
    "expected_assists_per_90": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0,
            '2': 0.3,
            '3': 0.7,
            '4': 0.5
        }
    },
    "expected_goal_involvements_per_90": {
        "min": float('inf'),
        "max": float('-inf'),
        "weights": {
            '1': 0.1,
            '2': 0.3,
            '3': 0.7,
            '4': 0.7
        }
    }
}
base_url = 'https://fantasy.premierleague.com/api/'
