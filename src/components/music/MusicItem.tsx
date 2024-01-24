'use client';

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
      </div>
      <div className="flex h-full flex-col justify-center items-start text-white break-words">
        <div className=" font-bold text-yellow-400">{song.name}</div>
        <div className=" font-light">{song.author}</div>
      </div>
    </div>
  );
}
