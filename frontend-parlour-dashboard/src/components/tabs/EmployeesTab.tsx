"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import EmployeeForm from "../forms/EmployeeForm";

interface Props {
  token: string;
  role: string;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const EmployeesTab = ({ token, role }: Props) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [refresh, setRefresh] = useState(false);

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    if (Array.isArray(res.data)) {
      setEmployees(res.data);
    }
  };

  const deleteEmployee = async (id: string) => {
    await API.delete(`/employees/${id}`);
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  const isSuperAdmin = role === "superadmin";
  console.log("🚀 role received in EmployeesTab:", role);

  return (
    <div className="space-y-6">
      {isSuperAdmin && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">+ Add Employee</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Add New Employee</DialogHeader>
            <EmployeeForm onSuccess={() => setRefresh(!refresh)} />
          </DialogContent>
        </Dialog>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <Card key={emp._id} className="p-4">
            <h3 className="font-bold text-lg">{emp.name}</h3>
            <p>{emp.email}</p>
            <p>{emp.phone}</p>
            <p className="text-sm text-gray-600">{emp.role}</p>

            {isSuperAdmin && (
              <div className="mt-3 flex gap-2">
                {/* Edit Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Edit Employee</DialogHeader>
                    <EmployeeForm
                      employeeId={emp._id}
                      defaultValues={emp}
                      onSuccess={() => setRefresh(!refresh)}
                    />
                  </DialogContent>
                </Dialog>

                {/* Delete Button */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteEmployee(emp._id)}
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

export default EmployeesTab;
