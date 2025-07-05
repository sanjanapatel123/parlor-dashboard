"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import TaskForm from "../forms/TaskForm";

interface Props {
  token: string;
  role: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: {
    _id: string;
    name: string;
    role: string;
  };
}

const TasksTab = ({ token, role }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else {
        setError("Unexpected response");
      }
    } catch (err) {
      console.error("Task fetch failed:", err);
      setError("Unauthorized or server error");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await API.delete(`/tasks/${id}`);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const isSuperAdmin = role === "superadmin";

  return (
    <div className="space-y-6">
      {isSuperAdmin && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">+ Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Add New Task</DialogHeader>
            <TaskForm onSuccess={() => setRefresh(!refresh)} />
          </DialogContent>
        </Dialog>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Card key={task._id} className="p-4 space-y-1">
            <h3 className="font-bold text-lg">{task.title}</h3>
            <p className="text-sm text-gray-700">{task.description}</p>
            <p className="text-sm text-blue-700">Status: {task.status}</p>
            <p className="text-sm text-gray-500">
              Assigned to: {task.assignedTo?.name} ({task.assignedTo?.role})
            </p>

            {isSuperAdmin && (
              <div className="flex gap-2 mt-3">
                {/* Edit Task Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Edit Task</DialogHeader>
                    <TaskForm
                      taskId={task._id}
                      defaultValues={{
                        title: task.title,
                        description: task.description,
                        status: task.status,
                        assignedTo: task.assignedTo?._id || "",
                      }}
                      onSuccess={() => setRefresh(!refresh)}
                    />
                  </DialogContent>
                </Dialog>

                {/* Delete Button */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TasksTab;
