import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/user.model";
import Draft from "../models/draft.model";
import Preference from "../models/preference.model";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/ai-content-workspace";

const seed = async () => {
  await mongoose.connect(MONGO_URI);

  const password = await bcrypt.hash("password123", 10);

  const user1 = await User.create({
    email: "user1@example.com",
    password,
  });

  const user2 = await User.create({
    email: "user2@example.com",
    password,
  });

  await Draft.create({
    contentType: "Blog Article",
    topic: "AI project workflow",
    audience: "Developers",
    tone: "Informative",
    instructions: "Write a polished introduction.",
    content: "This is a seeded draft for your AI content app.",
    user: user1._id.toString(),
  });

  await Preference.create({
    user: user1._id.toString(),
    preferredModel: "gemini-2.5-flash",
    creativity: "Medium",
    writingStyle: "Clear and concise",
    systemPrompt: "You are a helpful AI writing assistant.",
  });

  await Draft.create({
    contentType: "Product Description",
    topic: "GenAI launch",
    audience: "Marketers",
    tone: "Persuasive",
    instructions: "Write a concise product overview.",
    content: "This is a seeded draft for the second user.",
    user: user2._id.toString(),
  });

  await Preference.create({
    user: user2._id.toString(),
    preferredModel: "gemini-2.5-flash",
    creativity: "High",
    writingStyle: "Engaging",
    systemPrompt: "You are an AI writing assistant that helps marketers create compelling messages.",
  });

  console.log("Seeding complete");
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
