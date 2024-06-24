import axios from 'axios';
import Cookies from 'js-cookie';

export const $api = axios.create({
    baseURL: 'https://api.lettobet.dev.bet4skill.com/api',
  });

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers['Cookie'] = Cookies.get('connect.sid')
    }
    return config;
  });

  $api.interceptors.response.use(
    (config) => {
      return config
    },
    async (error) => {
        return Promise.reject(error);
    }
);