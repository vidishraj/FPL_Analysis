import { ColDef, GetDetailRowDataParams, SideBarDef } from 'ag-grid-community';
import { iconSrc } from '../../Icons/Icons';
import { useMemo } from 'react';

const currencyFormatter = (params: any) => {
  if (params.value) {
    return `£${params.value.toFixed(1)}`;
  } else {
    return `£${0}`;
  }
};

export const sideBar = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        suppressRowGroups: true,
        suppressValues: true,
        suppressPivotMode: true,
      },
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    },
  ],
  defaultToolPanel: 'columns',
};

export const globalDetailCellRendererParams = () => ({
  detailGridOptions: {
    columnDefs: [
      { headerName: 'GW', field: 'gw', maxWidth: 100 },
      {
        headerName: 'Opponent Name',
        valueFormatter: (params: any) => {
          return `${params.data.opp[0][1]}`;
        },
        maxWidth: 180,
      },
      {
        headerName: 'Predicted Points',
        field: 'predicted_pts',
        maxWidth: 178,
        cellDataType: 'number',
        valueGetter: (params: any) => {
          return parseFloat(params.data.predicted_pts);
        },
        valueFormatter: (params: any) => {
          return `${params.value.toFixed(2)}`;
        },
      },
    ],
    headerHeight: 25,
    suppressHorizontalScroll: true, // Removes horizontal scrollbar,
  },
  getDetailRowData: ({ successCallback, data }: GetDetailRowDataParams<any>) =>
    successCallback(data.data.predictions),
});

export const globalColumnDefs: ColDef[] = [
  {
    headerName: 'Name',
    field: 'webName',
    cellRenderer: 'agGroupCellRenderer',
    sortable: false,
    cellDataType: 'text',
    suppressColumnsToolPanel: true,
    suppressMovable: true,
    filter: false,
    lockPosition: 'left',
    width: 180,
  },
  {
    headerName: 'Team Name',
    field: 'team.name',
    filter: true,
    cellRenderer: (params: any) => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <span>{params.value}</span>
          <img
            alt="iconLogo"
            width={25}
            height={25}
            src={iconSrc[params.value]}
          ></img>
        </div>
      );
    },
    width: 170,
  },
  {
    headerName: 'Cost',
    field: 'data.nowCost',
    valueGetter: (params) => {
      return parseFloat(params.data.data.nowCost) / 10;
    },
    valueFormatter: currencyFormatter,
    filter: 'agNumberColumnFilter',
    width: 110,
  },
  {
    headerName: 'Position',
    field: 'data.priceInfo.Position',
    valueFormatter: (params) => {
      const positionMap: any = {
        '1': 'GK',
        '2': 'DEF',
        '3': 'MID',
        '4': 'FOR',
      };
      return `${positionMap[params.data.data.positionId]}`;
    },
    filter: true,
    width: 130,
  },
  {
    headerName: 'Ownership (%)',
    field: 'data.priceInfo.Ownership',
    valueFormatter: (params) => {
      return params.value ? `${params.value}%` : '0%';
    },
    width: 181,
  },
  {
    headerName: 'SearchTerm',
    field: 'searchTerm',
    width: 181,
    filter: 'agTextColumnFilter',
    hide: true,
  },
  {
    headerName: 'Rate of Change',
    field: 'data.priceInfo.RateOfChange',
    hide: true,
    width: 190,
  },
  {
    headerName: 'Prediction 4 GW',
    field: 'data.prediction4GW',
    valueFormatter: (params) => {
      return `${parseFloat(params.data.data.prediction4GW).toFixed(2)} pts`;
    },
    width: 190,
  },
  {
    headerName: 'Weighted Prediction',
    field: 'data.weighted_prediction',
    hide: true,
    valueFormatter: (params) => {
      return `${parseFloat(params.data.data.prediction4GW).toFixed(2)} pts`;
    },
    width: 190,
  },
  { headerName: 'Form', field: 'fpl.form', hide: false, width: 130 },
  { headerName: 'Bonus', field: 'fpl.bonus', hide: true, width: 130 },
  { headerName: 'Starts', field: 'fpl.starts', hide: true, width: 130 },
  {
    headerName: 'Threat',
    field: 'fpl.threat',
    cellDataType: 'number',
    width: 145,
    valueGetter: (params) => {
      return parseFloat(params.data.fpl.threat);
    },
  },
  { headerName: 'Minutes', field: 'fpl.minutes', hide: true, width: 150 },
  {
    headerName: 'ICT Index',
    field: 'fpl.ict_index',
    width: 150,
    hide: true,
    valueGetter: (params) => parseFloat(params.data.fpl.ict_index),
  },
  {
    headerName: 'Influence',
    field: 'fpl.influence',
    width: 150,
    hide: true,
    cellDataType: 'number',
    valueGetter: (params) => {
      return parseFloat(params.data.fpl.influence);
    },
  },
  { headerName: 'Red Cards', field: 'fpl.red_cards', hide: true, width: 130 },
  {
    headerName: 'Creativity',
    field: 'fpl.creativity',
    width: 150,
    hide: true,
    cellDataType: 'number',
    valueGetter: (params) => {
      return parseFloat(params.data.fpl.creativity);
    },
  },
  { headerName: 'Clean Sheets', field: 'fpl.clean_sheets', width: 170 },
  { headerName: 'Goals Scored', field: 'fpl.goals_scored', width: 180 },
  {
    headerName: 'In Dream Team',
    field: 'fpl.in_dreamteam',
    hide: true,
    width: 130,
  },
  {
    headerName: 'Total Points',
    field: 'fpl.total_points',
    valueFormatter: (params) => {
      return params.value ? `${params.value}pts` : '0pts';
    },
    width: 170,
  },
  { headerName: 'Expected Goals', field: 'fpl.expected_goals', width: 190 },
  {
    headerName: 'Expected Goals/90',
    field: 'fpl.expected_goals_per_90',
    width: 210,
    hide: true,
  },
  {
    headerName: 'Goals Conceded/90',
    field: 'fpl.goals_conceded_per_90',
    width: 210,
    hide: true,
  },
  {
    headerName: 'Direct Free Kick Order',
    field: 'fpl.direct_freekicks_order',
    width: 230,
    hide: true,
  },
  {
    headerName: 'Expected Assists/90',
    field: 'fpl.expected_assists_per_90',
    width: 220,
    hide: true,
  },
  {
    headerName: 'Expected Goal Involvements',
    field: 'fpl.expected_goal_involvements',
    width: 270,
    hide: true,
  },
  {
    headerName: 'Corners and Indirect Free Kicks Order',
    field: 'fpl.corners_and_indirect_freekicks_order',
    width: 300,
    hide: true,
  },
  {
    headerName: 'Elite Ownership (%)',
    field: 'elite_ownership',
    hide: false,
    width: 210,
  },
  {
    headerName: 'Elite Ownership Change',
    field: 'elite_ownership_change',
    width: 250,
    hide: true,
  },
];
