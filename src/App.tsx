import React, { useEffect } from 'react';
import { Header } from './Header/Header';
import { callEP } from './Api/Api';
import { useFplContext } from './Contexts/context';
import GlobalPage from './Pages/GlobalTablePage';
import TeamsPage from './Pages/TeamsTablePage';
import LeaguePage from './Pages/LeagueTablePage';

const App: React.FC = () => {
  const { state, dispatch } = useFplContext();

  useEffect(() => {
    callEP().then((response: any) => {
      dispatch({
        type: 'SET_GLOBAL_TABLE',
        payload: response.data,
      });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      {state.pageState.globalPage && <GlobalPage></GlobalPage>}
      {state.pageState.teamPage && <TeamsPage></TeamsPage>}
      {state.pageState.leaguePage && <LeaguePage></LeaguePage>}
    </>
  );
};

export default App;
