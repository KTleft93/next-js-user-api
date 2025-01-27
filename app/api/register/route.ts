import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import UserModel from '../../lib/models/User';
import { generateToken } from '../../lib/utils/jwtUtils';
import { connectToDatabase } from '../../lib/db';

export async function POST(req: NextRequest) {

  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User detected, please log in instead.' },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = await generateToken({ userId: newUser._id });
   
    const response = NextResponse.json({ message: 'Registration successful' });
    response.cookies.set('jwt', token);
    return response;
  } catch (error) {
    console.error('Error during registration:', error);

    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}