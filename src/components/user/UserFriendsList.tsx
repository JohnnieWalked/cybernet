import { auth } from '@/auth';
import { getUserFriends } from '@/data/user';

/* components */
import Loader from '../common/Loader';

export default async function UserFriendsList() {
  const session = await auth();

  if (!session) return <Loader width="100%" color="var(--redLight)" />;

  const user = await getUserFriends(session.user.id);

  if (!user) return <div>Seems like Your friend list is empty for now...</div>;

  const renderedFriendsList = user.friends.map((friend) => {
    return (
      <li className="grid grid-cols-2 gridare" key={friend.username}>
        <div className="row-start-1 row-end-3">{friend.image}</div>
        <div className="">{friend.name}</div>
        <div className="">{friend.username}</div>
      </li>
    );
  });

  return <>{renderedFriendsList}</>;
}
