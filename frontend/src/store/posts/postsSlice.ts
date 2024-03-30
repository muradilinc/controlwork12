import { Post, User } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getOneUser, getPosts } from './postsThunk';

interface PostsState {
  posts: Post[];
  guest: User | null;
  postsLoading: boolean;
}

const initialState: PostsState = {
  posts: [],
  guest: null,
  postsLoading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.postsLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, { payload: posts }) => {
      state.postsLoading = false;
      state.posts = posts;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.postsLoading = false;
    });
    builder.addCase(getOneUser.pending, (state) => {
      state.postsLoading = true;
    });
    builder.addCase(getOneUser.fulfilled, (state, { payload: data }) => {
      state.postsLoading = false;
      state.guest = data.user;
    });
    builder.addCase(getOneUser.rejected, (state) => {
      state.postsLoading = false;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectGuest = (state: RootState) => state.posts.guest;
export const selectPostsLoading = (state: RootState) =>
  state.posts.postsLoading;
