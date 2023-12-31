/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ['/', '/auth/new-verification'];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

export const paths = {
  loginPage() {
    return '/';
  },

  /**
   * The default redirect path after logging in.
   */
  userHomePage(usernameSlug: string) {
    return `/${usernameSlug}`;
  },
};
