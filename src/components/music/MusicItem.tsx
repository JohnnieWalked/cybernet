'use client';

import musicGif from '/public/imgs/gif_music.gif';
import Image from 'next/image';
import type { Music } from '@prisma/client';
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-typed-hooks';
import { songSliceActions } from '@/store/slices/song';

type MusicItemProps = {
  song: Music;
};

export default function MusicItem({ song }: MusicItemProps) {
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.songSlice);

  const handleClick = useCallback(() => {
    dispatch(songSliceActions.currentPlayingSong(song));
  }, [dispatch, song]);

  return (
    <div
      onClick={handleClick}
      className="flex w-full h-16 justify-start gap-5 overflow-hidden cursor-pointer song"
    >
      <div className=" relative flex w-16 h-full rounded-[100%]">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="flex w-full h-full object-cover rounded-full border-2 border-black"
          src={song.imgUrl}
          alt="Song image"
        />
        {currentSong.song?.id === song.id && (
          <Image
            className=" absolute top-0 left-0 w-full h-full object-cover opacity-70 rounded-full"
            src={musicGif}
            alt="GIF Equalizer"
          />
        )}
      </div>
      <div className="flex h-full flex-col justify-center items-start text-white break-words">
        <div
          className={`font-bold ${
            currentSong.song?.id === song.id
              ? 'text-cyan-400'
              : 'text-yellow-400'
          } `}
        >
          {song.name}
        </div>
        <div
          className={`font-light ${
            currentSong.song?.id === song.id && 'text-cyan-400'
          }`}
        >
          {song.author}
        </div>
      </div>
    </div>
  );
}
