import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any;
}

export const requireSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "superadmin") {
    res.status(403).json({ message: "Forbidden: Super Admins only" });
    return;
  }
  next();
};
