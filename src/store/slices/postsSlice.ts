import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { ModifiedPost } from '@/types';

interface PostsSliceType {
  postsArray: ModifiedPost[];
  currentTake: number;
  currentSkip: number;
}

const initialState: PostsSliceType = {
  postsArray: [],
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
    deletePostFromArray: (state, action: PayloadAction<string>) => {
      state.postsArray = state.postsArray.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const postsSliceActions = postsSlice.actions;
