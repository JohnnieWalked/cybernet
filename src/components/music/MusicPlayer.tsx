'use client';

/* hooks */
import { useRef } from 'react';

/* next.js */
import Image from 'next/image';

/* RTK */
import { useAppDispatch, useAppSelector } from '@/hooks/redux-typed-hooks';
import { songSliceActions } from '@/store/slices/song';

import { addZero } from '@/helpers/addZero';

/* icons */
import { FaStopCircle } from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa';
import { IoPlaySkipBackCircle } from 'react-icons/io5';
import { IoPlaySkipForwardCircle } from 'react-icons/io5';

export default function MusicPlayer() {
  const dispatch = useAppDispatch();
  const { song, isPlaying, duration } = useAppSelector(
    (state) => state.songSlice
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!song) return;

  const handleSongTimeSelection = () => {
    console.log(duration);
  };

  return (
    <div className=" flex flex-col w-full h-full gap-5 justify-center items-center text-white transition-all">
      <Image
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full h-full object-cover relative -z-10"
        src={song.imgUrl}
        alt="Song image"
      />
      <section className="flex flex-col text-center drop-shadow-[0px_5px_10px_rgb(0,0,0)]">
        <h2 className=" text-3xl font-bold">{song.name}</h2>
        <h3 className=" text-xl font-medium">{song.author}</h3>
      </section>
      <section className="flex gap-3 justify-center items-center drop-shadow-[0px_5px_10px_rgb(0,0,0)]">
        <div className=" cursor-pointer w-12 h-12 hover:text-cyan-400">
          <IoPlaySkipBackCircle className="w-full h-full transition" />
        </div>

        {isPlaying ? (
          <div
            className=" cursor-pointer w-14 h-14 hover:text-cyan-400"
            onClick={() => dispatch(songSliceActions.status(false))}
          >
            <FaStopCircle className="w-full h-full transition" />
          </div>
        ) : (
          <div
            className=" cursor-pointer w-14 h-14 hover:text-cyan-400"
            onClick={() => dispatch(songSliceActions.status(true))}
          >
            <FaPlayCircle className="w-full h-full transition" />
          </div>
        )}

        <div className=" cursor-pointer w-12 h-12 hover:text-cyan-400">
          <IoPlaySkipForwardCircle className="w-full h-full transition" />
        </div>
      </section>{' '}
      {/* control panel */}
      <div className="flex justify-center items-center gap-4 drop-shadow-[0px_5px_10px_rgb(0,0,0)]">
        <div className=" font-semibold">00:00</div>
        <div
          ref={sliderRef}
          onClick={handleSongTimeSelection}
          className=" w-72 h-2 bg-white rounded cursor-pointer"
        ></div>
        <div className="font-semibold">{duration}</div>
      </div>
    </div>
  );
}
