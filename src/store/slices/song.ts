import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Music } from '@prisma/client';
import { addZero } from '@/helpers/addZero';

interface SongSlice {
  song: Music | null;
  volume: number;
  isPlaying: boolean;
  totalDuration: number;
  currentTime: number;
  moveTo: false | number;
}

const initialState: SongSlice = {
  song: null,
  volume: 0.1,
  isPlaying: true,
  totalDuration: 0,
  currentTime: 0,
  moveTo: false,
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    currentPlayingSong: (state, action: PayloadAction<Music>) => {
      state.song = action.payload;
    },
    status: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setSongDuration: (state, action: PayloadAction<number>) => {
      state.totalDuration = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    moveTo: (state, action: PayloadAction<number | false>) => {
      state.moveTo = action.payload;
    },
  },
});

export const songSliceActions = songSlice.actions;
