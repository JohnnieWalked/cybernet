import type { ModifiedComment } from '@/types';

type CommentItemProps = {
  comment: ModifiedComment;
};

function CommentItem({ comment }: CommentItemProps) {
  return <div>{comment.content}</div>;
}

export default CommentItem;
