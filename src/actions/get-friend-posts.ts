'use server';

import { getFriendPostsByID } from '@/data/cached/get-friend-posts-by-id';

export async function getFriendPosts(id: string, take: number, skip: number) {
  const posts = await getFriendPostsByID(id, take, skip);

  return posts;
}
