'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

/* RTK */
import { useAppDispatch } from '@/hooks/redux-typed-hooks';

/* types */
import type { ModifiedUser, ModifiedPost } from '@/types';

/* components */
import UserAvatar from '../user/UserAvatar';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';

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
  const [showComments, setShowComments] = useState(false);
  const [leaveComment, setLeaveComment] = useState(false);

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

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleLeaveComment = () => {
    setLeaveComment(!leaveComment);
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
      <div className=" flex flex-col gap-7 items-center justify-center w-full ">
        <div className="flex gap-10">
          <span
            onClick={handleShowComments}
            className="text-sm w-max text-gray-500 cursor-pointer hover:underline underline-offset-4 hover:text-cyan-400 transition-all text-center"
          >
            {showComments ? 'Hide comments' : 'Show comments'}
          </span>

          <span
            onClick={handleLeaveComment}
            className="text-sm w-max text-gray-500 cursor-pointer hover:underline underline-offset-4 hover:text-cyan-400 transition-all text-center"
          >
            Leave a comment
          </span>
        </div>
        {leaveComment && <CommentForm postID={post.id} />}
        {showComments && <CommentList postID={post.id} />}
      </div>
    </div>
  );
}
