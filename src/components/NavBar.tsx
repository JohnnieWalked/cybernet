'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { paths } from '@/routes';
import { useRef, useEffect } from 'react';
import * as actions from '@/actions';

/* components */
import MusicNav from './music/MusicNav';

/* redux-tk */
import { useAppSelector, useAppDispatch } from '@/hooks/redux-typed-hooks';
import { songSliceActions } from '@/store/slices/song';

/* icons */
import { FaHome, FaUserFriends } from 'react-icons/fa';
import {
  IoMdMail,
  IoIosMailOpen,
  IoMdSettings,
  IoIosMusicalNotes,
} from 'react-icons/io';
import { FaCircleInfo } from 'react-icons/fa6';

export default function NavBar() {
  const dispatch = useAppDispatch();
  const songRef = useRef<HTMLAudioElement>(null);
  const { song, volume, isPlaying, moveTo, playlistLength } = useAppSelector(
    (state) => state.songSlice
  );
  const pathname = usePathname();

  /* was seperated to another useEffect to avoid error in console (song changes => code was trying to play old song instead of new => play new song) */
  useEffect(() => {
    if (!song) return;
    if (!songRef.current) return;

    if (isPlaying) {
      songRef.current.play();
    } else {
      songRef.current.pause();
    }
  }, [isPlaying, song]);

  /* was seperated to another useEffect to avoid volume-jump in the beggining of song (default volume value in <audio /> is 1) */
  useEffect(() => {
    if (!songRef.current) return;

    songRef.current.volume = volume;
  }, [song, volume]);

  /* when user clicks on input-range => gets number of click-position in seconds => set current time to click-position in seconds  */
  useEffect(() => {
    if (!songRef.current) return;

    if (moveTo) {
      dispatch(songSliceActions.moveTo(false));
      dispatch(songSliceActions.setCurrentTime(songRef.current.currentTime));
      songRef.current.currentTime = moveTo;
    }
  }, [dispatch, moveTo]);

  const handleSongEnded = () => {
    if (!playlistLength || !song) return;
    const nextSong = actions.getNextSong.bind(null, song.id, playlistLength);
    nextSong().then(
      (data) => data && dispatch(songSliceActions.currentPlayingSong(data))
    );
  };

  return (
    <div
      className={`menubar_wrapper fixed w-screen h-20 bg-neutral-900 bottom-0 text-white text-center z-10 grid transition-all place-items-center grid-cols-3`}
    >
      <section className="flex w-full h-full items-center justify-center gap-10 col-start-2 col-end-3">
        <Link
          className={`menubar-link ${
            pathname === paths.userHomePage() ? 'active_menubar-link' : ''
          }`}
          href={paths.loginPage()}
        >
          <FaHome />
        </Link>

        <Link
          className={`menubar-link ${
            pathname.includes(paths.userFriends()) ? 'active_menubar-link' : ''
          }`}
          href={paths.userFriends()}
        >
          <FaUserFriends />
        </Link>

        <Link
          className={`menubar-link ${
            pathname.includes(paths.userPosts({})) ? 'active_menubar-link' : ''
          }`}
          href={paths.userPosts({})}
        >
          {pathname.includes(paths.userPosts({})) ? (
            <IoIosMailOpen />
          ) : (
            <IoMdMail />
          )}
        </Link>

        <Link
          className={`menubar-link ${
            pathname.includes(paths.userSettings()) ? 'active_menubar-link' : ''
          }`}
          href={paths.userSettings()}
        >
          <IoMdSettings />
        </Link>

        <Link
          className={`menubar-link ${
            pathname.includes(paths.music()) ? 'active_menubar-link' : ''
          }`}
          href={paths.music()}
        >
          <IoIosMusicalNotes />
        </Link>

        <Link
          className={`menubar-link ${
            pathname.includes(paths.info()) ? 'active_menubar-link' : ''
          }`}
          href={paths.info()}
        >
          <FaCircleInfo />
        </Link>
      </section>

      {song && (
        <section
          className={`relative transition-all -bottom-[100%] ${
            song && 'bottom-0'
          }`}
        >
          <MusicNav />
          <audio
            onEnded={handleSongEnded}
            onTimeUpdate={(e) =>
              dispatch(
                songSliceActions.setCurrentTime(e.currentTarget.currentTime)
              )
            }
            onDurationChange={(e) =>
              dispatch(
                songSliceActions.setSongDuration(e.currentTarget.duration)
              )
            }
            ref={songRef}
            src={song.songUrl}
          />
        </section>
      )}
    </div>
  );
}
