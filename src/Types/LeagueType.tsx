import { Player } from './DataType'; // Assuming Player type is imported from another file

export interface League {
  leagueId: string;
  name: string;
  standings: Standing[];
}

export interface Standing {
  attackScore: number;
  defenseScore: number;
  entry: number;
  entry_name: string;
  event_total: number;
  id: number;
  last_rank: number;
  overallScore: number;
  player_name: string;
  rank: number;
  rank_sort: number;
  team: Player[];
  teamValue: number;
  total: number;
}
