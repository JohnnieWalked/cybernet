import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Session } from 'next-auth/types';

interface UserSliceType {
  userData: Session['user'] | undefined;
}

const initialState: UserSliceType = {
  userData: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    uploadSession: (state, action: PayloadAction<Session['user']>) => {
      state.userData = action.payload;
    },
  },
});

export const userSliceActions = userSlice.actions;
