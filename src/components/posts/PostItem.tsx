'use client';

import type { ModifiedPost } from '@/store/slices/postsSlice';

type PostItemProps = {
  post: ModifiedPost;
};

export default function PostItem({ post }: PostItemProps) {
  return <div>{JSON.stringify(post)}</div>;
}
