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
    async signIn({ user }) {
      /* 
        if user doesn't confirm email -> do not allow user to enter. 
        This step is more important here, cause user can try to login from api 
      */
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;

      //add 2fa check ---

      return true;
    },
    async session({ token, session }) {
      /*       
        assign to session new data -> userid;
        By default, session consists of: {
          user: {name, email, image},
          "expires": "datetime"
        } 
      */
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      /* assign to session new data -> username */
      if (token.username && session.user) {
        session.user.username = token.username as string; // AUTH.JS BUG -> extending JWT interface doesn't work, so we set types as string
      }

      return session;
    },
    async jwt({ token }) {
      /* token.sub is a userid from DB */
      if (!token.sub) return token;

      /* get user from db using this sub */
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      /* assign to token-obj new data -> username */
      token.username = existingUser.username;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
