import type { Session } from 'next-auth/types';
import UserAvatar from '../user/UserAvatar';
import { FiClock } from 'react-icons/fi';

type FriendListItemProps = {
  friend: Session['user'];
  friendsAddedMe?: {
    id: string;
  }[];
};

export default async function FriendListItem({
  friend,
  friendsAddedMe,
}: FriendListItemProps) {
  const isFriendAddedMe = () => {
    if (!friendsAddedMe) return;
    if (
      !friendsAddedMe.find((item) => {
        return item.id === friend.id;
      })
    ) {
      return (
        <div className="relative flex justify-center items-center row-start-1 row-end-3 gap-3 underline underline-offset-4 cursor-pointer ">
          Request sent <FiClock />
        </div>
      );
    }
  };

  return (
    <li className="grid relative grid-cols-[auto_1fr] grid-flow-col grid-rows-[30px_30px] pb-4 gap-x-5 border-b-2 rounded-xl border-cyan-400 last-of-type:p-0 last-of-type:border-b-0">
      <div className="row-start-1 row-end-3">
        <UserAvatar avatarSRC={friend.image} />
      </div>
      <div className=" font-medium text-lg self-end text-red-400">
        {friend.name}
      </div>
      <div className="self-start italic font-light">@{friend.username}</div>
      {isFriendAddedMe()}
    </li>
  );
}
