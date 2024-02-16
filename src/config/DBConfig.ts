import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("here", process.env.MONGO_URI);
        
        const conn = await mongoose.connect('mongodb://192.168.10.93:27017/learning');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export {connectDB};