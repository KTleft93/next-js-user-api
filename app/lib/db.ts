import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let isConnected: boolean = false;

export async function connectToDatabase() {

  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("New MongoDB connection established.");
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}
