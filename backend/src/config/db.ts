import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/ai-content-workspace";

const connectDB = async (): Promise<void> => {


  mongoose.set("strictQuery", false);

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
};

export default connectDB;
