import { JWTPayload, SignJWT } from 'jose';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h') 
    .sign(JWT_SECRET);
    console.log("Token generated" + payload);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload; 
  } catch (error) {
    console.error('JWT verification error:', error);
    throw new Error('Invalid or expired token');
  }
}