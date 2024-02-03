import type { Session } from 'next-auth/types';

/* components */
import FriendListItem from './FriendListItem';

interface FriendsSearchProps {
  friendsStatus: {
    friendsAlready: Session['user'][];
    requestSendFriends: Session['user'][];
    awaitingApprovalFriends: Session['user'][];
  };
  friendSearchParam?: string;
  sessionUserName?: string;
  showFriends?: boolean;
  showFriendsYouSendRequestTo?: boolean;
  showFriendsAwaitingApproval?: boolean;
}

export default async function UserFriendsList({
  friendsStatus,
  friendSearchParam,
  showFriends,
  showFriendsAwaitingApproval,
  showFriendsYouSendRequestTo,
}: FriendsSearchProps) {
  /** Users, that are awaiting your approval. */
  if (showFriendsAwaitingApproval) {
    const friendsAwaitingApproval = friendsStatus.awaitingApprovalFriends.map(
      (user) => (
        <FriendListItem key={user.username} user={user} acceptFriendRequest />
      )
    );

    return <>{friendsAwaitingApproval}</>;
  }

  /** Users, that are already your friends.
   *  If searchParam exists => filter users, that are already your friends, and return filtered users.
   */
  if (showFriends) {
    if (friendSearchParam) {
      const filteredFriendsAlready = friendsStatus.friendsAlready.filter(
        (user) =>
          user.name!.toLowerCase().includes(friendSearchParam) ||
          user.username.toLowerCase().includes(friendSearchParam)
      );
      return filteredFriendsAlready.map((user) => (
        <FriendListItem key={user.username} user={user} friendAlready />
      ));
    }
    const friendsAlready = friendsStatus.friendsAlready.map((user) => (
      <FriendListItem key={user.username} user={user} friendAlready />
    ));

    return <>{friendsAlready}</>;
  }

  /** Users, whom You sent request. */
  if (showFriendsYouSendRequestTo) {
    const friendsYouSentRequestTo = friendsStatus.requestSendFriends.map(
      (user) => (
        <FriendListItem
          key={user.username}
          user={user}
          friendYouSentRequestTo
        />
      )
    );

    return <>{friendsYouSentRequestTo}</>;
  }

  if (friendSearchParam) {
    /** Show filtered friends. */
    const awaitingApprovalFriends = friendsStatus.awaitingApprovalFriends.map(
      (friend, index) => {
        if (
          friend.name!.toLowerCase().includes(friendSearchParam) ||
          friend.username.toLowerCase().includes(friendSearchParam)
        ) {
          return (
            <FriendListItem key={index} user={friend} acceptFriendRequest />
          );
        }
      }
    );

    const friends = friendsStatus.friendsAlready.map((friend, index) => {
      if (
        friend.name!.toLowerCase().includes(friendSearchParam) ||
        friend.username.toLowerCase().includes(friendSearchParam)
      ) {
        return <FriendListItem key={index} user={friend} friendAlready />;
      }
    });

    const sendRequestTo = friendsStatus.requestSendFriends.map(
      (friend, index) => {
        if (
          friend.name!.toLowerCase().includes(friendSearchParam) ||
          friend.username.toLowerCase().includes(friendSearchParam)
        ) {
          return (
            <FriendListItem key={index} user={friend} friendYouSentRequestTo />
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
