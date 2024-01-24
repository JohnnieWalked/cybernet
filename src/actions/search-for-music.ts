'use server';

import { redirect } from 'next/navigation';
import { paths } from '@/routes';

export async function searchForMusic(value: string) {
  if (!value || typeof value !== 'string') {
    redirect(paths.music());
  }
  redirect(paths.music(value.trim().toLowerCase()));
}
