'use server';

import { db } from '@/db';
import { paths } from '@/routes';
import { revalidatePath } from 'next/cache';

export async function deletePost(postID: string) {
  try {
    await db.post.delete({
      where: {
        id: postID,
      },
    });
  } catch (error: unknown) {}

  revalidatePath(paths.userPosts({ myPosts: true }));
}
