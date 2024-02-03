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
      return `/home/friends?friend=${friend}`;
    }
    return `/home/friends`;
  },

  /**
   * First argument is responsible for filter friend list on Posts Page.
   * Second argument is responsible for filter posts by title on Posts Page.
   */
  userPosts(friend?: string, postTitle?: string) {
    if (friend && postTitle) {
      return `/home/posts?friend=${friend}&post=${postTitle}`;
    }
    if (friend) {
      return `/home/posts?friend=${friend}`;
    }
    if (postTitle) {
      return `/home/posts?post=${postTitle}`;
    }
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
      return `/home/music?song=${song}`;
    }
    return `/home/music`;
  },
};
