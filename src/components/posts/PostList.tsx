'use client';

/* consts */
import {
  TAKE_DEFAULT_POSTS_AMOUNT,
  SKIP_DEFAULT_POSTS_AMOUNT,
} from '@/constants';

/* RTK */
import { useAppDispatch, useAppSelector } from '@/hooks/redux-typed-hooks';
import { postsSliceActions } from '@/store/slices/postsSlice';

/* hooks */
import { useCallback, useEffect, useTransition } from 'react';
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
  myPostsSearchParam?: boolean;
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
  const { postsArray } = useAppSelector((state) => state.postsSlice);
  const [isPending, startTransition] = useTransition();

  const fetchAndPassToRTKState = useCallback(
    (id: string, take: number, skip: number) => {
      startTransition(() => {
        console.log('FETCH');

        dispatch(postsSliceActions.clearPostsArray());

        actions.getFriendPosts(id, take, skip).then((posts) => {
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
    },
    [dispatch]
  );

  const handlePostsFetch = useCallback(
    (take: number, skip: number) => {
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
      dispatch(postsSliceActions.clearPostsArray());

      filteredFriends.forEach((user) => {
        fetchAndPassToRTKState(user.id, take, skip);
      });
    },
    [dispatch, fetchAndPassToRTKState, friendSearchParam, friends]
  );

  /* fetch users' posts */
  useEffect(() => {
    if (!session.data) return;
    myPostsSearchParam
      ? fetchAndPassToRTKState(
          session.data.user.id,
          TAKE_DEFAULT_POSTS_AMOUNT,
          SKIP_DEFAULT_POSTS_AMOUNT
        )
      : handlePostsFetch(TAKE_DEFAULT_POSTS_AMOUNT, SKIP_DEFAULT_POSTS_AMOUNT);
  }, [
    myPostsSearchParam,
    friendSearchParam,
    session.data,
    handlePostsFetch,
    fetchAndPassToRTKState,
  ]);

  const renderPosts = () => {
    /* make copy and sort array of posts */
    const sortedPostsArrayByDate = postsArray.slice().sort((a, b) => {
      const dateA = a.createdAt.split('.').reverse().join('');
      const dateB = b.createdAt.split('.').reverse().join('');
      return dateB.localeCompare(dateA);
    });
    return sortedPostsArrayByDate.map((post, index) => {
      let user: ModifiedUser | undefined;
      if (myPostsSearchParam) {
        user = {
          username: session.data!.user.username,
          id: session.data!.user.id,
          name: session.data!.user.name!,
          image: session.data!.user.image!,
        };
      } else {
        user = friends.find((item) => item.id === post.authorId);
      }
      if (postSearchParam) {
        if (post.title.toLowerCase().includes(postSearchParam)) {
          return (
            <PostItem
              showMyPosts={myPostsSearchParam}
              user={user}
              post={post}
              key={index}
            />
          );
        }
      } else {
        return (
          <PostItem
            showMyPosts={myPostsSearchParam}
            user={user}
            post={post}
            key={index}
          />
        );
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
