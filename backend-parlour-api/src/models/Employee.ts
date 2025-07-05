import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  phone: string;
  role: string; // e.g. beautician, receptionist, etc.
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
