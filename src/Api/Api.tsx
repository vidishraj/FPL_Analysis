import axios from 'axios';
// import { setupCache } from 'axios-cache-interceptor';

// const instance = Axios.create();
// export const axios = setupCache(instance, { debug: console.log });

const backend_Url = '/api/';
const dev = false;
const local = 'http://127.0.0.1:5000';

export async function callEP() {
  return axios
    .get(`${dev ? local : backend_Url}/data`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Error calling api for data.', err);
    });
}

export function fetchTeam(teamId: string) {
  return axios.get(`${dev ? local : backend_Url}/fetchTeam`, {
    params: {
      team_id: teamId,
    },
  });
}

export function fetchLeague(leagueId: string) {
  return axios.get(`${dev ? local : backend_Url}/fetchLeague`, {
    params: {
      league_id: leagueId,
    },
  });
}
export function fetchLiveLeague(leagueId: string) {
  return axios.get(`${dev ? local : backend_Url}/fetchLiveLeague`, {
    params: {
      league_id: leagueId,
    },
  });
}
