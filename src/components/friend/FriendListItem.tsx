'use client';

/* types */
import type { Session } from 'next-auth/types';

/* components */
import UserAvatar from '../user/UserAvatar';

import { toast } from 'react-toastify';
import * as actions from '@/actions';

type FriendListItemProps = {
  user: Session['user'];
  friendAlready?: boolean;
  acceptFriendRequest?: boolean;
  friendYouSentRequestTo?: boolean;
  isNewFriend?: boolean;
};

export default function FriendListItem({
  user,
  friendAlready,
  acceptFriendRequest,
  friendYouSentRequestTo,
  isNewFriend,
}: FriendListItemProps) {
  const handleSendRequest = () => {
    actions
      .sendRequest(user)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.message) {
          toast.warn(data.message);
        }
        if (data.success) {
          toast.success(data.success);
        }
      })
      .catch((e) => toast.error(e));
  };

  const handleAcceptRequest = () => {
    actions
      .acceptRequest(user)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
      })
      .catch((e) => toast.error(e));
  };

  const handleRemoveFriend = () => {
    actions
      .removeFriend(user)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
      })
      .catch((e) => toast.error(e));
  };

  const renderFriendStatus = () => {
    if (friendAlready) {
      return (
        <form
          action={handleRemoveFriend}
          className="relative w-auto h-auto flex justify-center items-center row-start-1 row-end-3 "
        >
          <button
            type="submit"
            className="hover:underline hover:underline-offset-4 cursor-pointer"
          >
            Remove
          </button>
        </form>
      );
    }
    if (acceptFriendRequest) {
      return (
        <form
          action={handleAcceptRequest}
          className="relative text-yellow-400 w-auto h-auto flex justify-center items-center row-start-1 row-end-3"
        >
          <button
            type="submit"
            className="cursor-pointer hover:underline hover:underline-offset-4"
          >
            Accept request
          </button>
        </form>
      );
    }
    if (friendYouSentRequestTo) {
      return (
        <div className="relative text-gray-400 flex w-auto h-auto justify-center items-center row-start-1 row-end-3">
          Request sent
        </div>
      );
    }
    if (isNewFriend) {
      return (
        <form
          action={handleSendRequest}
          className="relative flex w-auto h-auto justify-center items-center row-start-1 row-end-3 "
        >
          <button
            type="submit"
            className="cursor-pointer hover:underline hover:underline-offset-4"
          >
            Send request
          </button>
        </form>
      );
    }
  };

  return (
    <li className="grid relative grid-cols-[auto_1fr] grid-flow-col gap-x-5 border-cyan-400">
      <div className="row-start-1 row-end-3 w-[70px] h-[70px]">
        <UserAvatar
          imageClasses="rounded-[100%] border border-gray-500 border-2"
          avatarSRC={user.image}
        />
      </div>
      <div className=" font-medium text-lg self-end text-red-400">
        {user.name}
      </div>
      <div className="self-start italic font-light">@{user.username}</div>
      {renderFriendStatus()}
    </li>
  );
}
