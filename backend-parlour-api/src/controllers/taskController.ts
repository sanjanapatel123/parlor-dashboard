import { Request, Response } from "express";
import Task from "../models/Task";

// Create task (Super Admin)
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, assignedTo, status } = req.body;
    const task = await Task.create({ title, description, assignedTo, status });
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all tasks (All Admins)
export const getTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name role");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update task (Super Admin)
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json({ message: "Updated", task: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete task (Super Admin)
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json({ message: "Deleted", task: deleted });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
