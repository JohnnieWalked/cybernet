'use server';

import { db } from '@/db';

export async function getComments(postID: string) {
  try {
    const comments = await db.comment.findMany({
      where: {
        postId: postID,
      },
    });

    const modifiedComments = comments.map((comment) => {
      return {
        ...comment,
        updatedAt: comment.updatedAt.toLocaleDateString(),
        createdAt: comment.createdAt.toLocaleDateString(),
      };
    });

    return modifiedComments;
  } catch {
    return null;
  }
}
