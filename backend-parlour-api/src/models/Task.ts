import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  assignedTo: mongoose.Types.ObjectId;
  status: "pending" | "in-progress" | "completed";
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
