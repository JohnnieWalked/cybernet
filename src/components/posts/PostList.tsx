'use client';

/* RTK */
import { useAppDispatch, useAppSelector } from '@/hooks/redux-typed-hooks';
import { postsSliceActions } from '@/store/slices/postsSlice';

import { useEffect, useMemo, useTransition } from 'react';

/* types */
import { Session } from 'next-auth/types';

/* actions */
import * as actions from '@/actions';

/* components */
import Loader from '../common/Loader';
import PostItem from './PostItem';

type PostItemProps = {
  friendSearchParam?: string;
  friends: Session['user'][];
};

export default function PostList({ friends }: PostItemProps) {
  const dispatch = useAppDispatch();
  const { postsArray, takeDefault, skipDefault, currentSkip, currentTake } =
    useAppSelector((state) => state.postsSlice);
  const [isPending, startTransition] = useTransition();

  /* fetch users' posts */
  useEffect(() => {
    startTransition(() => {
      friends.forEach(async (user) => {
        const res = await actions.getFriendPosts(
          user.id,
          takeDefault,
          skipDefault
        );
        dispatch(postsSliceActions.updatePostsArray(res));
        console.log(res);
      });
    });
  }, [dispatch, friends, skipDefault, takeDefault]);

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
