import nodemailer, { TransportOptions } from 'nodemailer';

// Transporter configuration for Gmail
export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
    tls: {
        rejectUnauthorized: false,
      },
} as TransportOptions);


