import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const instance = Axios.create();
const axios = setupCache(instance, { debug: console.log });

const backend_Url = 'https://ministerial-wilie-akkountant-9398452e.koyeb.app/';
const dev = false;
const local = 'http://127.0.0.1:5000';

export async function callEP() {
  let cacheInstance = {};
  return axios
    .get(`${dev ? local : backend_Url}/data`, {
      cache: cacheInstance,
      id: 'fetch-data',
    })
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
