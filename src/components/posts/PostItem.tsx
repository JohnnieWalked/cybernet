'use client';

import type { ModifiedPost } from '@/store/slices/postsSlice';

/* components */
import UserAvatar from '../user/UserAvatar';

type PostItemProps = {
  post: ModifiedPost;
};

export default function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex flex-col">
      <div className="flex"> </div>
      <div>{JSON.stringify(post)}</div>
    </div>
  );
}
