import { useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { ColDef, FilterModel } from 'ag-grid-community';
import 'ag-grid-enterprise';
import './Table.scss';
import { Player } from '../Types/DataType';
import { Standing } from '../Types/LeagueType';

interface TableProps {
  data: Player[] | undefined | Standing[];
  filterModel: FilterModel | null;
  sideBar: any;
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
        defaultColDef={{
          sortable: true,
          filter: true,
          cellStyle: { textAlign: 'center' },
        }}
        sideBar={sideBar}
        alwaysShowHorizontalScroll
        detailCellRendererParams={detailCellRenderer}
        onGridReady={(params) => {
          if (window.outerWidth < 700) {
            params.api.setColumnsPinned(['player_name'], 'left');
            params.api.setColumnWidths([
              {
                key: 'player_name',
                newWidth: 150,
              },
            ]);
            params.api.closeToolPanel();
          }
        }}
        onGridSizeChanged={(params) => {
          if (params.clientWidth < 700) {
            params.api.closeToolPanel();
          } else {
            params.api.openToolPanel('columns');
          }
        }}
        gridOptions={{
          suppressBrowserResizeObserver: true,
        }}
        // onFilterChanged={(params) => {
        //   console.log(params.api.getFilterModel());
        // }} //Useful for debugging filters
      />
    </div>
  );
};
