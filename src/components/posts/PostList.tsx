'use client';

/* RTK */
import { useAppDispatch, useAppSelector } from '@/hooks/redux-typed-hooks';
import { postsSliceActions } from '@/store/slices/postsSlice';
import { friendsSliceActions } from '@/store/slices/friendsSlice';

import { useEffect, useMemo, useTransition } from 'react';

/* types */
import { ModifiedUser } from '@/types';

/* actions */
import * as actions from '@/actions';

/* components */
import Loader from '../common/Loader';
import PostItem from './PostItem';
import { areObjectsEqual } from '@/helpers/equalObjects';

type PostItemProps = {
  friendSearchParam?: string;
  friends: ModifiedUser[];
};

export default function PostList({ friends }: PostItemProps) {
  const dispatch = useAppDispatch();
  const { postsArray, takeDefault, skipDefault, currentSkip, currentTake } =
    useAppSelector((state) => state.postsSlice);
  const { friendsArray } = useAppSelector((state) => state.friendsSlice);
  const [isPending, startTransition] = useTransition();

  /* fetch users' posts */
  useEffect(() => {
    /* if user will search for a specific friend in friend list => it will fetch new request to get posts of filtered friend list */
    if (
      friends.length === friendsArray.length &&
      friends.every((user, index) => areObjectsEqual(user, friendsArray[index]))
    ) {
      console.log('IDENTICAL');
      return;
    } else {
      console.log('FETCH');
      if (friendsArray.length !== 0)
        dispatch(postsSliceActions.clearPostsArray());
      dispatch(friendsSliceActions.setFriendsArray(friends));
      startTransition(() => {
        friends.forEach((user) => {
          actions
            .getFriendPosts(user.id, takeDefault, skipDefault)
            .then((posts) => {
              if (!posts) return;

              dispatch(postsSliceActions.updatePostsArray(posts));
            });
        });
      });
    }
  }, [dispatch, friends, friendsArray, skipDefault, takeDefault]);

  const renderPosts = useMemo(() => {
    const sortedPostsArrayByDate = postsArray.slice().sort((a, b) => {
      if (typeof a.createdAt === 'string' && typeof b.createdAt === 'string') {
        const dateA = a.createdAt.split('.').reverse().join('');
        const dateB = b.createdAt.split('.').reverse().join('');
        return dateB.localeCompare(dateA);
      } else {
        return 0;
      }
    });
    return sortedPostsArrayByDate.map((post, index) => (
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
