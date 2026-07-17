import { Schema, model, type Document, type Types } from "mongoose";

export interface DraftDocument extends Document {
  contentType: string;
  topic: string;
  audience: string;
  tone: string;
  instructions?: string;
  content: string;
  user: Types.ObjectId;
  createdAt: Date;
}

const draftSchema = new Schema<DraftDocument>(
  {
    contentType: { type: String, required: true },
    topic: { type: String, required: true },
    audience: { type: String, required: true },
    tone: { type: String, required: true },
    instructions: { type: String, default: "" },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Draft = model<DraftDocument>("Draft", draftSchema);
export default Draft;
