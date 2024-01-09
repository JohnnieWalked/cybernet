import { v4 as uuidv4 } from 'uuid';

import { db } from '@/db';
import { getVerificationTokenByEmail } from '../data/verification-token';

/**
 * Generate verification token. If token was already sent -> delete previous and send new one.
 * @param email[string]
 * @type {string}
 * @returns {verificationToken}
 */
export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //expire token in 1 hour

  /**
   * Check if we already sent token to email
   */
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
}
