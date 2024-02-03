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

/* data */
import { getUserFriendsAndRelationsById } from '@/data/user';

/* helpers */
import { checkRelationShipStatus } from '@/helpers/checkRelationShipStatus';

interface PostsPageParams {
  searchParams: {
    friend: string;
    post: string;
  };
}

export default async function PostsPage({ searchParams }: PostsPageParams) {
  const session = await auth();
  const { friend, post } = searchParams;

  if (!session) return <Loader width="100%" color="var(--redLight)" />;

  const user = await getUserFriendsAndRelationsById(session.user.id);
  if (!user) return <div>Oops, nothing here...</div>;

  const { friends, friendsAddedMe } = user;
  const friendsStatus = checkRelationShipStatus(friends, friendsAddedMe);

  return (
    <section className="flex flex-col w-full h-full justify-center items-center gap-10">
      <Title>Posts</Title>
      <SearchInput
        name="postTitleSearch"
        label="Search post by title..."
        searchParamsKey="post"
      />

      <div className=" grid grid-cols-[minmax(200px,_300px),_1fr,_200px] grid-rows-[minmax(400px,_600px)] w-full h-full px-10">
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
        <div>
          <PostList friends={friendsStatus.friendsAlready} />
        </div>
        <PostForm />
      </div>
    </section>
  );
}
