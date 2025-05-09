import axios from 'axios';
import { CreateAxiosClient } from './fetcher.types';

// TODO вынести в конфиг
const BASE_URL = 'http://pub.trixolma.localhost:5000/api/v1';

let failedQueue: Array<unknown> = [];
let isRefreshing = false;

const processQueue = (error: Error | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      // @ts-ignore
      prom.reject(error);
    } else {
      // @ts-ignore
      prom.resolve();
    }
  });

  failedQueue = [];
};

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function createAxiosClient({
  options,
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl,
  logout,
}: CreateAxiosClient) {
  const client = axios.create(options);

  client.interceptors.request.use(
    (config) => {
      // @ts-ignore
      if (config.authorization !== false) {
        const token = getCurrentAccessToken();

        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    (error => {
      const originalRequest = error.config;

      originalRequest.headers = JSON.parse(
        JSON.stringify(originalRequest.headers || {})
      );

      // TODO взять из httpOnly куки
      const refreshToken = getCurrentRefreshToken();

      const handleError = (error: Error | null) => {
        processQueue(error);
        logout();
        return Promise.reject(error);
      };

      if (
        refreshToken &&
        error.response?.status === 401 &&
        originalRequest?.url !== refreshTokenUrl &&
        !originalRequest?._retry
      ) {
        if (isRefreshing) {
          return new Promise(((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }))
            .then(() => client(originalRequest))
            .catch(Promise.reject);
        }

        isRefreshing = true;
        originalRequest._retry = true;

        return client.post(refreshTokenUrl, {
          refreshToken
        })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .then((res) => {
            // TODO установить токены
            processQueue(null);

            return client(originalRequest);
          }, handleError)
          .finally(() => {
            isRefreshing = false;
          });
      }

      if (error.response?.status === 401) {
        return handleError(error);
      }

      return Promise.reject(error);
    })
  );

  return client;
}

const fetcher = axios.create({ baseURL: BASE_URL });

const JWTToken = localStorage.getItem('jwt');

if (JWTToken) {
  fetcher.defaults.headers.Authorization =  `Bearer ${JWTToken}`;
}

