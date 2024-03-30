import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { AuthResponse, LoginMutation, RegisterMutation } from '../../types';
import { isAxiosError } from 'axios';
import { logoutState } from './usersSlice';
import { RootState } from '../../app/store';

export const register = createAsyncThunk<AuthResponse, RegisterMutation>(
  'users/register',
  async (data) => {
    try {
      const response = await axiosApi.post('/users', {
        ...data,
        displayName: data.username,
      });
      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        console.log(error.response.data);
      }

      throw error;
    }
  },
);

export const login = createAsyncThunk<AuthResponse, LoginMutation>(
  'users/login',
  async (data) => {
    try {
      const response = await axiosApi.post<AuthResponse>(
        '/users/sessions',
        data,
      );
      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        console.log(error.response.data);
      }

      throw error;
    }
  },
);

export const googleLogin = createAsyncThunk<AuthResponse, string>(
  'users/googleLogin',
  async (credential) => {
    try {
      const response = await axiosApi.post<AuthResponse>('/users/google', {
        credential,
      });
      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        console.log(error.response.data);
      }

      throw error;
    }
  },
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete('/users/sessions');
    dispatch(logoutState());
  },
);
