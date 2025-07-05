import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { protect } from "../middleware/authMiddleware";
import { requireSuperAdmin } from "../middleware/roleMiddleware";

const router = express.Router();

// View all tasks (Admin + Super Admin)
router.get("/", protect, getTasks);

// Super Admin only
router.post("/", protect, requireSuperAdmin, createTask);
router.put("/:id", protect, requireSuperAdmin, updateTask);
router.delete("/:id", protect, requireSuperAdmin, deleteTask);

export default router;
