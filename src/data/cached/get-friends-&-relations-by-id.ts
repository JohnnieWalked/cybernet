import { db } from '@/db';
import { cache } from 'react';

export const getUserFriendsAndRelationsById = cache(async (id: string) => {
  const user = await db.user.findUnique({
    where: { id: id },
    select: {
      friends: true,
      friendsAddedMe: true,
    },
  });
  console.log('\n getUserFriendsAndRelationsById \n');
  return user;
});
