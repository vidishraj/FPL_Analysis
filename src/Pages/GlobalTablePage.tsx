import GlobalFilters from '../Filters/GlobalFilters';
import { Table } from '../Table/Table';
import { useFplContext } from '../Contexts/context';
import {
  globalDetailCellRendererParams,
  sideBar,
  globalColumnDefs,
} from '../Table/ColumnDefs/GlobalTableDefs';
const GlobalPage = () => {
  const { state } = useFplContext();
  return (
    <>
      <GlobalFilters />
      <div
        style={{
          padding: '5px 5px',
          backgroundColor: 'whitesmoke',
          color: '',
          border: '0.5px solid grey',
          width: 'fit-content',
        }}
      >
        {' '}
        **Click on column header to sort! Slower scrolling on mobiles!
      </div>
      <Table
        data={state.globalTable}
        filterModel={state.filterModels.globalFilterModel}
        columnDef={globalColumnDefs}
        masterDetail={true}
        detailCellRenderer={globalDetailCellRendererParams}
        sideBar={sideBar}
      />
    </>
  );
};

export default GlobalPage;
