import type { User } from '@prisma/client';

export type ModifiedUser = Omit<User, 'emailVerified' | 'password' | 'email'>;
