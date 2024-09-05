import { Table } from '../Table/Table';
import { useFplContext } from '../Contexts/context';
import {
  globalDetailCellRendererParams,
  sideBar,
  globalColumnDefs,
} from '../Table/ColumnDefs/GlobalTableDefs';
import TeamFilters from '../Filters/TeamFilters';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchTeam } from '../Api/Api';

const TeamsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramTeam = queryParams.get('team_Id');
  const { state, dispatch } = useFplContext();

  useEffect(() => {
    const lCTeam = localStorage.getItem('teamID');
    if (paramTeam) {
      fetchTeamDetails(paramTeam);
      dispatch({
        type: 'SET_TEAM',
        payload: paramTeam,
      });
      localStorage.setItem('teamID', paramTeam);
    } else if (lCTeam !== null) {
      fetchTeamDetails(lCTeam);
      addParamToUrl('team_Id', lCTeam);
      dispatch({
        type: 'SET_TEAM',
        payload: lCTeam,
      });
    }
  }, [paramTeam]);

  const addParamToUrl = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value); // Add or update the parameter
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  function fetchTeamDetails(teamId: string | undefined) {
    if (teamId) {
      addParamToUrl('team_Id', teamId.toString());
      fetchTeam(teamId)
        .then((response) => {
          if (Array.isArray(response.data)) {
            dispatch({
              type: 'SET_TEAM_TABLE',
              payload: response.data,
            });
          }
        })
        .catch((err) => {
          console.log('error fetching team', err);
        })
        .finally(() => {});
    }
  }
  return (
    <>
      <TeamFilters />
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
        data={state.teamTable}
        filterModel={state.filterModels.teamFilterModel}
        columnDef={globalColumnDefs}
        masterDetail={true}
        detailCellRenderer={globalDetailCellRendererParams}
        sideBar={sideBar}
      />
    </>
  );
};

export default TeamsPage;
