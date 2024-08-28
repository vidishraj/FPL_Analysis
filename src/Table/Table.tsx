import { useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import {
  ColDef,
  FilterModel,
  GetDetailRowDataParams,
  SideBarDef,
} from "ag-grid-community";
import "ag-grid-enterprise";
import "./Table.scss";
import { Player } from "./DataType";

interface TableProps {
  data: Player[];
  filterModel: FilterModel | null;
  setFilterModel: any;
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
export const Table: React.FC<TableProps> = ({
  data,
  filterModel,
  setFilterModel,
}) => {
  const gridRef: any = useRef();
  useEffect(() => {
    if (gridRef?.current?.api && filterModel !== null) {
      setFilterModel(gridRef.current.api.getFilterModel());
    } // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (gridRef?.current?.api) {
      gridRef.current.api.setFilterModel(filterModel);
    }
  }, [filterModel]);
  const currencyFormatter = (params: any) => {
    if (params.value) {
      return `£${(params.value).toFixed(1)}`;
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
      filter: false,
      lockPosition: "left",
      width: 180,
    },
    {
      headerName: "Team Name",
      field: "team.name",
      filter: true,
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
            <img
              alt="iconLogo"
              width={30}
              height={30}
              src={iconSrc[params.value]}
            ></img>
          </div>
        );
      },
      width: 170,
    },
    {
      headerName: "Cost",
      field: "data.nowCost",
      valueGetter: (params) => {
        return parseFloat(params.data.data.nowCost)/10;
      },
      valueFormatter: currencyFormatter,
      filter:"agNumberColumnFilter",
      width: 110,
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
      filter: true,
      width: 130,
    },
    {
      headerName: "Ownership (%)",
      field: "data.priceInfo.Ownership",
      valueFormatter: (params) => {
        return params.value ? `${params.value}%` : "0%";
      },
      width: 181,
    },
    {
      headerName: "Rate of Change",
      field: "data.priceInfo.RateOfChange",
      hide: true,
      width: 190,
    },
    {
      headerName: "Prediction 4 GW",
      field: "data.prediction4GW",
      valueFormatter: (params) => {
        return `${parseFloat(params.data.data.prediction4GW).toFixed(2)} pts`;
      },
      width: 190,
    },
    {
      headerName: "Weighted Prediction",
      field: "data.weighted_prediction",
      hide: true,
      valueFormatter: (params) => {
        return `${parseFloat(params.data.data.prediction4GW).toFixed(2)} pts`;
      },
      width: 190,
    },
    { headerName: "Form", field: "fpl.form", hide: false, width: 130 },
    { headerName: "Bonus", field: "fpl.bonus", hide: true, width: 130 },
    { headerName: "Starts", field: "fpl.starts", hide: true, width: 130 },
    {
      headerName: "Threat",
      field: "fpl.threat",
      cellDataType: "number",
      width: 145,
      valueGetter: (params) => {
        return parseFloat(params.data.fpl.threat);
      },
    },
    { headerName: "Minutes", field: "fpl.minutes", hide: true, width: 150 },
    {
      headerName: "ICT Index",
      field: "fpl.ict_index",
      width: 150,
      hide: true,
      valueGetter: (params) => parseFloat(params.data.fpl.ict_index),
    },
    {
      headerName: "Influence",
      field: "fpl.influence",
      width: 150,
      hide: true,
      cellDataType: "number",
      valueGetter: (params) => {
        return parseFloat(params.data.fpl.influence);
      },
    },
    { headerName: "Red Cards", field: "fpl.red_cards", hide: true, width: 130 },
    {
      headerName: "Creativity",
      field: "fpl.creativity",
      width: 150,
      hide: true,
      cellDataType: "number",
      valueGetter: (params) => {
        return parseFloat(params.data.fpl.creativity);
      },
    },
    { headerName: "Clean Sheets", field: "fpl.clean_sheets", width: 170 },
    { headerName: "Goals Scored", field: "fpl.goals_scored", width: 180 },
    {
      headerName: "In Dream Team",
      field: "fpl.in_dreamteam",
      hide: true,
      width: 130,
    },
    {
      headerName: "Total Points",
      field: "fpl.total_points",
      valueFormatter: (params) => {
        return params.value ? `${params.value}pts` : "0pts";
      },
      width: 170,
    },
    { headerName: "Expected Goals", field: "fpl.expected_goals", width: 190 },
    {
      headerName: "Expected Goals/90",
      field: "fpl.expected_goals_per_90",
      width: 210,
      hide: true,
    },
    {
      headerName: "Goals Conceded/90",
      field: "fpl.goals_conceded_per_90",
      width: 210,
      hide: true,
    },
    {
      headerName: "Direct Free Kick Order",
      field: "fpl.direct_freekicks_order",
      width: 230,
      hide: true,
    },
    {
      headerName: "Expected Assists/90",
      field: "fpl.expected_assists_per_90",
      width: 220,
      hide: true,
    },
    {
      headerName: "Expected Goal Involvements",
      field: "fpl.expected_goal_involvements",
      width: 270,
      hide: true,
    },
    {
      headerName: "Corners and Indirect Free Kicks Order",
      field: "fpl.corners_and_indirect_freekicks_order",
      width: 300,
      hide: true,
    },
    {
      headerName: "Elite Ownership (%)",
      field: "elite_ownership",
      hide: false,
      width: 210,
    },
    {
      headerName: "Elite Ownership Change",
      field: "elite_ownership_change",
      width: 250,
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
        suppressHorizontalScroll: true, // Removes horizontal scrollbar,
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
      defaultToolPanel: "columns",
    };
  }, []);
  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "100%", border: "0.2px solid black" }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={columnDefs}
        masterDetail={true}
        defaultColDef={{ sortable: true, filter: true }}
        sideBar={sideBar}
        alwaysShowHorizontalScroll
        detailCellRendererParams={detailCellRendererParams}
        // onFilterChanged={(params)=>{console.log(params.api.getFilterModel())}} //Useful for debugging filters
      />
    </div>
  );
};
