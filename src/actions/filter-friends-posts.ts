'use server';

import { redirect } from 'next/navigation';
import { paths } from '@/routes';

export async function filterFriendsPosts(
  friend?: string | null,
  post?: string | null,
  myPosts: boolean = false
) {
  if (!friend && !post && !myPosts) {
    redirect(paths.userPosts());
  }
  redirect(
    paths.userPosts(friend?.trim().toLowerCase(), post?.toLowerCase(), myPosts)
  );
}
