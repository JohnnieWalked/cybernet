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

// export async function getUserAndHisFriendsByUsername(username: string) {
//   try {
//     const user = await db.user.findUnique({
//       where: { username: username },
//       select: {
//         id: true,
//         username: true,
//         name: true,
//         image: true,
//         friends: {
//           select: {
//             id: true,
//             username: true,
//             name: true,
//             image: true,
//           },
//         },
//         friendsAddedMe: {
//           select: {
//             id: true,
//             username: true,
//             name: true,
//             image: true,
//           },
//         },
//       },
//     });

//     return user;
//   } catch (error) {
//     return null;
//   }
// }
