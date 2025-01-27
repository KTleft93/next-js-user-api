import { NextRequest,NextResponse } from 'next/server'
import UserModel from '../../../lib/models/User';
import { connectToDatabase } from '@/lib/db';

export async function POST(req: NextRequest) {
    const { token } = await req.json();
    try {
       await connectToDatabase();
        const user = await UserModel.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid or expired token' },
                { status: 400 }
            );
        }
        return NextResponse.json({ message: 'Token verified' });
    
} catch (error) {
  console.error('Error during password reset:', error);
  return NextResponse.json({ message: 'Internal server error. Please try again later.' }, { status: 500 });
}
}