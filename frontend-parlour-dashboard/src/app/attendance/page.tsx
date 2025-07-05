"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import socket from "@/lib/socket";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Employee {
  _id: string;
  name: string;
  role: string;
}

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, "in" | "out">>({});
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      }
    };

    fetchEmployees();
    socket.connect();

    return () => socket.disconnect();
  }, []);

  // Punch In/Out handler
  const handlePunch = (employeeId: string, status: "in" | "out") => {
    socket.emit("punch", { employeeId, status });
    setStatusMap((prev) => ({ ...prev, [employeeId]: status }));
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Dashboard</h2>
          {role && (
            <p className="text-sm text-gray-600">Logged in as: {role}</p>
          )}
        </div>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Employee Attendance</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <Card key={emp._id} className="p-4 space-y-2">
              <h3 className="font-semibold">{emp.name}</h3>
              <p className="text-sm text-gray-600">{emp.role}</p>

              <div className="flex gap-2">
                <Button
                  variant="default"
                  onClick={() => handlePunch(emp._id, "in")}
                >
                  Punch In
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handlePunch(emp._id, "out")}
                >
                  Punch Out
                </Button>
              </div>

              {statusMap[emp._id] && (
                <p className="text-xs text-blue-600">
                  Last: {statusMap[emp._id] === "in" ? "🟢 In" : "🔴 Out"}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
