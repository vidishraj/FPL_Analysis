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
      if (state.teamTable === undefined || paramTeam !== lCTeam) {
        localStorage.setItem('teamID', paramTeam);
        fetchTeamDetails(paramTeam);
      }
    } else if (lCTeam !== null) {
      addParamToUrl('team_Id', lCTeam);
      fetchTeamDetails(lCTeam);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramTeam]);

  const addParamToUrl = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value); // Add or update the parameter
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const removeParamFromUrl = (key: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(key); // Remove the parameter by key
    return `${location.pathname}?${searchParams.toString()}`;
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
            dispatch({
              type: 'SET_TEAM',
              payload: paramTeam,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: 'SET_TEAM_TABLE',
            payload: [],
          });
          const path = removeParamFromUrl('team_Id');
          localStorage.removeItem('teamID');
          navigate(path);
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
