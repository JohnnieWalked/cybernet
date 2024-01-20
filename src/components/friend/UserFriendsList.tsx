import { auth } from '@/auth';
import {
  getUserFriendsAndRelationsById,
  getUserAndHisFriendsByUsername,
} from '@/data/user';

/* components */
import Loader from '../common/Loader';
import FriendListItem from './FriendListItem';

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

  const user = await getUserFriendsAndRelationsById(session.user.id);
  if (!user) return <div>Oops, nothing here...</div>;
  const { friends, friendsAddedMe } = user;

  /** Users, whom You sent request. */
  const sentRequestFriends = friends
    .filter((friend) => !friendsAddedMe.includes(friend))
    .map((user) => (
      <FriendListItem key={user.username} user={user} friendYouSentRequestTo />
    ));

  /** Users, that are already your friends. */
  const friendsAlready = friends
    .filter((friend) => friendsAddedMe.includes(friend))
    .map((user) => (
      <FriendListItem key={user.username} user={user} friendAlready />
    ));

  /** Users, that are awaiting your approval . */
  const pendingApprovalFriends = friendsAddedMe
    .filter((friendAddedMe) => !friends.includes(friendAddedMe))
    .map((user) => (
      <FriendListItem key={user.username} user={user} acceptFriendRequest />
    ));

  /* if search term in URL is empty => render all friends */
  if (!term) {
    return (
      <>
        {pendingApprovalFriends} {friendsAlready} {sentRequestFriends}
      </>
    );
  }

  // if (term) {
  //   if (term.startsWith('@')) {
  //     const findNewFriend = await getUserAndHisFriendsByUsername(
  //       term.substring(1)
  //     );

  //     if (!findNewFriend) return <div>Oops, nothing here...</div>;

  //     const renderFindNewFriend = (
  //       <FriendListItem key={findNewFriend.username} friend={findNewFriend} />
  //     );

  //     return <>{renderFindNewFriend}</>;
  //   } else {
  //     const renderedFriendsList = user.friends.map((friend) => {
  //       if (friend.username.includes(term)) {
  //         return <FriendListItem key={friend.username} friend={friend} />;
  //       }
  //     });

  //     return <>{renderedFriendsList}</>;
  //   }
  // }
}
