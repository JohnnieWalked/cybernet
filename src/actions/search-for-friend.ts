'use server';

import { redirect } from 'next/navigation';
import { paths } from '@/routes';

export async function searchForFriend(value: string) {
  if (!value || typeof value !== 'string') {
    console.log(value);
    redirect(paths.userFriends());
  }
  redirect(paths.userFriends(value));
}
