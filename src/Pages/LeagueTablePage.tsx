import { Table } from '../Table/Table';
import { useFplContext } from '../Contexts/context';
import { sideBar } from '../Table/ColumnDefs/GlobalTableDefs';
import LeagueFilters from '../Filters/LeagueFilters';
import { LeagueColumnDefs } from '../Table/ColumnDefs/LeagueTableDefs';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchLeague } from '../Api/Api';

const LeaguePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramLeague = queryParams.get('league_Id');

  const { state, dispatch } = useFplContext();
  useEffect(() => {
    const lcLeague = localStorage.getItem('league_Id');
    if (paramLeague) {
      if (state.leagueTable === undefined || paramLeague !== lcLeague) {
        localStorage.setItem('league_Id', paramLeague);
        fetchLeagueDetails(paramLeague);
      }
    } else if (lcLeague !== null) {
      addParamToUrl('league_Id', lcLeague);
      fetchLeagueDetails(lcLeague);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramLeague]);

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

  function fetchLeagueDetails(leagueId: string | undefined) {
    if (leagueId) {
      addParamToUrl('league_Id', leagueId.toString());
      fetchLeague(leagueId)
        .then((response: any) => {
          dispatch({
            type: 'SET_LEAGUE_TABLE',
            payload: response.data,
          });
          dispatch({
            type: 'SET_LEAGUE',
            payload: paramLeague,
          });
        })
        .catch((err) => {
          dispatch({
            type: 'SET_LEAGUE_TABLE',
            payload: { leagueId: '', standings: [], name: '' },
          });
          const path = removeParamFromUrl('league_Id');
          localStorage.removeItem('league_Id');
          navigate(path);
          console.log('error fetching league', err);
        })
        .finally(() => {});
    }
  }
  return (
    <>
      <LeagueFilters />
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
        data={state.leagueTable ? state.leagueTable.standings : []}
        filterModel={state.filterModels.leagueFilterModel}
        columnDef={LeagueColumnDefs}
        masterDetail={true}
        sideBar={sideBar}
      />
    </>
  );
};

export default LeaguePage;
