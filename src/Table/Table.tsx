import { useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { ColDef, FilterModel, SideBarDef } from 'ag-grid-community';
import 'ag-grid-enterprise';
import './Table.scss';
import { Player } from '../Types/DataType';
import { League, Standing } from '../Types/LeagueType';

interface TableProps {
  data: Player[] | undefined | Standing[];
  filterModel: FilterModel | null;
  sideBar: SideBarDef | string | string[] | boolean | null;
  columnDef: ColDef[];
  detailCellRenderer?: any;
  masterDetail: boolean;
}

export const Table: React.FC<TableProps> = ({
  data,
  filterModel,
  columnDef,
  sideBar,
  detailCellRenderer,
  masterDetail,
}) => {
  const gridRef: any = useRef();

  useEffect(() => {
    if (gridRef?.current?.api) {
      gridRef.current.api.setFilterModel(filterModel);
    }
  }, [filterModel]);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: 'calc(100vh - 275px)',
        width: '100%',
        border: '0.2px solid black',
      }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={columnDef}
        masterDetail={masterDetail}
        defaultColDef={{ sortable: true, filter: true }}
        sideBar={sideBar}
        alwaysShowHorizontalScroll
        detailCellRendererParams={detailCellRenderer}
        // onFilterChanged={(params) => {
        //   console.log(params.api.getFilterModel());
        // }} //Useful for debugging filters
      />
    </div>
  );
};
