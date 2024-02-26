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
  sessionID: string;
  friendSearchParam?: string;
  postSearchParam?: string;
  myPostsSearchParam?: boolean;
  friends: ModifiedUser[];
  // posts: (ModifiedPost[] | undefined)[]; /* temporary */
};

export default function PostList({
  sessionID,
  friends,
  postSearchParam,
  friendSearchParam,
  myPostsSearchParam,
}: PostItemProps) {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { postsArray } = useAppSelector((state) => state.postsSlice);
  const [isPending, startTransition] = useTransition();

  const fetchPostsByUserID = useCallback(
    (userID: string) => {
      startTransition(() => {
        actions
          .getFriendPosts(
            userID,
            TAKE_DEFAULT_POSTS_AMOUNT,
            SKIP_DEFAULT_POSTS_AMOUNT
          )
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
    },
    [dispatch]
  );

  /* fetch users' posts */
  useEffect(() => {
    dispatch(postsSliceActions.clearPostsArray());
    startTransition(() => {
      console.log('EFFECT');
      if (myPostsSearchParam) {
        fetchPostsByUserID(sessionID);
      } else {
        if (friendSearchParam) {
          friends.forEach((user) => {
            if (
              user.name.toLocaleLowerCase().includes(friendSearchParam) ||
              user.username.toLocaleLowerCase().includes(friendSearchParam)
            ) {
              fetchPostsByUserID(user.id);
            }
          });
        } else {
          friends.forEach((user) => fetchPostsByUserID(user.id));
          /* temp; rendering post list SSR */
          // posts.forEach((posts) => {
          //   if (!posts) return;
          //   dispatch(postsSliceActions.updatePostsArray(posts));
          // });
        }
      }
    });
  }, [myPostsSearchParam, friendSearchParam, fetchPostsByUserID, dispatch]);

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
        if (post.title.toLocaleLowerCase().includes(postSearchParam)) {
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
