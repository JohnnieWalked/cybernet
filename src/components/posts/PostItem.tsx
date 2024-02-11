'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

/* types */
import type { ModifiedUser, ModifiedPost } from '@/types';

/* components */
import UserAvatar from '../user/UserAvatar';

/* actions */
import * as actions from '@/actions';

/* icons */
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoHeart } from 'react-icons/io5';

type PostItemProps = {
  post: ModifiedPost;
  user?: ModifiedUser;
};

export default function PostItem({ post, user }: PostItemProps) {
  const session = useSession();
  const [likeCounter, setLikeCounter] = useState(post.likedBy.length);
  const [heartStatus, setHeartStatus] = useState<boolean | undefined>();
  const [spamCounter, setSpamCounter] = useState(0);

  /* debounce like */
  useEffect(() => {
    if (!spamCounter || !session.data) return;

    const sendLikeRequestTimeout = setTimeout(() => {
      actions.likePost(post.id, session.data.user.id);
      setSpamCounter(0);
    }, 5000);

    return () => clearTimeout(sendLikeRequestTimeout);
  }, [spamCounter]);

  /* set like status */
  useEffect(() => {
    if (!session.data) return;

    if (post.likedBy.find((user) => user.id === session.data.user.id)) {
      setHeartStatus(true);
    } else {
      setHeartStatus(false);
    }
  }, [post.likedBy, session.data]);

  const handleClick = () => {
    if (spamCounter > 3) return;
    setSpamCounter(spamCounter + 1);

    if (heartStatus) {
      setHeartStatus(false);
      setLikeCounter(likeCounter - 1);
    } else {
      setLikeCounter(likeCounter + 1);
      setHeartStatus(true);
    }
  };

  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex gap-3">
        <div className="relative w-12 h-12 ">
          <UserAvatar
            imageClasses=" rounded-full border border-cyan-800 border-2"
            avatarSRC={user?.image}
          />
        </div>
        <div className="flex items-center text-yellow-400 font-light">
          {user?.name}
        </div>
      </div>
      <div className=" font-bold text-pretty">{post.title}</div>
      <div className=" text-medium text-pretty">{post.content}</div>
      <div className="flex justify-between items-center">
        <div className=" flex items-center gap-2 text-gray-500">
          {heartStatus ? (
            <IoHeart
              onClick={handleClick}
              className={`cursor-pointer transition-all fill-red-600 ${
                spamCounter > 3 ? 'opacity-30' : ''
              }`}
            />
          ) : (
            <IoIosHeartEmpty
              onClick={handleClick}
              className={`cursor-pointer transition-all ${
                spamCounter > 3 ? 'opacity-30' : ''
              }`}
            />
          )}

          <span className="font-bold text-xs">{likeCounter} likes</span>
        </div>
        <div className=" font-bold text-xs text-gray-500">{post.createdAt}</div>
      </div>
    </div>
  );
}
