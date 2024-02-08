import { db } from '@/db';
import { cache } from 'react';

export const getUserFriendsAndRelationsById = cache(async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: id },
      select: {
        friends: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
        friendsAddedMe: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
});
