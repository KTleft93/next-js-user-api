
import UserModel, {User} from '../../lib/models/User';
import { generateToken } from '../../lib/utils/jwtUtils';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/db';
import bcrypt from 'bcrypt';


export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    const { email, password } = await req.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = await generateToken({ userId: user._id });

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('jwt', token);
    
    return response;
  } catch (error) {
    console.error('Error during login:', error);

    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}