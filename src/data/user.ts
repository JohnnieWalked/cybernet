import { db } from '@/db';

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserByUsername(username: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserFriendsById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: id },
      select: {
        friends: true,
        friendsAddedMe: {
          select: { id: true },
        },
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function getUseAndHisFriendsByUsername(username: string) {
  try {
    const user = await db.user.findUnique({
      where: { username: username },
      include: { friends: true, friendsAddedMe: true },
    });

    return user;
  } catch (error) {
    return null;
  }
}
