import type { User } from 'next-auth';
import type { Session } from 'next-auth/types';

/* data */
import { getUserByUsername } from '@/data/user';

/* components */
import FriendListItem from './FriendListItem';

interface FriendsSearchProps {
  friendsStatus: {
    friendsAlready: Session['user'][];
    requestSendFriends: Session['user'][];
    awaitingApprovalFriends: Session['user'][];
  };
  term?: string;
  sessionUserName?: string;
  showFriends?: boolean;
  showFriendsYouSendRequestTo?: boolean;
  showFriendsAwaitingApproval?: boolean;
}

export default async function UserFriendsList({
  friendsStatus,
  term,
  sessionUserName,
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

  /** Users, that are already your friends. */
  if (showFriends) {
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

  /** Show new user. */
  if (term) {
    if (term.startsWith('@')) {
      if (term.substring(1).toLowerCase() === sessionUserName)
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
    /** Show filtered friends. */
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
