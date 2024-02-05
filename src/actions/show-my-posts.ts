'use server';

import { redirect } from 'next/navigation';
import { paths } from '@/routes';

export async function showMyPosts(value: boolean) {
  if (typeof value !== 'boolean') {
    redirect(paths.userPosts());
  }
  redirect(paths.userPosts(undefined, undefined, value));
}
