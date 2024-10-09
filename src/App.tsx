import React, { useEffect } from 'react';
import { Header } from './Header/Header';
import { callEP } from './Api/Api';
import { useFplContext } from './Contexts/context';
import GlobalPage from './Pages/GlobalTablePage';
import TeamsPage from './Pages/TeamsTablePage';
import LeaguePage from './Pages/LeagueTablePage';
import { setupAxiosInterceptors } from './Api/Interceptor';
import Loader from './Loader/Loader';
import FplLineup from './Pages/CreateTeam/CreateTeam';
import LiveLeaguePage from './Pages/LiveLeagueTablePage';

const App: React.FC = () => {
  const { state, dispatch } = useFplContext();

  useEffect(() => {
    setupAxiosInterceptors(dispatch); // Pass the dispatcher to Axios interceptor
    callEP()
      .then((response: any) => {
        dispatch({
          type: 'SET_GLOBAL_TABLE',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      {state.loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div style={{ marginTop: '50px' }}>
            {state.pageState.globalPage && <GlobalPage></GlobalPage>}
            {state.pageState.teamPage && <TeamsPage></TeamsPage>}
            {state.pageState.leaguePage && <LeaguePage></LeaguePage>}
            {state.pageState.liveLeaguePage && (
              <LiveLeaguePage></LiveLeaguePage>
            )}
            {state.pageState.createTeamPage && <FplLineup></FplLineup>}
          </div>
        </>
      )}
    </>
  );
};

export default App;
