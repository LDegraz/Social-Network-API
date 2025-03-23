import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetwork';
export const PORT = process.env.PORT || 3000;