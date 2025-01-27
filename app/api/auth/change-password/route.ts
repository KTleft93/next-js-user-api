import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../../lib/models/User";
import { connectToDatabase } from "../../../lib/db";
import bcrypt from "bcrypt";


export async function POST(req: NextRequest) {

    const { resetToken, newPassword } = await req.json();
    try {
       await connectToDatabase();

        const user = await UserModel.findOne({ resetToken, resetTokenExpiration: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid or expired token ' },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();
        return NextResponse.json({ message: 'Password reset successful' });

} catch (error) {
    console.error('Error during password reset:', error);
    return NextResponse.json({ message: 'Internal server error. Please try again later.' }, { status: 500 });
    }
}