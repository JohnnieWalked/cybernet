import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Post } from '@prisma/client';

export type ModifiedPost = Post | { createdAt: string; updatedAt: string };

interface PostsSliceType {
  postsArray: ModifiedPost[];
  take: number;
  skip: number;
}

const initialState: PostsSliceType = {
  postsArray: [],
  take: 3,
  skip: 0,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePostsArray: (state, action: PayloadAction<ModifiedPost[]>) => {
      /* convert from Date (non-serialized value) to DateString */
      action.payload.forEach((post) => {
        if (typeof post.createdAt !== 'string')
          post.createdAt = post.createdAt.toDateString();
        if (typeof post.updatedAt !== 'string')
          post.updatedAt = post.updatedAt.toDateString();
      });
      state.postsArray.push(...action.payload);
    },
    clearPostsArray: (state) => {
      state.postsArray = [];
    },
  },
});

export const postsSliceActions = postsSlice.actions;
