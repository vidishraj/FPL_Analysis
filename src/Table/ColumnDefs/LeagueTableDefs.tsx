import { ColDef } from 'ag-grid-community';

export const LeagueColumnDefs: ColDef[] = [
  {
    headerName: 'Rank',
    field: 'rank',
    sortable: true,
    width: 110,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Player Name',
    field: 'player_name',
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Entry Name',
    field: 'entry_name',
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Team Value',
    field: 'teamValue',
    sortable: true,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Total',
    field: 'total',
    sortable: true,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Attack Score',
    field: 'attackScore',
    valueFormatter: (params: any) => {
      return `${params.value.toFixed(3)}`;
    },
    sortable: true,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Defense Score',
    field: 'defenseScore',
    valueFormatter: (params: any) => {
      return `${params.value.toFixed(3)}`;
    },
    sortable: true,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Overall Score',
    field: 'overallScore',
    sortable: true,
    valueFormatter: (params: any) => {
      return `${params.value.toFixed(3)}`;
    },
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Entry ID',
    field: 'entry',
    hide: true,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Last GW Total',
    field: 'event_total',
    sortable: true,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'ID',
    field: 'id',
    sortable: true,
    hide: true,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Last Rank',
    field: 'last_rank',
    sortable: true,
    hide: true,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Rank Sort',
    field: 'rank_sort',
    sortable: true,
    hide: true,
    filter: 'agNumberColumnFilter',
  },
];
