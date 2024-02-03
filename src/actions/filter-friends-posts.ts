'use server';

import { redirect } from 'next/navigation';
import { paths } from '@/routes';

export async function filterFriendsPosts(value: string) {
  if (!value || typeof value !== 'string') {
    redirect(paths.userPosts());
  }
  redirect(paths.userPosts(value.trim().toLowerCase()));
}
