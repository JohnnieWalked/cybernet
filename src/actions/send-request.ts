'use server';

import type { Session } from 'next-auth/types';
import { getUserFriendsAndRelationsById } from '@/data/cached/get-friends-&-relations-by-id';
import { db } from '@/db';
import { auth } from '@/auth';

export async function sendRequest(user: Session['user']) {
  const session = await auth();
  if (!session) return { error: 'User not logged in!' };

  try {
    const userFriendsAndRelations = await getUserFriendsAndRelationsById(
      user.id
    );

    if (!userFriendsAndRelations)
      return { error: 'Seems like no friends were found...' };

    if (
      userFriendsAndRelations.friendsAddedMe.find(
        (item) => item.id === session.user.id
      )
    ) {
      return {
        message: 'Friend request was already sent earlier! Wait for approval!',
      };
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        friends: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        friends: true,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: 'Oops, something went wrong...',
      };
    }
  }

  return {
    success: 'Request sent successfuly!',
  };
}
