// NewLeaguePage.js
import { Table } from '../Table/Table';
import { useFplContext } from '../Contexts/context';
import { LiveLeagueColumnDefs } from '../Table/ColumnDefs/LiveLeagueTableDefs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchLiveLeague } from '../Api/Api'; // Ensure this function is implemented
import { Player } from '../Types/DataType';
import { sideBar } from '../Table/ColumnDefs/GlobalTableDefs';
import LiveLeagueFilters from '../Filters/LiveLeagueFilters';

const LiveLeaguePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramLeague = queryParams.get('league_Id');
  const [teamShown, setTeamShown] = useState<Player[] | undefined>(undefined);
  const { state, dispatch } = useFplContext();

  useEffect(() => {
    const lcLeague = localStorage.getItem('league_Id');
    if (paramLeague) {
      if (state.liveLeagueTable === undefined || paramLeague !== lcLeague) {
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
    searchParams.set(key, value);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const removeParamFromUrl = (key: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(key);
    return `${location.pathname}?${searchParams.toString()}`;
  };

  function fetchLeagueDetails(leagueId: string | undefined) {
    if (leagueId) {
      addParamToUrl('league_Id', leagueId.toString());
      fetchLiveLeague(leagueId) // Use your new API call here
        .then((response) => {
          dispatch({
            type: 'SET_LIVE_LEAGUE_TABLE', // New action to set the league table
            payload: response.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: 'SET_LIVE_LEAGUE_TABLE',
            payload: { leagueId: '', standings: [], name: '' },
          });
          const path = removeParamFromUrl('league_Id');
          localStorage.removeItem('league_Id');
          navigate(path);
          console.log('error fetching new league', err);
        });
    }
  }

  return (
    <>
      <LiveLeagueFilters />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            padding: '5px 5px',
            backgroundColor: 'whitesmoke',
            border: '0.5px solid grey',
            width: 'fit-content',
          }}
        >
          **Click on column header to sort! Slower scrolling on mobiles!
        </div>
        {teamShown && (
          <button
            style={{
              marginInlineEnd: '1%',
              backgroundColor: 'red',
              color: 'white',
            }}
            onClick={() => setTeamShown(undefined)}
            className="custom-button"
          >
            Back
          </button>
        )}
      </div>
      <Table
        data={state.liveLeagueTable ? state.liveLeagueTable.standings : []}
        columnDef={LiveLeagueColumnDefs}
        masterDetail={false}
        sideBar={sideBar}
        filterModel={state.filterModels.liveLeagueFilterModel}
      />
    </>
  );
};

export default LiveLeaguePage;
