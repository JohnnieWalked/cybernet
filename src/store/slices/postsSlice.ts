import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Post } from '@prisma/client';

export type ModifiedPost = /* Omit< */
  | Post /* , "createdAt" | "updatedAt"> */
  | { createdAt: string; updatedAt: string };

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
      /* convert from Date (non-serialized value) to DateString */
      action.payload.forEach((post) => {
        if (typeof post.createdAt !== 'string')
          post.createdAt = post.createdAt.toLocaleDateString();
        if (typeof post.updatedAt !== 'string')
          post.updatedAt = post.updatedAt.toLocaleDateString();
      });
      state.postsArray.push(...action.payload);
    },
    clearPostsArray: (state) => {
      state.postsArray = [];
    },
  },
});

export const postsSliceActions = postsSlice.actions;
