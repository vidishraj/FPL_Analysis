import React, { createContext, useReducer, Dispatch, useContext } from 'react';
import { Player } from '../Types/DataType'; // Import the Player type from your types file
import { League } from '../Types/LeagueType';
import { FilterModel } from 'ag-grid-community';

interface PageState {
  globalPage: boolean;
  teamPage: boolean;
  leaguePage: boolean;
}

interface FilterModels {
  globalFilterModel: FilterModel;
  teamFilterModel: FilterModel;
  leagueFilterModel: FilterModel;
}

// Define the types for the context state
interface TableState {
  leagueTable: League | undefined;
  teamTable: Player[] | undefined;
  globalTable: Player[] | undefined;
  pageState: PageState;
  filterModels: FilterModels;
  team: string | null | undefined;
  league: string | null | undefined;
  loading: boolean;
}

// Define initial state
const initialState: TableState = {
  leagueTable: undefined,
  teamTable: undefined,
  globalTable: undefined,
  pageState: {
    globalPage: true,
    teamPage: false,
    leaguePage: false,
  },
  filterModels: {
    globalFilterModel: {},
    teamFilterModel: {},
    leagueFilterModel: {},
  },
  team: null,
  league: null,
  loading: true,
};

// Define action types
export type Action =
  | { type: 'SET_LEAGUE_TABLE'; payload: League | undefined }
  | { type: 'SET_TEAM_TABLE'; payload: Player[] | undefined }
  | { type: 'SET_GLOBAL_TABLE'; payload: Player[] | undefined }
  | { type: 'SET_GLOBAL_PAGE' }
  | { type: 'SET_TEAMS_PAGE' }
  | { type: 'SET_LEAGUE_PAGE' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_FILTER_MODEL'; payload: FilterModel }
  | { type: 'SET_TEAM'; payload: string | null | undefined }
  | { type: 'SET_LEAGUE'; payload: string | null | undefined };

// Create the reducer function
const tableReducer = (state: TableState, action: Action): TableState => {
  switch (action.type) {
    case 'SET_LEAGUE_TABLE':
      return { ...state, leagueTable: action.payload };
    case 'SET_TEAM_TABLE':
      return { ...state, teamTable: action.payload };
    case 'SET_GLOBAL_TABLE':
      return { ...state, globalTable: action.payload };
    case 'SET_GLOBAL_PAGE':
      return {
        ...state,
        pageState: { globalPage: true, teamPage: false, leaguePage: false },
      };
    case 'SET_TEAMS_PAGE':
      return {
        ...state,
        pageState: { globalPage: false, teamPage: true, leaguePage: false },
      };
    case 'SET_LEAGUE_PAGE':
      return {
        ...state,
        pageState: { globalPage: false, teamPage: false, leaguePage: true },
      };

    case 'SET_FILTER_MODEL':
      return {
        ...state,
        filterModels: {
          ...state.filterModels,
          [action['payload']['modelName']]: action.payload.model,
        },
      };
    case 'SET_TEAM':
      return {
        ...state,
        team: action.payload,
      };
    case 'SET_LEAGUE':
      return {
        ...state,
        league: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

// Create context
interface TableContextProps {
  state: TableState;
  dispatch: Dispatch<Action>;
}

export const TableContext = createContext<TableContextProps>({
  state: initialState,
  dispatch: () => null,
});

// Create the provider component
export const TableProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};

export const useFplContext = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error('useFplContext must be used within a GlobalProvider');
  }
  return context;
};
