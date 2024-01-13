'use client';

import { useSession } from 'next-auth/react';

import UserAvatar from '@/components/user/UserAvatar';

import { BarLoader } from 'react-spinners';
import Title from '@/components/common/Title';

export default function HomePage() {
  const session = useSession();

  return (
    <div className="flex justify-center items-center flex-col gap-20">
      <Title>Home</Title>
      <div className="grid grid-rows-[300px_1fr] grid-cols-[auto_minmax(500px,_1fr)] gap-x-10">
        {session.status === 'authenticated' ? (
          <UserAvatar avatarSRC={session.data.user.image} />
        ) : (
          <BarLoader width={'300px'} color="var(--cyan)" />
        )}

        <div className=" flex flex-col gap-3">
          {session.status === 'authenticated' ? (
            <>
              <h2 className=" text-red-400 text-3xl font-medium border-b-2 pb-1 rounded border-cyan-400">
                {session.data.user.name}
              </h2>
              <h3 className=" text-lg text-gray-300">
                Username:{' '}
                <span className="italic">{session.data.user.username}</span>
                <br />
                Email: <span className="italic">{session.data.user.email}</span>
              </h3>
              <h3 className=" text-lg text-gray-300"></h3>
            </>
          ) : (
            <BarLoader width={'auto'} color="var(--cyan)" />
          )}
        </div>
      </div>
    </div>
  );
}
