'use server';

import { getNextSong as fetchNextSong } from '@/data/music';

export async function getNextSong(
  currentSongID: number,
  totalPlaylistlength: number
) {
  if (currentSongID !== totalPlaylistlength) {
    const song = await fetchNextSong(currentSongID + 1);
    return song;
  } else {
    const song = fetchNextSong(1); // start from the beggining
    return song;
  }
}
