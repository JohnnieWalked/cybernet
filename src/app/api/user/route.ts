import { NextResponse } from 'next/server';
import { db } from '@/db';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    // check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // check if username already exists
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'User with this username already exists' },
        { status: 409 }
      );
    }

    // encrypt the password
    const hashedPassword = await hash(password, 10);

    // create a user
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { user: newUser, message: 'Created successfuly' },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error;
    }
  }
}
