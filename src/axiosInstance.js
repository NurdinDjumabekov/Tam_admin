import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

let store; // Это стандартный store

export const propsStoreFN = (oldStore) => {
  store = oldStore;
};

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 15000
  // headers: {
  //   user-guid: '2876b32f-ab42-4c73-82b4-78e10e4a7425',
  // },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store?.getState();
    const user_guid = '2876b32f-ab42-4c73-82b4-78e10e4a7425';
    const token = state?.saveDataSlice?.dataSave?.token?.accessToken;

    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (user_guid) {
      config.headers['user-guid'] = user_guid;
    }

    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
      config.data = { user_guid, ...config.data };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { dispatch } = store;
        // dispatch(getToken()); // Получаю токен
        return axiosInstance.request(originalRequest);
      } catch (e) {
        console.log('Не удалось авторизоваться');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
