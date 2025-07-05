"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import socket from "@/lib/socket";
import { Card } from "@/components/ui/card";

interface AttendanceLog {
  _id: string;
  status: string;
  timestamp: string;
  employee: {
    name: string;
    role: string;
  };
}

const AttendanceTab = () => {
  const [logs, setLogs] = useState<AttendanceLog[]>([]);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/attendance");
      if (Array.isArray(res.data)) {
        setLogs(res.data);
      } else {
        console.error("Unexpected attendance response", res.data);
      }
    } catch (err) {
      console.error("Error fetching attendance logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs(); // initial fetch

    socket.connect(); // connect socket

    socket.on("attendanceUpdate", (newLog: AttendanceLog) => {
      setLogs((prev) => [newLog, ...prev]);
    });

    return () => {
      socket.disconnect(); // cleanup
    };
  }, []);

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold mb-4">Live Attendance Logs</h2>

      {logs.length === 0 && (
        <p className="text-gray-500 text-sm">No logs yet.</p>
      )}

      {logs.map((log) => (
        <Card
          key={log._id}
          className="p-4 flex justify-between items-center shadow-sm"
        >
          <div>
            <p className="font-medium">
              {log.employee.name} ({log.employee.role})
            </p>
            <p className="text-sm text-gray-500">
              {new Date(log.timestamp).toLocaleString()}
            </p>
          </div>

          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              log.status === "in" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {log.status === "in" ? "Punched In" : "Punched Out"}
          </span>
        </Card>
      ))}
    </div>
  );
};

export default AttendanceTab;
