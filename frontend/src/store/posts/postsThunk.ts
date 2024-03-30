import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, Post, PostMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';

export const createPost = createAsyncThunk<
  void,
  PostMutation,
  { state: RootState }
>('posts/createPost', async (data, { getState }) => {
  try {
    const formData = new FormData();
    const user = getState().users.user;
    formData.append('title', data.title);
    formData.append('author', user?._id ? user._id : '');
    if (data.image) {
      formData.append('image', data.image);
    }
    await axiosApi.post('/posts', formData);
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
});

export const getPosts = createAsyncThunk<Post[], string | undefined>(
  'posts/getAll',
  async (userId) => {
    if (userId) {
      const response = await axiosApi.get(`/posts?userId=${userId}`);
      return response.data;
    } else {
      const response = await axiosApi.get('/posts');
      return response.data;
    }
  },
);

export const getOneUser = createAsyncThunk<AuthResponse, string>(
  'posts/getOne',
  async (id) => {
    try {
      const response = await axiosApi.get(`/users/${id}`);
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

export const deletePost = createAsyncThunk<void, string>(
  'posts/deletePost',
  async (id) => {
    await axiosApi.delete(`/posts/${id}`);
  },
);
