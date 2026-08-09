// src/lib/api.ts

import axios from "axios";

export let onAuthFailure: (() => void) | null = null;

export function setAuthFailureHandler(handler: () => void) {
  onAuthFailure = handler;
}

const productionApiIP = "72.60.220.34";
const localIP = "localhost";
// Headers Below Incase we need it
  // headers: {
  //   "Content-Type": "application/json",
  // },
const api = axios.create({
  baseURL: `http://${localIP}:3002/api`,

  withCredentials: false,
});
let isRefreshing : boolean = false;
let refreshPromise: Promise<string> | null = null;
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
if (!originalRequest) {
  return Promise.reject(error);
}
if (!originalRequest.retryCount) {
  originalRequest.retryCount = 0;
}

    const authHeader = originalRequest.headers?.Authorization;

    const isRefreshable =
      typeof authHeader === "string" &&
      authHeader.startsWith("Bearer ");

if (
  error.response?.status === 401 &&
  originalRequest.retryCount < 1 &&
  isRefreshable
) {
  originalRequest.retryCount++;

  try {
    if (!isRefreshing) {
      console.log("Starting refresh...");

      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      refreshPromise = axios
        .post(
          `http://${localIP}:3002/api/auth/refresh`,
          {
            refreshToken,
          }
        )
        .then((response) => {
          const {
            accessToken,
            refreshToken: newRefreshToken,
          } = response.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          return accessToken;
        })
        .finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
    } else {
      console.log("Waiting for existing refresh...");
    }

    const newAccessToken = await refreshPromise!;

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return api(originalRequest);
  } catch (refreshError: any) {
    if (refreshError.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      onAuthFailure?.();
    }

    return Promise.reject(refreshError);
  }
}

    return Promise.reject(error);
  }
);

export default api;