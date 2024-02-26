import type { User, Post, Comment } from '@prisma/client';

export type ModifiedUser = Omit<User, 'emailVerified' | 'password' | 'email'>;
export type ModifiedPost = Omit<Post, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
} & {
  likedBy: {
    id: string;
  }[];
};
export type UserPostsURLPaths = {
  myPosts?: boolean;
  [paramKey: string]:
    | {
        [key: string]: string;
      }
    | string
    | boolean
    | undefined;
};
export type ModifiedComment = Omit<Comment, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
