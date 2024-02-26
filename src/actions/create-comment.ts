'use server';

import { CreateCommentSchema } from '@/schemas';
import { auth } from '@/auth';
import { db } from '@/db';

type CreateCommentFormState = {
  success?: boolean;
  errors: {
    content?: string[];
    _form?: string[]; // _form used for specific errors (not user's mistake: for example unknown errors)
  };
};

export async function createComment(
  { postID, parentID }: { postID: string; parentID?: string },
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = CreateCommentSchema.safeParse({
    content: formData.get('content'),
  });

  /* if not validated => return errors */
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session) return { errors: { _form: ['User not logged in!'] } };

  try {
    await db.comment.create({
      data: {
        content: result.data.content,
        userId: session.user.id,
        postId: postID,
        parentId: parentID,
      },
      include: { user: true, post: true },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong...'],
        },
      };
    }
  }

  return {
    success: true,
    errors: {},
  };
}
