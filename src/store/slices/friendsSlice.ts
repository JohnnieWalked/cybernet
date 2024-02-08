import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { ModifiedUser } from '@/types';

interface FriendsSliceType {
  friendsArray: ModifiedUser[];
  fetchPostsOfCurrentNumberOfFriends: number;
}

const initialState: FriendsSliceType = {
  friendsArray: [],
  fetchPostsOfCurrentNumberOfFriends: 3,
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriendsArray: (state, action: PayloadAction<ModifiedUser[]>) => {
      state.friendsArray = action.payload;
    },
  },
});

export const friendsSliceActions = friendsSlice.actions;
