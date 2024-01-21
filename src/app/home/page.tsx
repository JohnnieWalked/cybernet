import { auth } from '@/auth';

/* components */
import UserAvatar from '@/components/user/UserAvatar';
import Title from '@/components/common/Title';
import Loader from '@/components/common/Loader';

export default async function HomePage() {
  const session = await auth();

  if (!session) return <Loader width="70%" color="var(--redLight)" />;

  return (
    <div className="flex justify-center items-center flex-col gap-20">
      <Title>Home</Title>

      <div className="grid grid-rows-[minmax(150px,_300px)_1fr] grid-cols-[1fr_minmax(150px,_1fr)] gap-x-10">
        <UserAvatar
          imageClasses="drop-shadow-avatar"
          avatarSRC={session.user.image}
        />

        <div className=" flex flex-col gap-3">
          <h2 className=" text-red-400 text-3xl font-medium border-b-2 pb-1 rounded border-cyan-400">
            {session.user.name}
          </h2>

          <h3 className=" text-lg text-gray-300">
            Username: <span className="italic">{session.user.username}</span>
            <br />
            Email:{' '}
            <span className="italic text-ellipsis break-words">
              {session.user.email}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
