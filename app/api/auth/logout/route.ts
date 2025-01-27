import { NextResponse } from 'next/server';

export async function POST(res: NextResponse) {
  try {
   res.cookies.set('jwt', '');
   return NextResponse.json({ message: 'Logout successful' });
  
} catch (error) {
  console.error('Error during logout:', error);
  return NextResponse.json(
    { message: 'Internal server error. Please try again later.' },
    { status: 500 }
  );
  
}
 
}
