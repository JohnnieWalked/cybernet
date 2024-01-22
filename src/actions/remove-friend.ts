'use server';

import type { Session } from 'next-auth/types';
import { db } from '@/db';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { paths } from '@/routes';

export async function removeFriend(user: Session['user']) {
  const session = await auth();

  if (!session) return { error: 'User not logged in!' };

  try {
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        friends: {
          disconnect: {
            id: user.id,
          },
        },
      },
      include: {
        friends: true,
      },
    });

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        friends: {
          disconnect: {
            id: session.user.id,
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

  revalidatePath(paths.userFriends());

  return {
    success: 'Friend removed successfuly!',
  };
}
