import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Music } from '@prisma/client';
import { addZero } from '@/helpers/addZero';

interface SongSlice {
  song: Music | null;
  volume: number;
  isPlaying: boolean;
  duration: number;
  slider: string;
}

const initialState: SongSlice = {
  song: null,
  volume: 1,
  isPlaying: true,
  duration: 0,
  slider: '00:00',
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
      state.duration = action.payload;
    },
  },
});

export const songSliceActions = songSlice.actions;
