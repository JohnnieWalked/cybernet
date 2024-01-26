import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Music } from '@prisma/client';

interface SongSlice {
  song: Music | null;
  volume: number;
  isPlaying: boolean;
  totalDuration: number;
  currentTime: number;
  moveTo: false | number;
  nextSong: Music | null;
}

const initialState: SongSlice = {
  song: null,
  volume: 0.5,
  isPlaying: true,
  totalDuration: 0,
  currentTime: 0,
  moveTo: false,
  nextSong: null,
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
    setNextSong: (state, action: PayloadAction<Music>) => {
      state.nextSong = action.payload;
    },
    changeVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const songSliceActions = songSlice.actions;
