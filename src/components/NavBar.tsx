'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { paths } from '@/routes';
import { useRef, useEffect } from 'react';

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
  const { song, volume, isPlaying, currentTime, moveTo } = useAppSelector(
    (state) => state.songSlice
  );
  const pathname = usePathname();

  useEffect(() => {
    if (!song) return;
    if (!songRef.current) return;

    songRef.current.volume = volume;

    if (isPlaying) {
      songRef.current.play();
    } else {
      songRef.current.pause();
    }

    if (moveTo) {
      dispatch(songSliceActions.moveTo(false));
      songRef.current.currentTime = moveTo;
      dispatch(songSliceActions.setCurrentTime(songRef.current.currentTime));
    }
  }, [currentTime, dispatch, isPlaying, moveTo, song, volume]);

  return (
    <div
      className={`menubar_wrapper fixed w-screen h-20 bg-neutral-900 bottom-0 text-white text-center z-10 grid transition-all place-items-center grid-cols-3`}
    >
      <section className="flex w-full h-full items-center justify-center gap-10 col-start-2 col-end-3">
        <Link
          className={`menubar-link ${
            pathname === '/home' ? 'active_menubar-link' : ''
          }`}
          href={paths.loginPage()}
        >
          <FaHome />
        </Link>

        <Link
          className={`menubar-link ${
            pathname.includes('/friends') ? 'active_menubar-link' : ''
          }`}
          href={paths.userFriends()}
        >
          <FaUserFriends />
        </Link>

        <Link
          className={`menubar-link ${
            pathname.includes('/mail') ? 'active_menubar-link' : ''
          }`}
          href={paths.userMail()}
        >
          {pathname.includes('/mail') ? <IoIosMailOpen /> : <IoMdMail />}
        </Link>

        <Link
          className={`menubar-link ${
            pathname.includes('/settings') ? 'active_menubar-link' : ''
          }`}
          href={paths.userSettings()}
        >
          <IoMdSettings />
        </Link>

        <Link
          className={`menubar-link ${
            pathname.includes('/music') ? 'active_menubar-link' : ''
          }`}
          href={paths.music()}
        >
          <IoIosMusicalNotes />
        </Link>

        <Link
          className={`menubar-link ${
            pathname.includes('/info') ? 'active_menubar-link' : ''
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
