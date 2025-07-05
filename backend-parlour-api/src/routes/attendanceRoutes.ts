import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getAttendanceLogs } from "../controllers/attendanceController";

const router = express.Router();

// Admin/Super Admin: View logs
router.get("/", protect, getAttendanceLogs);

export default router;
