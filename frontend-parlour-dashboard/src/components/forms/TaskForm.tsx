"use client";

import { useState, useEffect } from "react";
import API from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Props {
  defaultValues?: {
    title: string;
    description: string;
    status: string;
    assignedTo: string;
  };
  taskId?: string;
  onSuccess: () => void;
}

const TaskForm = ({ defaultValues, taskId, onSuccess }: Props) => {
  const [form, setForm] = useState({
    title: defaultValues?.title || "",
    description: defaultValues?.description || "",
    status: defaultValues?.status || "pending",
    assignedTo: defaultValues?.assignedTo || "",
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await API.get("/employees");
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (taskId) {
        await API.put(`/tasks/${taskId}`, form);
      } else {
        await API.post("/tasks", form);
      }
      onSuccess();
    } catch (err) {
      console.error("Task save failed:", err);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <Textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Select
        value={form.status}
        onValueChange={(value) => setForm({ ...form, status: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={form.assignedTo}
        onValueChange={(value) => setForm({ ...form, assignedTo: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Assign to..." />
        </SelectTrigger>
        <SelectContent>
          {employees.map((emp: any) => (
            <SelectItem key={emp._id} value={emp._id}>
              {emp.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : taskId ? "Update" : "Create"}
      </Button>
    </div>
  );
};

export default TaskForm;
