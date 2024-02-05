import { db } from '@/db';
import { cache } from 'react';

export const getFriendPostsByID = cache(
  async (id: string, take: number, skip: number) => {
    const post = await db.post.findMany({
      take: take,
      skip: skip,
      where: { authorId: id },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(
      'getFriendPostsByID',
      post.map((item) => item.authorId)
    );
    return post;
  }
);
