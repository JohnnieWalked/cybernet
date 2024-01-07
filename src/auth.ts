import NextAuth, { DefaultSession } from 'next-auth';
import { getUserById } from '@/data/user';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './db';
import authConfig from './auth.config';

/* extending Session interface to avoid issue -> session.user.username */
declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
    } & DefaultSession['user'];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.username && session.user) {
        session.user.username = token.username as string; // AUTH.JS BUG -> extending JWT interface doesn't work, so we set types as string
      }

      console.log({ sessionToken: token });
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.username = existingUser.username;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
