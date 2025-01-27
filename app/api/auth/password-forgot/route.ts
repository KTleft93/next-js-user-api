import { transporter } from "@/lib/email/send-mail";
import { NextRequest, NextResponse } from 'next/server';
import UserModel from '../../../lib/models/User';

import { connectToDatabase } from "@/lib/db";
import { generateResetToken, resetTokenExpiration } from "@/lib/email/password-token";
export async function POST(req: NextRequest) {

try{
  await connectToDatabase();
    const { email } = await req.json();
    const mailOptions = transporter;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found. Please check your email address.' },
        { status: 400 }
      );
    }

    const token = await generateResetToken();
    const tokenExpiry = resetTokenExpiration();
    user.resetToken = token;
    user.resetTokenExpiration = tokenExpiry;
    await user.save();


    mailOptions.sendMail({  
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Password',      
        text: `Enter the code on the page: ${token}`,
    });
    return NextResponse.json({ message: 'Password reset link sent successfully'+' '+token });

}
catch (error) {
  console.error('Error during password reset:', error);
  return NextResponse.json({ message: 'Internal server error. Please try again later.' }, { status: 500 });
}
}