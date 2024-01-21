'use server';

import type { Session } from 'next-auth/types';
import { db } from '@/db';
import { auth } from '@/auth';

export async function acceptRequest(user: Session['user']) {
  const session = await auth();

  if (!session) return { error: 'User not logged in!' };

  try {
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
    success: 'Friend added successfuly!',
  };
}
