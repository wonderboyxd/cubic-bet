import axios from 'axios';
import Cookies from 'js-cookie';

export const $api = axios.create({
    baseURL: 'https://api.lettobet.dev.bet4skill.com/api',
  });

$api.interceptors.request.use((config) => {
    if (config.headers) {
      config.headers['Cookie'] = 'connect.sid= ' + Cookies.get('accessToken');
    }
    return config;
  });

  $api.interceptors.response.use(
    (config) => config,
    async (error) => {
        return Promise.reject(error);
    }
);