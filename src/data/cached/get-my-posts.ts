import { db } from '@/db';
import { cache } from 'react';

export const getMyPosts = cache(async (id: string) => {
  try {
    const user = await db.post.findMany({
      where: { authorId: id },
    });
    return user;
  } catch (error) {
    return null;
  }
});
