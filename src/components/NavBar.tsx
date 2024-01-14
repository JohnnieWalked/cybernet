'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { paths } from '@/routes';

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
  const pathname = usePathname();

  return (
    <div className="menubar_wrapper fixed w-screen h-20 bg-neutral-900 bottom-0 text-white text-center z-10 grid place-items-center">
      <div className="flex w-full h-full items-center justify-center gap-10">
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
      </div>
    </div>
  );
}
