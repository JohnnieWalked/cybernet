import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import { SignInSchema } from './schemas';
import { getUserByEmail, getUserByUsername } from '@/data/user';
import bcryptjs from 'bcryptjs';
import { User } from '@prisma/client';

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFieds = SignInSchema.safeParse(credentials);

        if (validatedFieds.success) {
          const { signin, password } = validatedFieds.data;

          let user: User | null;

          signin.includes('@')
            ? (user = await getUserByEmail(signin))
            : (user = await getUserByUsername(signin));
          if (!user || !user.password) return null;

          /**
           * Comparing a hash without knowing the actual password
           */
          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password
          );
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
