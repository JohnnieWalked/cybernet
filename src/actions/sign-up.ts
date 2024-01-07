'use server';

import { db } from '@/db';
import bcryptjs from 'bcryptjs';
import { SignUpSchema } from '@/schemas';
import { getUserByEmail, getUserByUsername } from '@/data/user';
import { generateVerificationToken } from '@/data/tokens';

type SignUpProps = {
  success?: boolean;
  errors: {
    name?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    _form?: string[]; // _form used for specific errors (not user's mistake: for example unknown errors)
  };
};

export async function signUp(
  formState: SignUpProps,
  formData: FormData
): Promise<SignUpProps> {
  const result = SignUpSchema.safeParse({
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  });

  /* if not validated => return errors */
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    // check if username already exists
    const existingUserByUsername = await getUserByUsername(
      result.data.username
    );
    if (existingUserByUsername) {
      return {
        errors: {
          username: ['User with this username already exists.'],
        },
      };
    }

    // check if email already exists
    const existingUserByEmail = await getUserByEmail(result.data.email);
    if (existingUserByEmail) {
      return {
        errors: {
          email: ['User with this email already exists.'],
        },
      };
    }

    if (result.data.password !== result.data.repeatPassword) {
      return {
        errors: {
          password: ['Password must be identical.'],
        },
      };
    }

    // encrypt the password
    const hashedPassword = await bcryptjs.hash(result.data.password, 10);

    // create a user
    await db.user.create({
      data: {
        name: result.data.name,
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(
      result.data.email
    );
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
