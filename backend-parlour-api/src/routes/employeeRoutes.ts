import express from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";
import { protect } from "../middleware/authMiddleware";
import { requireSuperAdmin } from "../middleware/roleMiddleware";

const router = express.Router();

router.get("/", protect, getEmployees); // ✅ Admin + Super Admin
router.post("/", protect, requireSuperAdmin, createEmployee);
router.put("/:id", protect, requireSuperAdmin, updateEmployee);
router.delete("/:id", protect, requireSuperAdmin, deleteEmployee);

export default router;
