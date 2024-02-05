import { db } from '@/db';
import { cache } from 'react';

export const getMyPosts = cache(async (id: string) => {
  const user = await db.post.findMany({
    where: { authorId: id },
  });
  console.log('get my posts...');
  return user;
});
