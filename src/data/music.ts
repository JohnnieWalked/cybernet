import { db } from '@/db';

export async function getAllMusic() {
  try {
    const playlist = await db.music.findMany();

    return playlist;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
}

export async function getNextSong(id: number) {
  try {
    const song = await db.music.findFirst({
      where: { id },
    });

    return song;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
}
