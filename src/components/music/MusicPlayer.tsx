'use client';

/* hooks */
import { useRef, useEffect, useState } from 'react';

/* helpers */
import { toHumanDuration } from '@/helpers/toHumanDuration';

/* types */
import type { Music } from '@prisma/client';

/* next.js */
import Image from 'next/image';

/* RTK */
import { useAppDispatch, useAppSelector } from '@/hooks/redux-typed-hooks';
import { songSliceActions } from '@/store/slices/song';

/* icons */
import { FaStopCircle } from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa';
import { IoPlaySkipBackCircle } from 'react-icons/io5';
import { IoPlaySkipForwardCircle } from 'react-icons/io5';
import { FaVolumeHigh } from 'react-icons/fa6';

type MusicPlayerProps = {
  musicList: Music[];
};

export default function MusicPlayer({ musicList }: MusicPlayerProps) {
  const dispatch = useAppDispatch();
  const { song, isPlaying, totalDuration, currentTime, volume } =
    useAppSelector((state) => state.songSlice);
  const [completedPathWidth, setCompletedPathWidth] = useState('0');
  const [currentSongIndex, setCurrentSongIndex] = useState<null | number>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  /* get musicList length and pass to RTK */
  useEffect(() => {
    dispatch(songSliceActions.setPlaylistLength(musicList.length));
  }, [dispatch, musicList.length]);

  /* set index of current song in component state. Reason => handle next and previous song buttons */
  useEffect(() => {
    if (!song) return;
    const nowPlayingSongindex = musicList.findIndex(
      (item) => item.id === song.id
    );
    setCurrentSongIndex(nowPlayingSongindex);
  }, [dispatch, musicList, song]);

  /* update seeker and path behing it in cyan color (represents completed path) */
  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }
    if (!isNaN(totalDuration)) {
      const seekerPosition =
        currentTime * (sliderRef.current.clientWidth / totalDuration);
      sliderRef.current.max = sliderRef.current.clientWidth.toString();
      sliderRef.current.value = seekerPosition.toString();
      setCompletedPathWidth(sliderRef.current.value);
    }
  }, [currentTime, totalDuration]);

  if (!song) return;

  const handlePreviousSong = () => {
    if (currentSongIndex === null) return;
    if (currentSongIndex === 0) {
      const selectPreviousSong = musicList[musicList.length - 1];
      dispatch(songSliceActions.currentPlayingSong(selectPreviousSong));
    } else {
      const selectPreviousSong = musicList[currentSongIndex - 1];
      dispatch(songSliceActions.currentPlayingSong(selectPreviousSong));
    }
  };

  const handleNextSong = () => {
    if (currentSongIndex === null) return;
    if (currentSongIndex === musicList.length - 1) {
      const selectNextSong = musicList[0];
      dispatch(songSliceActions.currentPlayingSong(selectNextSong));
    } else {
      const selectNextSong = musicList[currentSongIndex + 1];
      dispatch(songSliceActions.currentPlayingSong(selectNextSong));
    }
  };

  return (
    <section className=" flex flex-col w-full h-full gap-5 justify-center items-center text-white transition-all">
      <Image
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full h-full object-cover relative -z-10"
        src={song.imgUrl}
        alt="Song image"
      />

      <div className="flex flex-col text-center drop-shadow-[0px_5px_10px_rgb(0,0,0)]">
        <h2 className=" text-3xl font-bold">{song.name}</h2>
        <h3 className=" text-xl font-medium">{song.author}</h3>
      </div>

      <div className="flex gap-3 justify-center items-center drop-shadow-[0px_5px_10px_rgb(0,0,0)]">
        <div
          onClick={handlePreviousSong}
          className=" cursor-pointer w-12 h-12 hover:text-cyan-400"
        >
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

        <div
          onClick={handleNextSong}
          className=" cursor-pointer w-12 h-12 hover:text-cyan-400"
        >
          <IoPlaySkipForwardCircle className="w-full h-full transition" />
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 drop-shadow-[0px_5px_10px_rgb(0,0,0)]">
        <div className=" w-12 font-semibold">
          {toHumanDuration(currentTime)}
        </div>
        <div
          className={`w-72 h-2 bg-slate-200 rounded relative transition-all z-0 `}
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
            className=" completedPath absolute rounded h-full bg-cyan-400 hover:brightness-125 pointer-events-none transition-all z-10"
          ></span>
        </div>

        <div className="font-semibold">{toHumanDuration(totalDuration)}</div>
      </div>

      <div className="flex gap-4">
        <FaVolumeHigh className=" w-6 h-6" />
        <input
          onChange={(e) => {
            dispatch(
              songSliceActions.changeVolume(+e.currentTarget.value / 100)
            );
          }}
          className="mp3-volume"
          type="range"
          defaultValue={volume * 100}
          min={0}
          max={100}
        />
      </div>
    </section>
  );
}
