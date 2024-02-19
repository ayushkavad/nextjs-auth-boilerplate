import { api } from './api';
import { ROUTES } from '@/router/router';
import {
  createSessionCookies,
  getRefreshToken,
  getToken,
  removeSessionCookies,
} from '@/utils/tokenCookies';

let isRefreshing = false;
let failedRequestQueue = [];

export function setAuthorizationHeader(params) {
  const { request, token } = params;
  request.headers['Authorization'] = `Bearer ${token}`;
}

function handleRefreshToken(refreshToken) {
  isRefreshing = true;

  api
    .post(
      '/refreshToken',
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )
    .then((response) => {
      const { token } = response.data;

      createSessionCookies({ token, refreshToken: response.data.refreshToken });
      setAuthorizationHeader({ request: api.defaults, token });

      failedRequestQueue.forEach((request) => request.onSuccess(token));
      failedRequestQueue = [];
    })
    .catch((error) => {
      failedRequestQueue.forEach((request) => request.onFailure(error));
      failedRequestQueue = [];

      removeSessionCookies();
    })
    .finally(() => {
      isRefreshing = false;
    });
}

function onRequest(config) {
  const token = getToken();

  if (token) {
    setAuthorizationHeader({ request: config, token });
  }

  return config;
}

function onRequestError(error) {
  return Promise.reject(error);
}

function onResponse(response) {
  return response;
}

function onResponseError(error) {
  if (error?.response?.status === 401) {
    if (error.response?.data?.code === 'token.expired') {
      const originalConfig = error.config;
      const refreshToken = getRefreshToken();

      if (!isRefreshing) {
        handleRefreshToken(refreshToken);
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token) => {
            setAuthorizationHeader({ request: originalConfig, token });
            resolve(api(originalConfig));
          },
          onFailure: (error) => {
            reject(error);
          },
        });
      });
    } else {
      removeSessionCookies();
      window.location.href = ROUTES.login.index();
    }
  }

  return Promise.reject(error);
}

export function setupInterceptors(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
