import mongoose from 'mongoose';
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { connectDB };
