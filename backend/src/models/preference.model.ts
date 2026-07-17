import { Schema, model, type Document, type Types } from "mongoose";

export interface PreferenceDocument extends Document {
  user: Types.ObjectId;
  preferredModel: string;
  creativity: string;
  writingStyle: string;
  systemPrompt: string;
}

const preferenceSchema = new Schema<PreferenceDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    preferredModel: { type: String, default: "gemini-2.5-flash" },
    creativity: { type: String, default: "Medium" },
    writingStyle: { type: String, default: "Clear and concise" },
    systemPrompt: { type: String, default: "You are a helpful AI writing assistant." },
  },
  {
    timestamps: true,
  }
);

const Preference = model<PreferenceDocument>("Preference", preferenceSchema);
export default Preference;
