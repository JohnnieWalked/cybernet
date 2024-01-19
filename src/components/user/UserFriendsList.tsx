import { auth } from '@/auth';
import { getUserFriendsById, getUseAndHisFriendsByUsername } from '@/data/user';

/* components */
import Loader from '../common/Loader';
import FriendListItem from '../friend/FriendListItem';

interface FriendsSearchParams {
  searchParams: {
    term: string;
  };
}

export default async function UserFriendsList({
  searchParams,
}: FriendsSearchParams) {
  const session = await auth();
  const { term } = searchParams;

  if (!session) return <Loader width="100%" color="var(--redLight)" />;

  const user = await getUserFriendsById(session.user.id);
  if (!user) return <div>Oops, nothing here...</div>;

  if (!term) {
    const renderedFriendsList = user.friends.map((friend) => {
      return (
        <FriendListItem
          friendsAddedMe={user.friendsAddedMe}
          key={friend.username}
          friend={friend}
        />
      );
    });

    return <>{renderedFriendsList}</>;
  }

  if (term) {
    if (term.startsWith('@')) {
      const findNewFriend = await getUseAndHisFriendsByUsername(
        term.substring(1)
      );

      if (!findNewFriend) return <div>Oops, nothing here...</div>;

      const renderFindNewFriend = (
        <FriendListItem key={findNewFriend.username} friend={findNewFriend} />
      );

      return <>{renderFindNewFriend}</>;
    } else {
      const renderedFriendsList = user.friends.map((friend) => {
        if (friend.username.includes(term)) {
          return <FriendListItem key={friend.username} friend={friend} />;
        }
      });

      return <>{renderedFriendsList}</>;
    }
  }
}
