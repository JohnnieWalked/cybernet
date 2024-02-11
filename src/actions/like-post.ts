'use server';

import { db } from '@/db';

export async function likePost(postID: string, sessionID: string) {
  try {
    const likedByUsersArray = await db.post.findFirst({
      where: {
        id: postID,
      },
      select: {
        likedBy: {
          select: {
            id: true,
          },
        },
      },
    });

    if (
      likedByUsersArray &&
      likedByUsersArray.likedBy.find((user) => user.id === sessionID)
    ) {
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
    } else {
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
    }
  } catch (error: unknown) {}
}
