/* auth */
import { auth } from '@/auth';

/* components */
import UserFriendsList from '@/components/friend/UserFriendsList';
import Loader from '@/components/common/Loader';

/* data */
import { getUserFriendsAndRelationsById } from '@/data/user';

/* helpers */
import { checkRelationShipStatus } from '@/helpers/checkRelationShipStatus';

interface PostsPageParams {
  searchParams: {
    term: string;
  };
}

export default async function PostsPage({ searchParams }: PostsPageParams) {
  const session = await auth();
  const { term } = searchParams;

  if (!session) return <Loader width="100%" color="var(--redLight)" />;

  const user = await getUserFriendsAndRelationsById(session.user.id);
  if (!user) return <div>Oops, nothing here...</div>;

  const { friends, friendsAddedMe } = user;
  const friendsStatus = checkRelationShipStatus(friends, friendsAddedMe);

  return (
    <section className="flex">
      <div>
        <UserFriendsList friendsStatus={friendsStatus} showFriends />
      </div>
      <div></div>
    </section>
  );
}
