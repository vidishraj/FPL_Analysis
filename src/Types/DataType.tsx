export interface Player {
  code: number;
  webName: string;
  searchTerm: string;
  team: Team;
  season: number;
  data: PlayerData;
  fpl: FplData;
  live: LiveData;
  fpl_ownership: number;
  elite_ownership: number;
  elite_ownership_change: number;
  player_pool_status: string;
}

export interface Team {
  code: number;
  name: string;
  codeName: string;
}

export interface PlayerData {
  status: string;
  nowCost: number;
  teamCode: number;
  priceInfo: PriceInfo;
  positionId: number;
  predictions: Prediction[];
  teamCodeName: string;
  next_gw_xmins: number;
  prediction4GW: number;
  formatted_cost: string;
  weighted_prediction: number;
}

export interface PriceInfo {
  Code: number;
  Team: string;
  Value: number;
  HrRate: number;
  Status: string;
  Target: number;
  Position: string;
  Ownership: number;
  ChangeTime: string;
  PlayerName: string;
  RateOfChange: number;
}

export interface Prediction {
  gw: number;
  opp: Opponent[];
  capt: number;
  xmins: number;
  status: string;
  fitness: number;
  predicted_pts: number;
}

export type Opponent = [string, string, number];

export interface FplData {
  id: number;
  bps: number;
  code: number;
  form: string;
  news: string;
  team: number;
  bonus: number;
  photo: string;
  saves: number;
  starts: number;
  status: string;
  threat: string;
  assists: number;
  ep_next: string;
  ep_this: string;
  minutes: number;
  special: boolean;
  now_cost: number;
  web_name: string;
  form_rank: number;
  ict_index: string;
  influence: string;
  own_goals: number;
  red_cards: number;
  team_code: number;
  creativity: string;
  first_name: string;
  news_added: string | null;
  value_form: string;
  second_name: string;
  threat_rank: number;
  clean_sheets: number;
  element_type: number;
  event_points: number;
  goals_scored: number;
  in_dreamteam: boolean;
  saves_per_90: number;
  squad_number: number | null;
  total_points: number;
  transfers_in: number;
  value_season: string;
  yellow_cards: number;
  now_cost_rank: number;
  selected_rank: number;
  starts_per_90: number;
  transfers_out: number;
  expected_goals: string;
  form_rank_type: number;
  goals_conceded: number;
  ict_index_rank: number;
  influence_rank: number;
  penalties_text: string;
  creativity_rank: number;
  dreamteam_count: number;
  penalties_order: number;
  penalties_saved: number;
  points_per_game: string;
  expected_assists: string;
  penalties_missed: number;
  threat_rank_type: number;
  cost_change_event: number;
  cost_change_start: number;
  now_cost_rank_type: number;
  selected_rank_type: number;
  transfers_in_event: number;
  clean_sheets_per_90: number;
  ict_index_rank_type: number;
  influence_rank_type: number;
  selected_by_percent: string;
  transfers_out_event: number;
  creativity_rank_type: number;
  points_per_game_rank: number;
  direct_freekicks_text: string;
  expected_goals_per_90: number;
  goals_conceded_per_90: number;
  cost_change_event_fall: number;
  cost_change_start_fall: number;
  direct_freekicks_order: number;
  expected_assists_per_90: number;
  expected_goals_conceded: string;
  points_per_game_rank_type: number;
  expected_goal_involvements: string;
  chance_of_playing_next_round: string | null;
  chance_of_playing_this_round: string | null;
  expected_goals_conceded_per_90: number;
  expected_goal_involvements_per_90: number;
  corners_and_indirect_freekicks_text: string;
  corners_and_indirect_freekicks_order: number | null;
}

export interface LiveData {
  bps: number;
  bonus: number;
  saves: number;
  starts: number;
  threat: string;
  assists: number;
  minutes: number;
  ict_index: string;
  influence: string;
  own_goals: number;
  red_cards: number;
  creativity: string;
  clean_sheets: number;
  goals_scored: number;
  in_dreamteam: boolean;
  total_points: number;
  yellow_cards: number;
  expected_goals: string;
  goals_conceded: number;
  penalties_saved: number;
  expected_assists: string;
  penalties_missed: number;
  expected_goals_conceded: string;
  expected_goal_involvements: string;
}
