import { Session } from 'next-auth/types';

export function checkRelationShipStatus(
  friendsYouAdded: Session['user'][],
  friendsAddedYou: Session['user'][]
) {
  const friendsAlready = friendsYouAdded.filter((friend) =>
    friendsAddedYou.some((friendAddedYou) => friend.id === friendAddedYou.id)
  );

  const friendsAlreadySet = new Set(friendsAlready.map(({ id }) => id));

  const requestSendFriends = friendsYouAdded.filter(
    ({ id }) => !friendsAlreadySet.has(id)
  );

  const awaitingApprovalFriends = friendsAddedYou.filter(
    ({ id }) => !friendsAlreadySet.has(id)
  );

  friendsAlready.map((item) => console.log('FRIENDS ALREADY:', item.name));
  requestSendFriends.map((item) =>
    console.log('YOU SEND REQUEST TO:', item.name)
  );
  awaitingApprovalFriends.map((item) =>
    console.log('AWAITING APPROVAL FRIENDS:', item.name)
  );

  return {
    friendsAlready,
    requestSendFriends,
    awaitingApprovalFriends,
  };
}
