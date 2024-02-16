'use client';

/* RTK */
import { useAppDispatch, useAppSelector } from '@/hooks/redux-typed-hooks';
import { postsSliceActions } from '@/store/slices/postsSlice';

/* hooks */
import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { useSession } from 'next-auth/react';

/* types */
import { ModifiedUser, ModifiedPost } from '@/types';

/* actions */
import * as actions from '@/actions';

/* components */
import Loader from '../common/Loader';
import PostItem from './PostItem';

type PostItemProps = {
  friendSearchParam?: string;
  postSearchParam?: string;
  myPostsSearchParam?: string;
  friends: ModifiedUser[];
};

export default function PostList({
  friends,
  postSearchParam,
  friendSearchParam,
  myPostsSearchParam,
}: PostItemProps) {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { postsArray, takeDefault, skipDefault, currentSkip, currentTake } =
    useAppSelector((state) => state.postsSlice);
  const [isPending, startTransition] = useTransition();

  const handlePostsFetch = useCallback(() => {
    console.log('not my posts');
    const filteredFriends = friends.filter((user) => {
      if (friendSearchParam) {
        return (
          user.name.toLocaleLowerCase().includes(friendSearchParam) ||
          user.username.toLocaleLowerCase().includes(friendSearchParam)
        );
      } else {
        return true;
      }
    });

    startTransition(() => {
      filteredFriends.forEach((user) => {
        actions
          .getFriendPosts(user.id, takeDefault, skipDefault)
          .then((posts) => {
            if (!posts) return;

            /* convert from Date (non-serialized value) to DateString */
            const modifiedPosts: ModifiedPost[] = posts.map((post) => {
              return {
                ...post,
                createdAt: post.createdAt.toLocaleDateString(),
                updatedAt: post.updatedAt.toLocaleDateString(),
              };
            });

            dispatch(postsSliceActions.updatePostsArray(modifiedPosts));
          });
      });
    });
  }, [dispatch, friendSearchParam, friends, skipDefault, takeDefault]);

  const showMyPosts = useCallback(() => {
    if (!session.data) return <div>User not logged in!</div>;
    startTransition(() => {
      dispatch(postsSliceActions.clearPostsArray());
      actions
        .getFriendPosts(session.data.user.id, takeDefault, skipDefault)
        .then((posts) => {
          if (!posts) return;

          /* convert from Date (non-serialized value) to DateString */
          const modifiedPosts: ModifiedPost[] = posts.map((post) => {
            return {
              ...post,
              createdAt: post.createdAt.toLocaleDateString(),
              updatedAt: post.updatedAt.toLocaleDateString(),
            };
          });

          dispatch(postsSliceActions.updatePostsArray(modifiedPosts));
        });
    });
  }, [dispatch, session.data, skipDefault, takeDefault]);

  /* fetch users' posts */
  useEffect(() => {
    if (postsArray.length !== 0) dispatch(postsSliceActions.clearPostsArray());

    myPostsSearchParam ? showMyPosts() : handlePostsFetch();
  }, [myPostsSearchParam]);

  const renderPosts = () => {
    /* make copy and sort array of posts */
    const sortedPostsArrayByDate = postsArray.slice().sort((a, b) => {
      const dateA = a.createdAt.split('.').reverse().join('');
      const dateB = b.createdAt.split('.').reverse().join('');
      return dateB.localeCompare(dateA);
    });
    return sortedPostsArrayByDate.map((post, index) => {
      const user = friends.find((item) => item.id === post.authorId);
      if (postSearchParam) {
        if (post.title.toLowerCase().includes(postSearchParam)) {
          return <PostItem user={user} post={post} key={index} />;
        }
      } else {
        return <PostItem user={user} post={post} key={index} />;
      }
    });
  };

  return (
    <>
      {isPending ? (
        <Loader
          wrapperClassName=" self-center w-full h-full"
          width="80%"
          color="var(--redLight)"
        />
      ) : (
        <div className=" overflow-y-auto pr-3">{renderPosts()}</div>
      )}
    </>
  );
}
