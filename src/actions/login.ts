'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { SignInSchema } from '@/schemas';
import { getUserByEmail, getUserByUsername } from '@/data/user';
import { User } from '@prisma/client';
import { generateVerificationToken } from '@/data/tokens';

type LoginProps = {
  errors: {
    signin?: string[];
    password?: string[];
    _form?: string[]; // _form used for specific errors (not user's mistake: for example unknown errors)
  };
  success?: boolean;
};

export async function login(
  formState: LoginProps,
  formData: FormData
): Promise<LoginProps> {
  const result = SignInSchema.safeParse({
    signin: formData.get('signin'),
    password: formData.get('password'),
  });

  /* if not validated => return errors */
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let user: User | null;

  result.data.signin.includes('@')
    ? (user = await getUserByEmail(result.data.signin))
    : (user = await getUserByUsername(result.data.signin));

  if (!user) {
    return {
      errors: {
        _form: ['Invalid credentials!'],
      },
    };
  }

  if (!user.emailVerified) {
    const verificationToken = generateVerificationToken(user.email);

    return {
      errors: {},
      success: false,
    };
  }

  try {
    await signIn('credentials', {
      signin: result.data.signin,
      password: result.data.password,
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            errors: {
              _form: ['Invalid credentials!'],
            },
          };
        default:
          return {
            errors: {
              _form: ['Oops, something went wrong...'],
            },
          };
      }
    } else {
      throw error;
    }
  }

  return {
    errors: {
      _form: ['Oops, something went wrong.'],
    },
  };
}
