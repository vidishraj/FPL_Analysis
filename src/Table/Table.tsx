import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { ColDef, GetDetailRowDataParams, SideBarDef } from "ag-grid-community";
import "ag-grid-enterprise";
import "./Table.scss";
import { Player } from "./DataType";

interface TableProps {
  data: Player[];
}
const iconSrc: { [key: string]: string } = {
  Arsenal: "https://resources.premierleague.com/premierleague/badges/50/t3.png",
  "Aston Villa":
    "https://resources.premierleague.com/premierleague/badges/50/t7.png",
  Bournemouth:
    "https://resources.premierleague.com/premierleague/badges/50/t91.png",
  Brentford:
    "https://resources.premierleague.com/premierleague/badges/50/t94.png",
  Brighton:
    "https://resources.premierleague.com/premierleague/badges/50/t36.png",
  Chelsea: "https://resources.premierleague.com/premierleague/badges/50/t8.png",
  "Crystal Palace":
    "https://resources.premierleague.com/premierleague/badges/50/t31.png",
  Everton:
    "https://resources.premierleague.com/premierleague/badges/50/t11.png",
  Fulham: "https://resources.premierleague.com/premierleague/badges/50/t54.png",
  Ipswich:
    "https://resources.premierleague.com/premierleague/badges/50/t40.png",
  Leicester:
    "https://resources.premierleague.com/premierleague/badges/50/t13.png",
  Liverpool:
    "https://resources.premierleague.com/premierleague/badges/50/t14.png",
  "Man City":
    "https://resources.premierleague.com/premierleague/badges/50/t43.png",
  "Man Utd":
    "https://resources.premierleague.com/premierleague/badges/50/t1.png",
  Newcastle:
    "https://resources.premierleague.com/premierleague/badges/50/t4.png",
  "Nott'm Forest":
    "https://resources.premierleague.com/premierleague/badges/50/t17.png",
  Southampton:
    "https://resources.premierleague.com/premierleague/badges/50/t20.png",
  Spurs: "https://resources.premierleague.com/premierleague/badges/50/t6.png",
  "West Ham":
    "https://resources.premierleague.com/premierleague/badges/50/t21.png",
  Wolves: "https://resources.premierleague.com/premierleague/badges/50/t39.png",
};
export const Table: React.FC<TableProps> = ({ data }) => {
  const currencyFormatter = (params: any) => {
    if (params.value) {
      return `£${(params.value / 10).toFixed(1)}`;
    } else {
      return `£${0}`;
    }
  };
  const columnDefs: ColDef[] = [
    {
      headerName: "Name",
      field: "webName",
      cellRenderer: "agGroupCellRenderer",
      sortable: false,
      cellDataType: "text",
      suppressColumnsToolPanel: true,
      suppressMovable: true,
      lockPosition: "left",
    },
    {
      headerName: "Team Name",
      field: "team.name",
      cellRenderer: (params: any) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <span>{params.value}</span>
            <img width={30} height={30} src={iconSrc[params.value]}></img>
          </div>
          //   <span>Check</span>
        );
      },
    },
    {
      headerName: "Cost",
      field: "data.nowCost",
      valueFormatter: currencyFormatter,
    },
    {
      headerName: "Position",
      field: "data.priceInfo.Position",
      valueFormatter: (params) => {
        const positionMap: any = {
          "1": "GK",
          "2": "DEF",
          "3": "MID",
          "4": "FOR",
        };
        return `${positionMap[params.data.data.positionId]}`;
      },
    },
    {
      headerName: "Ownership (%)",
      field: "data.priceInfo.Ownership",
      valueFormatter: (params) => {
        return params.value ? `${params.value}%` : "0%";
      },
    },
    {
      headerName: "Rate of Change",
      field: "data.priceInfo.RateOfChange",
      hide: true,
    },
    {
      headerName: "Prediction 4 GW",
      field: "data.prediction4GW",
      valueFormatter: (params) => {
        return `${parseFloat(params.data.data.prediction4GW).toFixed(2)} pts`;
      },
    },
    {
      headerName: "Weighted Prediction",
      field: "data.weighted_prediction",
      hide: true,
      valueFormatter: (params) => {
        return `${parseFloat(params.data.data.prediction4GW).toFixed(2)} pts`;
      },
    },
    { headerName: "Form", field: "fpl.form", hide: true },
    { headerName: "Bonus", field: "fpl.bonus", hide: true },
    { headerName: "Starts", field: "fpl.starts", hide: true },
    {
      headerName: "Threat",
      field: "fpl.threat",
      cellDataType: "number",
      valueGetter: (params) => {
        return parseFloat(params.data.fpl.threat);
      },
    },
    { headerName: "Minutes", field: "fpl.minutes", hide: true },
    {
      headerName: "ICT Index",
      field: "fpl.ict_index",
      hide: true,
      valueGetter: (params) => parseFloat(params.data.fpl.ict_index),
    },
    {
      headerName: "Influence",
      field: "fpl.influence",
      hide: true,
      cellDataType: "number",
      valueGetter: (params) => {
        return parseFloat(params.data.fpl.influence);
      },
    },
    { headerName: "Red Cards", field: "fpl.red_cards", hide: true },
    {
      headerName: "Creativity",
      field: "fpl.creativity",
      hide: true,
      cellDataType: "number",
      valueGetter: (params) => {
        return parseFloat(params.data.fpl.creativity);
      },
    },
    { headerName: "Clean Sheets", field: "fpl.clean_sheets" },
    { headerName: "Goals Scored", field: "fpl.goals_scored" },
    { headerName: "In Dream Team", field: "fpl.in_dreamteam", hide: true },
    {
      headerName: "Total Points",
      field: "fpl.total_points",
      valueFormatter: (params) => {
        return params.value ? `${params.value}pts` : "0pts";
      },
    },
    { headerName: "Expected Goals", field: "fpl.expected_goals" },
    {
      headerName: "Expected Goals per 90",
      field: "fpl.expected_goals_per_90",
      hide: true,
    },
    {
      headerName: "Goals Conceded per 90",
      field: "fpl.goals_conceded_per_90",
      hide: true,
    },
    {
      headerName: "Direct Free Kick Order",
      field: "fpl.direct_freekicks_order",
      hide: true,
    },
    {
      headerName: "Expected Assists per 90",
      field: "fpl.expected_assists_per_90",
      hide: true,
    },
    {
      headerName: "Expected Goal Involvements",
      field: "fpl.expected_goal_involvements",
      hide: true,
    },
    {
      headerName: "Corners and Indirect Free Kicks Order",
      field: "fpl.corners_and_indirect_freekicks_order",
      hide: true,
    },
    { headerName: "Elite Ownership (%)", field: "elite_ownership", hide: true },
    {
      headerName: "Elite Ownership Change",
      field: "elite_ownership_change",
      hide: true,
    },
  ];
  const detailCellRendererParams = useMemo(
    () => ({
      detailGridOptions: {
        columnDefs: [
          { headerName: "GW", field: "gw", maxWidth: 100 },
          {
            headerName: "Opponent Name",
            valueFormatter: (params: any) => {
              return `${params.data.opp[0][1]}`;
            },
            maxWidth: 180,
          },
          {
            headerName: "Predicted Points",
            field: "predicted_pts",
            maxWidth: 178,
            cellDataType: "number",
            valueGetter: (params: any) => {
              return parseFloat(params.data.predicted_pts);
            },
            valueFormatter: (params: any) => {
              return `${params.value.toFixed(2)}`;
            },
          },
        ],
        headerHeight: 25,
        domLayout: "autoHeight", // Adjusts height automatically
        suppressHorizontalScroll: true, // Removes horizontal scrollbar
      },
      getDetailRowData: ({
        successCallback,
        data,
      }: GetDetailRowDataParams<any>) => successCallback(data.data.predictions),
    }),
    [],
  );

  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivotMode: true,
          },
        },
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
        },
      ],
    };
  }, []);
  return (
    <div className="ag-theme-material" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        masterDetail={true}
        defaultColDef={{ sortable: true, filter: true }}
        sideBar={sideBar}
        detailCellRendererParams={detailCellRendererParams}
      />
    </div>
  );
};
