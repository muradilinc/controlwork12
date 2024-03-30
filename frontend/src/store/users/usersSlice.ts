import { User } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { googleLogin, login, register } from './usersThunk';
import { RootState } from '../../app/store';

interface UsersState {
  user: User | null;
  loginLoading: boolean;
  registerLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  loginLoading: false,
  registerLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutState: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload: data }) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(register.rejected, (state) => {
      state.registerLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload: data }) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginLoading = false;
    });
    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, { payload: data }) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(googleLogin.rejected, (state) => {
      state.loginLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { logoutState } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
