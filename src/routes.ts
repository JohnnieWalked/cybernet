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
  userHomePage() {
    return `/home`;
  },

  userFriends(friend?: string) {
    if (friend) {
      return `/home/friends?term=${friend}`;
    }
    return `/home/friends`;
  },

  userPosts() {
    return `/home/posts`;
  },

  userSettings() {
    return `/home/settings`;
  },

  info() {
    return `/home/info`;
  },

  music(song?: string) {
    if (song) {
      return `/home/music?term=${song}`;
    }
    return `/home/music`;
  },
};
