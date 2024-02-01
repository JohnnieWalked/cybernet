'use client';

/* types */
import { Session } from 'next-auth/types';

/* components */
import PostItem from './PostItem';

type PostListProps = {
  friends: Session['user'][];
};

export default function PostList({ friends }: PostListProps) {
  return <div>PostList</div>;
}
