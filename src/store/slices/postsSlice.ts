import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { ModifiedPost } from '@/types';

interface PostsSliceType {
  postsArray: ModifiedPost[];
  takeDefault: number;
  skipDefault: number;
  currentTake: number;
  currentSkip: number;
}

const initialState: PostsSliceType = {
  postsArray: [],
  takeDefault: 3,
  skipDefault: 0,
  currentTake: 3,
  currentSkip: 0,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePostsArray: (state, action: PayloadAction<ModifiedPost[]>) => {
      state.postsArray.push(...action.payload);
    },
    clearPostsArray: (state) => {
      state.postsArray = [];
    },
  },
});

export const postsSliceActions = postsSlice.actions;
