import { db } from '@/db';
import { cache } from 'react';

export const getFriendPostsByID = cache(
  async (id: string, take: number, skip: number) => {
    try {
      const posts = await db.post.findMany({
        take: take,
        skip: skip,
        where: { authorId: id },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          likedBy: {
            select: {
              id: true,
            },
          },
        },
      });

      return posts;
    } catch (error) {
      return null;
    }
  }
);
