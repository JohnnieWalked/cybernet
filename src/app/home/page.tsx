'use client';

/* rtk */
import { useAppSelector } from '@/hooks/redux-typed-hooks';

/* components */
import UserAvatar from '@/components/user/UserAvatar';
import Title from '@/components/common/Title';
import Loader from '@/components/common/Loader';

export default function HomePage() {
  const userData = useAppSelector((state) => state.userSlice.userData);

  return (
    <div className="flex justify-center items-center flex-col gap-20">
      <Title>Home</Title>

      {userData ? (
        <div className="grid grid-rows-[minmax(150px,_300px)_1fr] grid-cols-[1fr_minmax(150px,_1fr)] gap-x-10">
          <UserAvatar avatarSRC={userData.image} />

          <div className=" flex flex-col gap-3">
            <h2 className=" text-red-400 text-3xl font-medium border-b-2 pb-1 rounded border-cyan-400">
              {userData.name}
            </h2>

            <h3 className=" text-lg text-gray-300">
              Username: <span className="italic">{userData.username}</span>
              <br />
              Email:{' '}
              <span className="italic text-ellipsis break-words">
                {userData.email}
              </span>
            </h3>
          </div>
        </div>
      ) : (
        <Loader width="300px" color="rgb(248, 113, 113)" />
      )}
    </div>
  );
}
