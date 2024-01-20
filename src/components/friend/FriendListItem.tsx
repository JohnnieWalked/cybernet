import type { Session } from 'next-auth/types';
import UserAvatar from '../user/UserAvatar';
import { FiClock } from 'react-icons/fi';

type FriendListItemProps = {
  user: Session['user'];
  friendAlready?: boolean;
  acceptFriendRequest?: boolean;
  friendYouSentRequestTo?: boolean;
};

export default async function FriendListItem({
  user,
  friendAlready,
  acceptFriendRequest,
  friendYouSentRequestTo,
}: FriendListItemProps) {
  const renderFriendStatus = () => {
    if (friendAlready) {
      return;
    }
    if (acceptFriendRequest) {
      return (
        <div className="relative w-auto h-auto flex justify-center items-center row-start-1 row-end-3 hover:underline hover:underline-offset-4 cursor-pointer">
          Accept request
        </div>
      );
    }
    if (friendYouSentRequestTo) {
      return (
        <div className="relative flex w-auto h-auto justify-center items-center row-start-1 row-end-3 cursor-pointer hover:underline hover:underline-offset-4">
          Request sent
        </div>
      );
    }
  };

  return (
    <li className="grid relative grid-cols-[auto_1fr] grid-flow-col grid-rows-[30px_30px] pb-4 gap-x-5 border-b-2 rounded-xl border-cyan-400 last-of-type:p-0 last-of-type:border-b-0">
      <div className="row-start-1 row-end-3">
        <UserAvatar avatarSRC={user.image} />
      </div>
      <div className=" font-medium text-lg self-end text-red-400">
        {user.name}
      </div>
      <div className="self-start italic font-light">@{user.username}</div>
      {renderFriendStatus()}
    </li>
  );
}
