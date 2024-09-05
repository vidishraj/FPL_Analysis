import React, { createContext, useReducer, Dispatch, useContext } from 'react';
import { Player } from '../Table/DataType'; // Import the Player type from your types file
import { League } from '../Table/LeagueType';

interface PageState {
  globalPage: boolean;
  teamPage: boolean;
  leaguePage: boolean;
}

// Define the types for the context state
interface TableState {
  leagueTable: League | undefined;
  teamTable: Player[] | undefined;
  globalTable: Player[] | undefined;
  pageState: PageState;
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
};

// Define action types
type Action =
  | { type: 'SET_LEAGUE_TABLE'; payload: League | undefined }
  | { type: 'SET_TEAM_TABLE'; payload: Player[] | undefined }
  | { type: 'SET_GLOBAL_TABLE'; payload: Player[] | undefined }
  | { type: 'SET_PAGE'; payload: string };

// Create the reducer function
const tableReducer = (state: TableState, action: Action): TableState => {
  switch (action.type) {
    case 'SET_LEAGUE_TABLE':
      return { ...state, leagueTable: action.payload };
    case 'SET_TEAM_TABLE':
      return { ...state, teamTable: action.payload };
    case 'SET_GLOBAL_TABLE':
      return { ...state, globalTable: action.payload };
    case 'SET_PAGE':
      return {
        ...state,
        pageState: {
          ...state.pageState,
          [action['payload']]: true,
        },
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
