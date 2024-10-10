// NewLeagueColumnDefs.js
import { ColDef } from 'ag-grid-community';
import { currencyFormatter } from './GlobalTableDefs';

export const LiveLeagueColumnDefs: ColDef[] = [
  {
    headerName: 'Rank',
    field: 'Rank', //  'Rank'
    sortable: true,
    pinned: 'left',
    filter: 'agTextColumnFilter',
    width: 120,
  },
  {
    headerName: 'Player Name',
    field: 'Name', //  'Name'
    sortable: true,
    filter: 'agTextColumnFilter',
    width: 180,
  },
  {
    headerName: 'Team Name',
    field: 'Team', //  'Team'
    sortable: true,
    filter: 'agTextColumnFilter',
    width: 180,
  },
  {
    headerName: 'Total Points',
    field: 'Total', //  'Total'
    sortable: true,
    filter: 'agNumberColumnFilter',
    width: 150,
  },
  {
    headerName: 'Live Points',
    field: 'Live Points', //  'Live Points'
    sortable: true,
    filter: 'agNumberColumnFilter',
    width: 150,
  },
  {
    headerName: 'Movement',
    field: 'Movement', //  'Movement'
    sortable: true,
    filter: 'agTextColumnFilter',
    width: 180,
  },
  {
    headerName: 'Transfers',
    field: 'Transfers', //  'Transfers'
    sortable: true,
    filter: 'agNumberColumnFilter',
    width: 150,
  },
  {
    headerName: 'Captain',
    field: 'Captain', //  'Captain'
    sortable: true,
    filter: 'agTextColumnFilter',
    width: 180,
  },
  {
    headerName: 'Vice-Captain',
    field: 'Vice-Captain', //  'Vice-Captain'
    sortable: true,
    filter: 'agTextColumnFilter',
    width: 180,
  },
  {
    headerName: 'Formation',
    field: 'Formation', //  'Formation'
    sortable: true,
    filter: 'agTextColumnFilter',
    width: 180,
  },
  {
    headerName: 'Old GW Rank',
    field: 'Old GW Rank', //  'Old GW Rank'
    sortable: true,
    hide: true,
    filter: 'agNumberColumnFilter',
    width: 150,
  },
  {
    headerName: 'Old Overall Rank',
    field: 'Old Overall Rank', //  'Old Overall Rank'
    sortable: true,
    hide: true,
    filter: 'agNumberColumnFilter',
    width: 150,
  },
  {
    headerName: 'Bank',
    field: 'Bank', //  'Bank'
    sortable: true,
    valueFormatter: currencyFormatter,
    hide: true,
    filter: 'agNumberColumnFilter',
    width: 150,
  },
  {
    headerName: 'Total Value',
    field: 'Total Value', //  'Total Value'
    valueFormatter: currencyFormatter,
    sortable: true,
    filter: 'agNumberColumnFilter',
    width: 160,
  },
];
