'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

/* types */
import type { ModifiedUser, ModifiedPost } from '@/types';

/* components */
import UserAvatar from '../user/UserAvatar';

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
  const [heartStatus, setHeartStatus] = useState(false);

  const handleLikeClick = async () => {
    if (!session.data?.user) return;
    if (post.likedBy.find((likedBy) => likedBy.id === session.data.user.id)) {
      setHeartStatus(false);
    } else {
      if (!heartStatus) setLikeCounter(likeCounter + 1);
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
              onClick={handleLikeClick}
              className="cursor-pointer transition-all fill-red-600"
            />
          ) : (
            <IoIosHeartEmpty
              onClick={handleLikeClick}
              className="cursor-pointer transition-all"
            />
          )}

          <span className="font-bold text-xs">{likeCounter} likes</span>
        </div>
        <div className=" font-bold text-xs text-gray-500">{post.createdAt}</div>
      </div>
    </div>
  );
}
