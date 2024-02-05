'use client';

/* RTK */
import { useAppDispatch, useAppSelector } from '@/hooks/redux-typed-hooks';
import { postsSliceActions } from '@/store/slices/postsSlice';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';

/* types */
import { Session } from 'next-auth/types';
import type { Post } from '@prisma/client';

/* actions */
import * as actions from '@/actions';

/* components */
import Loader from '../common/Loader';
import PostItem from './PostItem';

type PostItemProps = {
  clearOldPosts?: boolean;
  friends: Session['user'][];
};

export default function PostList({
  friends,
  clearOldPosts = false,
}: PostItemProps) {
  const dispatch = useAppDispatch();
  const { postsArray, take, skip } = useAppSelector(
    (state) => state.postsSlice
  );
  const [isPending, startTransition] = useTransition();

  /* fetch users' posts */
  const fetchFriendsPosts = useCallback(
    (users: Session['user'][], take: number, skip: number) => {
      console.log('SERVER-ACTION-CALLBACK');

      startTransition(() => {
        users.forEach(async (user) => {
          const res = await actions.getFriendPosts(user.id, take, skip);
          dispatch(postsSliceActions.updatePostsArray(res));
          console.log(res);
        });
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (clearOldPosts) dispatch(postsSliceActions.clearPostsArray());

    fetchFriendsPosts(friends, take, skip);
  }, [clearOldPosts, dispatch, fetchFriendsPosts, friends, skip, take]);

  const renderPosts = useMemo(() => {
    return postsArray.map((post, index) => (
      <PostItem post={post} key={index} />
    ));
  }, [postsArray]);

  return (
    <>
      {isPending ? (
        <Loader
          wrapperClassName=" self-center w-full h-full"
          width="80%"
          color="var(--redLight)"
        />
      ) : (
        renderPosts
      )}
    </>
  );
}
