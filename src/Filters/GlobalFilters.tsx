import React, { useCallback, useEffect, useState } from 'react';
import './Filters.scss';
import { Player } from '../Types/DataType';
import { useFplContext } from '../Contexts/context';
interface FilterProps {}

const GlobalFilters: React.FC<FilterProps> = () => {
  const { state, dispatch } = useFplContext();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [teams, setTeams] = useState<string[]>([]);
  const positions = ['GK', 'MID', 'DEF', 'FOR'];

  useEffect(() => {
    setMaxPrice(
      Math.max(
        ...(state.globalTable
          ? state.globalTable.map((player: Player) => player.data.nowCost / 10)
          : [0])
      )
    );
    setMinPrice(
      Math.min(
        ...(state.globalTable
          ? state.globalTable.map((player: Player) => player.data.nowCost / 10)
          : [5])
      )
    );
    setTeams(
      Array.from(
        new Set(state.globalTable?.map((player: Player) => player.team.name))
      )
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    if (query === '') {
      let currentModel: any = state.filterModels.globalFilterModel;
      delete currentModel['searchTerm'];
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'globalFilterModel',
          model: currentModel,
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'globalFilterModel',
          model: {
            ...state.filterModels.globalFilterModel,
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
      let currentModel: any = state.filterModels.globalFilterModel;
      delete currentModel['team.name'];
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'globalFilterModel',
          model: currentModel,
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'globalFilterModel',
          model: {
            ...state.filterModels.globalFilterModel,
            'team.name': { values: [team], filterType: 'set' },
          },
        },
      });
    }
  };

  const handlePositionFilter = (position: string) => {
    if (position === '') {
      let currentModel: any = state.filterModels.globalFilterModel;
      delete currentModel['data.priceInfo.Position'];
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'globalFilterModel',
          model: currentModel,
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'globalFilterModel',
          model: {
            ...state.filterModels.globalFilterModel,
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
      let currentModel: any = state.filterModels.globalFilterModel;
      delete currentModel['data.nowCost'];
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'globalFilterModel',
          model: currentModel,
        },
      });
    } else {
      dispatch({
        type: 'SET_FILTER_MODEL',
        payload: {
          modelName: 'globalFilterModel',
          model: {
            ...state.filterModels.globalFilterModel,
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
      <div className="search-bar">
        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          placeholder="Search..."
          className="modern-input"
        />
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

export default GlobalFilters;
