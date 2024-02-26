'use client';

import { useEffect, useState, useTransition } from 'react';
import * as actions from '@/actions';
import { ModifiedComment } from '@/types';
import Loader from '../common/Loader';
import CommentItem from './CommentItem';

type CommentListProps = {
  postID: string;
};

function CommentList({ postID }: CommentListProps) {
  const [commentList, setCommentList] = useState<ModifiedComment[] | null>(
    null
  );
  const [isPending, startTranisition] = useTransition();

  useEffect(() => {
    startTranisition(async () => {
      const comments = await actions.getComments(postID);
      setCommentList(comments);
    });
  }, [postID]);

  const renderComments = commentList?.map((comment, index) => {
    return <CommentItem comment={comment} key={index} />;
  });

  return (
    <div>
      {isPending ? (
        <Loader
          wrapperClassName=" self-center w-full h-full"
          width="80%"
          color="var(--redLight)"
        />
      ) : (
        <div className=" overflow-y-auto pr-3">{renderComments}</div>
      )}
    </div>
  );
}

export default CommentList;
