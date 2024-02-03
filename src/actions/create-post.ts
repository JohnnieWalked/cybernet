'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { CreatePostSchema } from '@/schemas';

type CreatePostProps = {
  success?: boolean;
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[]; // _form used for specific errors (not user's mistake: for example unknown errors)
  };
};

export async function createPost(
  formState: CreatePostProps,
  formData: FormData
): Promise<CreatePostProps> {
  const result = CreatePostSchema.safeParse({
    title: formData.get('title'),
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
    await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        authorId: session.user.id,
      },
      include: { author: true },
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
