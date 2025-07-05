"use client";
import { useState, useEffect } from "react";
import TasksTab from "@/components/tabs/TasksTab";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function TaskDashboard() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    const storedRole = localStorage.getItem("role") || "";
    setToken(storedToken);
    setRole(storedRole);
  }, []);

  return (
    <DashboardLayout>
      <TasksTab token={token} role={role} />
    </DashboardLayout>
  );
}
