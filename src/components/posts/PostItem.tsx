'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

/* RTK */
import { useAppDispatch } from '@/hooks/redux-typed-hooks';

/* types */
import type { ModifiedUser, ModifiedPost } from '@/types';

/* components */
import UserAvatar from '../user/UserAvatar';

/* actions */
import * as actions from '@/actions';

/* icons */
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoHeart } from 'react-icons/io5';
import { FiDelete } from 'react-icons/fi';
import { postsSliceActions } from '@/store/slices/postsSlice';

type PostItemProps = {
  post: ModifiedPost;
  user?: ModifiedUser;
  showMyPosts?: boolean;
};

export default function PostItem({ post, user, showMyPosts }: PostItemProps) {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [likeCounter, setLikeCounter] = useState(0);
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
  }, [post.id, session.data, spamCounter]);

  /* set like status */
  useEffect(() => {
    if (!session.data) return;

    if (post.likedBy.find((user) => user.id === session.data.user.id)) {
      setHeartStatus(true);
    } else {
      setHeartStatus(false);
    }

    setLikeCounter(post.likedBy.length);
  }, [post.likedBy, session.data]);

  const handleLike = () => {
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

  const handleDelete = () => {
    dispatch(postsSliceActions.deletePostFromArray(post.id));
    if (session.data) actions.deletePost(post.id);
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
        {showMyPosts && (
          <div className="flex items-center text-xl cursor-pointer transition-all hover:scale-110 hover:text-red-500">
            <FiDelete onClick={handleDelete} />
          </div>
        )}
      </div>
      <div className=" font-bold text-pretty">{post.title}</div>
      <div className=" text-medium text-pretty">{post.content}</div>
      <div className="flex justify-between items-center">
        <div className=" flex items-center gap-2 text-gray-500">
          {heartStatus ? (
            <IoHeart
              onClick={handleLike}
              className={`cursor-pointer transition-all fill-red-600 ${
                spamCounter > 3 ? 'opacity-30' : ''
              }`}
            />
          ) : (
            <IoIosHeartEmpty
              onClick={handleLike}
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
