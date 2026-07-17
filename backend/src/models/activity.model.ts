import { Schema, model, type Document } from "mongoose";

export interface ActivityDocument extends Document {
  contentType: string;
  action: string;
  topic?: string;
  user?: string;
  createdAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    contentType: { type: String, required: true },
    action: { type: String, required: true },
    topic: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Activity = model<ActivityDocument>("Activity", activitySchema);
export default Activity;
