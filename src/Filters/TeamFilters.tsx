import React, { useCallback, useEffect, useState } from 'react';
import './Filters.scss';
import { Player } from '../Types/DataType';
import { useFplContext } from '../Contexts/context';
import { useLocation, useNavigate } from 'react-router-dom';
interface FilterProps {}

const TeamFilters: React.FC<FilterProps> = () => {
  const { state, dispatch } = useFplContext();
  const [minPrice, setMinPrice] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [teams, setTeams] = useState<string[]>([]);
  const [teamID, setTeamID] = useState<string | undefined | null>('');
  const positions = ['GK', 'MID', 'DEF', 'FOR'];

  const addParamToUrl = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value); // Add or update the parameter
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    setMaxPrice(
      Math.max(
        ...(state.teamTable
          ? state.teamTable.map((player: Player) => player.data.nowCost / 10)
          : [0])
      )
    );
    setMinPrice(
      Math.min(
        ...(state.teamTable
          ? state.teamTable.map((player: Player) => player.data.nowCost / 10)
          : [5])
      )
    );
    setTeams(
      Array.from(
        new Set(state.teamTable?.map((player: Player) => player.team.name))
      )
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    if (query === '') {
      let currentModel: any = state.filterModels.teamFilterModel;
      delete currentModel['searchTerm'];
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'teamFilterModel',
          model: currentModel,
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'teamFilterModel',
          model: {
            ...state.filterModels.teamFilterModel,
            searchTerm: {
              filterType: 'text',
              type: 'contains',
              filter: query,
            },
          },
        },
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTeamFilter = (team: string) => {
    if (team === '') {
      let currentModel: any = state.filterModels.teamFilterModel;
      delete currentModel['team.name'];
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'teamFilterModel',
          model: currentModel,
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'teamFilterModel',
          model: {
            ...state.filterModels.teamFilterModel,
            'team.name': { values: [team], filterType: 'set' },
          },
        },
      });
    }
  };

  const handlePositionFilter = (position: string) => {
    if (position === '') {
      let currentModel: any = state.filterModels.teamFilterModel;
      delete currentModel['data.priceInfo.Position'];
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'teamFilterModel',
          model: currentModel,
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'teamFilterModel',
          model: {
            ...state.filterModels.teamFilterModel,
            'data.priceInfo.Position': {
              values: [position],
              filterType: 'set',
            },
          },
        },
      });
    }
  };

  const handlePriceFilter = (price: number) => {
    if (price === 0) {
      let currentModel: any = state.filterModels.teamFilterModel;
      delete currentModel['data.nowCost'];
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'teamFilterModel',
          model: currentModel,
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'teamFilterModel',
          model: {
            ...state.filterModels.teamFilterModel,
            'data.nowCost': {
              filterType: 'number',
              type: 'inRange',
              filter: 0.0,
              filterTo: price + 0.1,
            },
          },
        },
      });
    }
  };
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
          style={{ flexBasis: '70%' }}
          type="text"
          onChange={(e) => handleSearch(e)}
          placeholder="Search..."
          className="modern-input"
        />
        <div
          style={{
            flexBasis: '15%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <input
            maxLength={10}
            onInput={(e: any) => {
              if (e.target.value.length > 10)
                e.target.value = e.target.value.slice(0, 10);
            }}
            defaultValue={state.team ? parseInt(state.team) : undefined}
            onChange={(e) => setTeamID(e.target.value)}
            type={'number'}
            style={{ flexBasis: '15%' }}
            placeholder="Team ID"
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
            *651161 for VR
          </span>
        </div>
        <button
          style={{ flexBasis: '10%', maxWidth: 'fit-content' }}
          onClick={() => {
            if (teamID) {
              addParamToUrl('team_Id', teamID);
              dispatch({ type: 'SET_TEAM', payload: teamID });
            }
          }}
        >
          Submit
        </button>
      </div>
      <select
        onChange={(e) => handleTeamFilter(e.target.value)}
        className="team-dropdown modern-select"
      >
        <option value="">All Teams</option>
        {teams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => handlePositionFilter(e.target.value)}
        className="position-dropdown modern-select"
      >
        <option value="">All Positions</option>
        {positions.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => handlePriceFilter(parseFloat(e.target.value))}
        className="price-dropdown modern-select"
      >
        {
          // eslint-disable-next-line
          [...Array(Math.ceil(maxPrice * 2) + 1)].map((_, index) => {
            const price = index * 0.5;
            if (index === 0) {
              return (
                <option key={price} value={price}>
                  {'All Prices'}
                </option>
              );
            }
            if (price >= minPrice) {
              return (
                <option key={price} value={price}>
                  {price.toFixed(1)}
                </option>
              );
            }
          })
        }
      </select>
    </div>
  );
};

export default TeamFilters;
