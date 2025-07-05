import mongoose, { Document, Schema } from "mongoose";

export interface IAttendance extends Document {
  employee: mongoose.Types.ObjectId;
  status: "in" | "out";
  timestamp: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: ["in", "out"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAttendance>("Attendance", AttendanceSchema);
