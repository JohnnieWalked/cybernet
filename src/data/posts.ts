import { db } from '@/db';

export async function getFriendsPostsByID(id: string, skip: number) {
  try {
    const post = db.post.findMany({
      take: 3,
      skip: skip,
      where: { authorId: id },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return post;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
}
