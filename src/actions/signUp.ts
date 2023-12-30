'use server';

import { z } from 'zod';
import { db } from '@/db';
import { hash } from 'bcrypt';

const signUpSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9\s]+$/gm, {
    message: 'Allowed only lowercase, uppercase letters, numbers and spaces.',
  }),
  username: z
    .string()
    .max(10)
    .regex(/^[a-z_]+$/gm, {
      message: 'Allowed only lowercase letters and underscores.',
    }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email({ message: 'Invalid email address.' }),
  password: z.string(),
  repeatPassword: z.string(),
});

type signUpProps = {
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
  formState: signUpProps,
  formData: FormData
): Promise<signUpProps> {
  const result = signUpSchema.safeParse({
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
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: result.data.username,
      },
    });
    if (existingUserByUsername) {
      return {
        errors: {
          username: ['User with this username already exists.'],
        },
      };
    }

    // check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
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
    const hashedPassword = await hash(result.data.password, 10);

    // create a user
    await db.user.create({
      data: {
        name: result.data.name,
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
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
