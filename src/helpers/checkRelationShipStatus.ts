import { ModifiedUser } from '@/types';

export function checkRelationShipStatus(
  friendsYouAdded: ModifiedUser[],
  friendsAddedYou: ModifiedUser[]
) {
  const friendsAlready = friendsYouAdded.filter((friend) =>
    friendsAddedYou.some((friendAddedYou) => friend.id === friendAddedYou.id)
  );

  const friendsAlreadySet = new Set(friendsAlready.map(({ id }) => id));

  /* filter friends whom You sent request, but they haven't approve yet */
  const requestSendFriends = friendsYouAdded.filter(
    ({ id }) => !friendsAlreadySet.has(id)
  );

  /* filter friends who sent request to You */
  const awaitingApprovalFriends = friendsAddedYou.filter(
    ({ id }) => !friendsAlreadySet.has(id)
  );

  // friendsAlready.map((item) => console.log('FRIENDS ALREADY:', item.name));
  // requestSendFriends.map((item) =>
  //   console.log('YOU SEND REQUEST TO:', item.name)
  // );
  // awaitingApprovalFriends.map((item) =>
  //   console.log('AWAITING APPROVAL FRIENDS:', item.name)
  // );

  return {
    friendsAlready,
    requestSendFriends,
    awaitingApprovalFriends,
  };
}
