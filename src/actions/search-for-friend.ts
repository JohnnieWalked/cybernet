'use server';

import { redirect } from 'next/navigation';
import { paths } from '@/routes';

export async function searchForFriend(value: string) {
  if (!value || typeof value !== 'string') {
    redirect(paths.userFriends());
  }
  redirect(paths.userFriends(value.trim().toLowerCase()));
}
