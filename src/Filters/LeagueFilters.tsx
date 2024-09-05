import React, { useCallback, useEffect, useState } from 'react';
import './Filters.scss';
import { useFplContext } from '../Contexts/context';
import { useLocation, useNavigate } from 'react-router-dom';
interface FilterProps {}

const LeagueFilters: React.FC<FilterProps> = () => {
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
        let currentModel: any = state.filterModels.leagueFilterModel;
        delete currentModel['player_name'];
        dispatch({
          type: 'SET_FILTER_MODEL',
          payload: {
            modelName: 'leagueFilterModel',
            model: currentModel,
          },
        });
      } else {
        dispatch({
          type: 'SET_FILTER_MODEL',
          payload: {
            modelName: 'leagueFilterModel',
            model: {
              ...state.filterModels.leagueFilterModel,
              player_name: {
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
        let currentModel: any = state.filterModels.leagueFilterModel;
        delete currentModel['entry_name'];
        dispatch({
          type: 'SET_FILTER_MODEL',
          payload: {
            modelName: 'leagueFilterModel',
            model: currentModel,
          },
        });
      } else {
        dispatch({
          type: 'SET_FILTER_MODEL',
          payload: {
            modelName: 'leagueFilterModel',
            model: {
              ...state.filterModels.leagueFilterModel,
              entry_name: {
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
        className="search-bar"
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
          placeholder="Search Team..."
          className="modern-input"
        />
        <input
          type="text"
          style={{ flexBasis: '30%' }}
          onChange={(e) => handleNameSearch(e)}
          placeholder="Search User..."
          className="modern-input"
        />
        <input
          maxLength={10}
          onInput={(e: any) => {
            if (e.target.value.length > 10)
              e.target.value = e.target.value.slice(0, 10);
          }}
          defaultValue={state.league ? parseInt(state.league) : undefined}
          onChange={(e) => setLeagueId(e.target.value)}
          type={'number'}
          style={{ flexBasis: '15%' }}
          placeholder="League ID"
          className="modern-input"
        />
        <button
          style={{ flexBasis: '10%', maxWidth: 'fit-content' }}
          onClick={() => {
            if (leagueId) {
              addParamToUrl('league_Id', leagueId);
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

export default LeagueFilters;
