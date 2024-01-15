'use client';

import { Session } from 'next-auth/types';
import { db } from '@/db';

type UserFriendListProps = {
  user: Session['user'];
};

export default function UserFriendList({ user }: UserFriendListProps) {
  /* find user and all his friends relations in DB */
  // const friends = db.user.findMany({
  //   where: { id: user.id },
  //   include: { friends: true, friendsAddedMe: true },
  // });

  // const renderedFriendsList = friends.map(({ friends }) => {
  //   return friends.map((item) => {
  //     return (
  //       <li className="grid grid-cols-2 gridare" key={item.username}>
  //         <div className="row-start-1 row-end-3">{item.image}</div>
  //         <div className="">{item.name}</div>
  //         <div className="">{item.username}</div>
  //       </li>
  //     );
  //   });
  // });

  return <>{/* {renderedFriendsList} */}</>;
}
