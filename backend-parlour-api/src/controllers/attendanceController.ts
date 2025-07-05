import { Request, Response } from "express";
import Attendance from "../models/Attendance";

export const getAttendanceLogs = async (_req: Request, res: Response) => {
  try {
    const logs = await Attendance.find()
      .populate("employee", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};
