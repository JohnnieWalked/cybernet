/* consts */
import {
  SKIP_DEFAULT_POSTS_AMOUNT,
  TAKE_DEFAULT_POSTS_AMOUNT,
} from '@/constants';

import { Suspense } from 'react';

/* auth */
import { auth } from '@/auth';

/* components */
import UserFriendsList from '@/components/friend/UserFriendsList';
import Loader from '@/components/common/Loader';
import Title from '@/components/common/Title';
import SearchInput from '@/components/common/SearchInput';
import PostList from '@/components/posts/PostList';
import PostForm from '@/components/posts/PostForm';
import InputCheckbox from '@/components/common/InputCheckbox';

/* data */
import { getUserFriendsAndRelationsById } from '@/data/cached/get-friends-&-relations-by-id';
// import { getFriendPostsByID } from '@/data/cached/get-friend-posts-by-id';

/* helpers */
import { checkRelationShipStatus } from '@/helpers/checkRelationShipStatus';

/* types */
// import { ModifiedPost } from '@/types';

interface PostsPageParams {
  searchParams: {
    friend?: string;
    post?: string;
    myPosts?: string;
  };
}

export default async function PostsPage({ searchParams }: PostsPageParams) {
  const { friend, post, myPosts } = searchParams;
  const session = await auth();

  if (!session) return <Loader width="100%" color="var(--redLight)" />;

  const user = await getUserFriendsAndRelationsById(session.user.id);
  if (!user) return <div>Oops, nothing here...</div>;

  const { friends, friendsAddedMe } = user;
  const friendsStatus = checkRelationShipStatus(friends, friendsAddedMe);

  /* temp; SSR post list */
  // const friendsPostsArray = await Promise.all(
  //   friendsStatus.friendsAlready.map(async (user) => {
  //     let posts;
  //     if (
  //       friend &&
  //       (user.name.toLocaleLowerCase().includes(friend) ||
  //         user.username.toLocaleLowerCase().includes(friend))
  //     ) {
  //       posts = await getFriendPostsByID(
  //         user.id,
  //         TAKE_DEFAULT_POSTS_AMOUNT,
  //         SKIP_DEFAULT_POSTS_AMOUNT
  //       );
  //     } else {
  //       posts = await getFriendPostsByID(
  //         user.id,
  //         TAKE_DEFAULT_POSTS_AMOUNT,
  //         SKIP_DEFAULT_POSTS_AMOUNT
  //       );
  //     }

  //     if (!posts) return;

  //     /* convert from Date (non-serialized value) to DateString */
  //     const modifiedPosts: ModifiedPost[] = posts.map((post) => {
  //       return {
  //         ...post,
  //         createdAt: post.createdAt.toLocaleDateString(),
  //         updatedAt: post.updatedAt.toLocaleDateString(),
  //       };
  //     });

  //     return modifiedPosts;
  //   })
  // );

  return (
    <section className="flex flex-col w-full h-full justify-center items-center gap-10">
      <Title>Posts</Title>
      <SearchInput
        name="postTitleSearch"
        label="Search post by title..."
        searchParamsKey="post"
      />

      <div className="relative grid grid-cols-[minmax(200px,_300px),_1fr,_minmax(200px,_300px)] grid-rows-[minmax(400px,_600px)] w-full h-full px-10 gap-12">
        <div className="postsFriendList flex flex-col h-full w-full gap-3 text-cyan-400 rounded-[20px] bg-[rgba(0,_0,_0,_0.3)]">
          <span className=" text-[var(--yellow)] text-center text-xl z-10 font-bold tracking-wider">
            Friend List
          </span>
          <div className=" pt-3">
            <SearchInput
              name="friend"
              label="Search..."
              searchParamsKey="friend"
            />
          </div>
          <div className="flex flex-col gap-5 h-full w-full scroll-smooth overflow-auto">
            <Suspense fallback="Loading...">
              <UserFriendsList
                friendSearchParam={friend}
                friendsStatus={friendsStatus}
                showFriends
              />
            </Suspense>
          </div>
        </div>
        <div className="postList_wrapper flex flex-col w-full h-full text-white rounded-[20px] bg-[rgba(0,_0,_0,_0.3)]">
          <Suspense fallback="Loading...">
            <PostList
              sessionID={session.user.id}
              friends={friendsStatus.friendsAlready}
              postSearchParam={post}
              friendSearchParam={friend}
              myPostsSearchParam={!!myPosts}
              // posts={friendsPostsArray}
            />
          </Suspense>
        </div>
        <div className="post_wrapper flex flex-col justify-center gap-5 rounded-[20px] bg-[rgba(0,_0,_0,_0.3)]">
          <PostForm />
          <InputCheckbox
            searchParamsKey="myPosts"
            name="myPosts"
            label="Show my posts only"
          />
        </div>
      </div>
    </section>
  );
}
