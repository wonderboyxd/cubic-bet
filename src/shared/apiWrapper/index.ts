import axios from 'axios';

export const $api = axios.create({
    baseURL: 'https://api.lettobet.dev.bet4skill.com/api',
    withCredentials: true,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-RU,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,he;q=0.6',
      'Content-Type': 'application/json'
    }
  });

const maxRetries = 2;
let retriesCount = 0;

$api.interceptors.request.use((config) => {
  
    return config;
  });

$api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && retriesCount < maxRetries) {
      retriesCount++;

      await new Promise(resolve => setTimeout(resolve, retriesCount * 1000));

      return $api(originalRequest);
    }
    return Promise.reject(error);
  }
);