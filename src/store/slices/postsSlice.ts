import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Post } from '@prisma/client';

export type ModifiedPost = Post | { createdAt: string; updatedAt: string };

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
    patchPostsArray: (state, action: PayloadAction<ModifiedPost[]>) => {
      /* convert from Date (non-serialized value) to DateString */
      action.payload.forEach((post) => {
        if (typeof post.createdAt !== 'string')
          post.createdAt = post.createdAt.toDateString();
        if (typeof post.updatedAt !== 'string')
          post.updatedAt = post.updatedAt.toDateString();
      });
      state.postsArray.push(...action.payload);
    },
    updatePostsArray: (state, action: PayloadAction<ModifiedPost[]>) => {
      /* convert from Date (non-serialized value) to DateString */
      action.payload.forEach((post) => {
        if (typeof post.createdAt !== 'string')
          post.createdAt = post.createdAt.toDateString();
        if (typeof post.updatedAt !== 'string')
          post.updatedAt = post.updatedAt.toDateString();
      });
      state.postsArray = action.payload;
    },
  },
});

export const postsSliceActions = postsSlice.actions;
