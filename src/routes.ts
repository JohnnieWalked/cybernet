import type { UserPostsURLPaths } from './types';

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
   *
   */
  userPosts(params: UserPostsURLPaths) {
    const { myPosts } = params;

    const paramsKeys = Object.keys(params);

    /* if no params */
    if (!myPosts && paramsKeys.length === 0) return `/home/posts`;

    if (myPosts) {
      return `/home/posts?myPosts=${myPosts}`;
    }

    if (paramsKeys.length === 1) {
      return `/home/posts?${Object.keys(params)[0]}=${
        Object.values(params)[0]
      }`;
    } else {
      const arrayKeyValue = Object.entries(params);

      return `/home/posts?${arrayKeyValue[0][0]}=${arrayKeyValue[0][1]}&${arrayKeyValue[1][0]}=${arrayKeyValue[1][1]}`;
    }
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
