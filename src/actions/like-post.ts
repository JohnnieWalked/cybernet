'use server';

import { db } from '@/db';

export async function likePost(postID: string, sessionID: string) {
  try {
    await db.post.update({
      where: {
        id: postID,
      },
      data: {
        likedBy: {
          disconnect: {
            id: sessionID,
          },
        },
      },
      include: {
        likedBy: true,
      },
    });

    await db.post.update({
      where: {
        id: postID,
      },
      data: {
        likedBy: {
          connect: {
            id: sessionID,
          },
        },
      },
      include: {
        likedBy: true,
      },
    });
  } catch (error: unknown) {}
}
