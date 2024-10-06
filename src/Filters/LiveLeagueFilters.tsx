import React, { useCallback, useEffect, useState } from 'react';
import './Filters.scss';
import { useFplContext } from '../Contexts/context';
import { useLocation, useNavigate } from 'react-router-dom';
interface FilterProps {}

const LiveLeagueFilters: React.FC<FilterProps> = () => {
  const { state, dispatch } = useFplContext();
  const [leagueId, setLeagueId] = useState<string | undefined | null>('');
  const location = useLocation();
  const navigate = useNavigate();

  const addParamToUrl = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value); // Add or update the parameter
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  useEffect(() => {}, []);
  const handleNameSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value.toLowerCase();
      if (query === '') {
        let currentModel: any = state.filterModels.liveLeagueFilterModel;
        delete currentModel['Name'];
        dispatch({
          type: 'SET_FILTER_MODEL',
          payload: {
            modelName: 'liveLeagueFilterModel',
            model: currentModel,
          },
        });
      } else {
        dispatch({
          type: 'SET_FILTER_MODEL',
          payload: {
            modelName: 'liveLeagueFilterModel',
            model: {
              ...state.filterModels.liveLeagueFilterModel,
              Name: {
                filterType: 'text',
                type: 'contains',
                filter: query,
              },
            },
          },
        });
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const handleTeamSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value.toLowerCase();
      if (query === '') {
        let currentModel: any = state.filterModels.liveLeagueFilterModel;
        delete currentModel['Team'];
        dispatch({
          type: 'SET_FILTER_MODEL',
          payload: {
            modelName: 'liveLeagueFilterModel',
            model: currentModel,
          },
        });
      } else {
        dispatch({
          type: 'SET_FILTER_MODEL',
          payload: {
            modelName: 'liveLeagueFilterModel',
            model: {
              ...state.filterModels.liveLeagueFilterModel,
              Team: {
                filterType: 'text',
                type: 'contains',
                filter: query,
              },
            },
          },
        });
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="player-filters">
      <div
        className="search-bar leagueSearch"
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-evenly',
        }}
      >
        <input
          type="text"
          style={{ flexBasis: '30%' }}
          onChange={(e) => handleTeamSearch(e)}
          placeholder="Team Search..."
          className="modern-input teamSearchLeague"
        />
        <input
          type="text"
          style={{ flexBasis: '30%' }}
          onChange={(e) => handleNameSearch(e)}
          placeholder="User Search..."
          className="modern-input playerSearchLeague"
        />
        <div
          style={{
            flexBasis: '15%',
            display: 'flex',
            flexDirection: 'column',
          }}
          className="leagueID"
        >
          <input
            maxLength={10}
            onInput={(e: any) => {
              if (e.target.value.length > 10)
                e.target.value = e.target.value.slice(0, 10);
            }}
            defaultValue={state.league ? parseInt(state.league) : undefined}
            onChange={(e) => setLeagueId(e.target.value)}
            type={'number'}
            placeholder="League ID"
            className="modern-input"
          />
          <span
            style={{
              fontSize: '0.75rem',
              color: 'grey',
              display: 'block',
              textAlign: 'left',
            }}
          >
            *987770 for Area FPL
          </span>
        </div>
        <button
          style={{ flexBasis: '10%', maxWidth: 'fit-content' }}
          className="custom-button"
          onClick={() => {
            if (leagueId) {
              addParamToUrl('live_league_id', leagueId);
              dispatch({ type: 'SET_LEAGUE', payload: leagueId });
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LiveLeagueFilters;
