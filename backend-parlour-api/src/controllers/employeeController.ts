import { Request, Response } from "express";
import Employee from "../models/Employee";

// Create new employee (Super Admin)
export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, phone, role } = req.body;
    const employee = await Employee.create({ name, email, phone, role });
    res.status(201).json({ message: "Employee created", employee });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all employees (All Admins)
export const getEmployees = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update employee (Super Admin)
export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.status(200).json({ message: "Updated", employee: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.status(200).json({ message: "Deleted", employee: deleted });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
