import axios from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from './app/store';

export const axiosApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export const addInterceptor = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().users.user?.token;
    config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);
    return config;
  });
};

export default axiosApi;
