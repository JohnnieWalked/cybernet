'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { paths } from '@/routes';

/* icons */
import { FaHome } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { IoIosMailOpen } from 'react-icons/io';
import { IoMdSettings } from 'react-icons/io';
import { FaCircleInfo } from 'react-icons/fa6';

export default function MenuBar() {
  const pathname = usePathname();

  return (
    <div className="menubar_wrapper fixed w-screen bg-neutral-950 bottom-0 text-white text-center z-10 grid place-items-center">
      <div className="flex items-center justify-center gap-10 w-max">
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
