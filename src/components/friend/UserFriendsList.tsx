import { auth } from '@/auth';
import { getUserFriendsAndRelationsById, getUserByUsername } from '@/data/user';
import { checkRelationShipStatus } from '@/helpers/checkRelationShipStatus';

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
  const friendsStatus = checkRelationShipStatus(friends, friendsAddedMe);

  /** Users, that are already your friends. */
  const friendsAlready = friendsStatus.friendsAlready.map((user) => (
    <FriendListItem key={user.username} user={user} friendAlready />
  ));

  /** Users, whom You sent request. */
  const friendsYouSentRequestTo = friendsStatus.requestSendFriends.map(
    (user) => (
      <FriendListItem key={user.username} user={user} friendYouSentRequestTo />
    )
  );

  /** Users, that are awaiting your approval. */
  const friendsAwaitingApproval = friendsStatus.awaitingApprovalFriends.map(
    (user) => (
      <FriendListItem key={user.username} user={user} acceptFriendRequest />
    )
  );

  /* if search term in URL is empty => render all friends */
  if (!term) {
    return (
      <>
        {friendsAwaitingApproval}
        {friendsAlready}
        {friendsYouSentRequestTo}
      </>
    );
  }

  if (term) {
    if (term.startsWith('@')) {
      if (term.substring(1).toLowerCase() === session.user.username)
        return <div>Oops, nothing here...</div>;

      const findNewFriend = await getUserByUsername(term.substring(1));

      if (!findNewFriend) return <div>Oops, nothing here...</div>;

      const renderFindNewFriend = (
        <FriendListItem
          key={findNewFriend.username}
          user={findNewFriend}
          isNewFriend
        />
      );

      return <>{renderFindNewFriend}</>;
    } else {
      const awaitingApprovalFriends = friendsStatus.awaitingApprovalFriends.map(
        (friend, index) => {
          if (
            friend.name!.toLowerCase().includes(term) ||
            friend.username.toLowerCase().includes(term)
          ) {
            return (
              <FriendListItem key={index} user={friend} acceptFriendRequest />
            );
          }
        }
      );

      const friends = friendsStatus.friendsAlready.map((friend, index) => {
        if (
          friend.name!.toLowerCase().includes(term) ||
          friend.username.toLowerCase().includes(term)
        ) {
          return <FriendListItem key={index} user={friend} friendAlready />;
        }
      });

      const sendRequestTo = friendsStatus.requestSendFriends.map(
        (friend, index) => {
          if (
            friend.name!.toLowerCase().includes(term) ||
            friend.username.toLowerCase().includes(term)
          ) {
            return (
              <FriendListItem
                key={index}
                user={friend}
                friendYouSentRequestTo
              />
            );
          }
        }
      );

      return (
        <>
          {awaitingApprovalFriends}
          {friends}
          {sendRequestTo}
        </>
      );
    }
  }
}
