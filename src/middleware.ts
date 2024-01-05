import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { paths, publicRoutes, apiAuthPrefix } from './routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoutes) {
    return null;
  }

  if (isPublicRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(paths.userHomePage(), nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL(paths.loginPage(), nextUrl));
  }

  console.log('LOGIN STATUS:', isLoggedIn);
  console.log('ROUTE:', nextUrl.pathname);

  return null;
});

/**
 * Matcher from clerk
 * */
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
