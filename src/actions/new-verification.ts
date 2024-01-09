'use server';

import { db } from '@/db';
import { getVerificationTokenByToken } from '@/data/verification-token';
import { getUserByEmail } from '@/data/user';

export async function verificationToken(token: string) {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return {
        error: 'Token does not exist!',
      };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return {
        error: 'Token has expired!',
      };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return {
        error: 'Email does not exist!',
      };
    }

    /* 
      update date in user DB from null to date of verification; 
      also update email (in case user will change email in future) 
    */
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'Something went wrong.',
      };
    } else {
      return {
        error: 'Something went wrong...',
      };
    }
  }

  return { success: true };
}
