'use client';

import { useSession } from 'next-auth/react';

/* rtk */
import { useAppDispatch } from '@/hooks/redux-typed-hooks';
import { userSliceActions } from '@/store/slices/userSlice';

/* components */
import NavBar from '@/components/NavBar';
import { useEffect } from 'react';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const session = useSession();

  /* upload user data into RTK store after logging in */
  useEffect(() => {
    if (session.status === 'authenticated')
      dispatch(userSliceActions.uploadSession(session.data.user));
  }, [session, dispatch]);

  return (
    <div className="before:absolute before:inset-0 before:bg-slate-800 before:w-screen before:h-screen before:-z-10">
      {children}
      <NavBar />
    </div>
  );
}
