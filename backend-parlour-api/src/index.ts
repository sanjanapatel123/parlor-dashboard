import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import taskRoutes from "./routes/taskRoutes";
import Attendance from "./models/Attendance";
import attendanceRoutes from "./routes/attendanceRoutes";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("🔌 New client connected");

  // Handle punch-in / punch-out
  socket.on("punch", async (data) => {
    const { employeeId, status } = data;

    try {
      const attendance = await Attendance.create({
        employee: employeeId,
        status,
      });

      const populated = await attendance.populate("employee", "name role");

      // Broadcast to all connected admins
      io.emit("attendanceUpdate", populated);
    } catch (err) {
      console.error("Punch error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("Parlour API is running 🚀");
});
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/attendance", attendanceRoutes);

// Connect DB
connectDB();

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
