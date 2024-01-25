'use client';

/* hooks */
import { useRef, useEffect, useState } from 'react';

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
import { toHumanDuration } from '@/helpers/toHumanDuration';

export default function MusicPlayer() {
  const dispatch = useAppDispatch();
  const { song, isPlaying, totalDuration, currentTime } = useAppSelector(
    (state) => state.songSlice
  );
  const [completedPathWidth, setCompletedPathWidth] = useState('0');
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!sliderRef.current || !song) {
      return;
    }
    if (!isNaN(totalDuration)) {
      const seekerPosition =
        currentTime * (sliderRef.current.clientWidth / totalDuration);
      sliderRef.current.max = sliderRef.current.clientWidth.toString();
      sliderRef.current.value = seekerPosition.toString();
      setCompletedPathWidth(sliderRef.current.value);
    }
  }, [currentTime, song, totalDuration]);

  if (!song) return;

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
          className={`w-72 h-2 bg-white rounded relative transition-all z-0 `}
        >
          <input
            onChange={(e) =>
              dispatch(
                songSliceActions.moveTo(
                  totalDuration *
                    (+e.currentTarget.value / e.currentTarget.clientWidth)
                )
              )
            }
            min={0}
            type="range"
            ref={sliderRef}
            className={`mp3-slider appearance-none bg-none bg-transparent absolute w-full h-full cursor-pointer transition-all z-20 `}
          />
          <span
            style={{ width: `${completedPathWidth}px` }}
            className="absolute rounded h-full bg-cyan-400 pointer-events-none transition-all z-10"
          ></span>
        </div>

        <div className="font-semibold">{toHumanDuration(totalDuration)}</div>
      </div>
    </div>
  );
}
