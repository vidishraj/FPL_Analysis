import { ColDef } from 'ag-grid-community';
import { currencyFormatter } from './GlobalTableDefs';

export const LeagueColumnDefs: ColDef[] = [
  {
    headerName: 'Rank',
    field: 'rank',
    sortable: true,
    width: 110,
    pinned: 'left',
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Player Name',
    field: 'player_name',
    pinned: 'left',
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Team Name',
    field: 'entry_name',
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Team',
    filter: false,
    sortable: false,
    width: 130,
  },
  {
    headerName: 'Team Value',
    field: 'teamValue',
    valueFormatter: currencyFormatter,
    sortable: true,
    filter: 'agNumberColumnFilter',
    width: 160,
  },
  {
    headerName: 'Total Points',
    field: 'total',
    sortable: true,
    filter: 'agNumberColumnFilter',
    width: 150,
  },
  {
    headerName: 'AI Attack Score',
    field: 'attackScore',
    valueFormatter: (params: any) => {
      return `${params.value.toFixed(3)}`;
    },
    sortable: true,
    filter: 'agNumberColumnFilter',
    width: 180,
  },
  {
    headerName: 'AI Defense Score',
    field: 'defenseScore',
    valueFormatter: (params: any) => {
      return `${params.value.toFixed(3)}`;
    },
    sortable: true,
    filter: 'agNumberColumnFilter',
    width: 200,
  },
  {
    headerName: 'AI Overall Score',
    field: 'overallScore',
    sortable: true,
    valueFormatter: (params: any) => {
      return `${params.value.toFixed(3)}`;
    },
    filter: 'agNumberColumnFilter',
    width: 180,
  },
  {
    headerName: 'Entry ID',
    field: 'entry',
    hide: true,
    filter: 'agNumberColumnFilter',
    width: 120,
  },
  {
    headerName: 'Last GW Total',
    field: 'event_total',
    sortable: true,
    filter: 'agNumberColumnFilter',
    width: 170,
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
