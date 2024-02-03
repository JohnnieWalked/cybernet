import { getUserByUsername } from '@/data/user';
import FriendListItem from './FriendListItem';

type NewFriendProps = {
  sessionUsername?: string;
  friendSearchParam: string;
};

export default async function NewFriend({
  sessionUsername,
  friendSearchParam,
}: NewFriendProps) {
  if (friendSearchParam.substring(1).toLowerCase() === sessionUsername)
    return <div>Oops, nothing here...</div>;

  const findNewFriend = await getUserByUsername(friendSearchParam.substring(1));

  if (!findNewFriend) return <div>Oops, nothing here...</div>;

  const renderFindNewFriend = (
    <FriendListItem
      key={findNewFriend.username}
      user={findNewFriend}
      isNewFriend
    />
  );

  return <>{renderFindNewFriend}</>;
}
