"use client";

import { useState } from "react";
import API from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  defaultValues?: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  onSuccess: () => void;
  employeeId?: string;
}

const EmployeeForm = ({ defaultValues, onSuccess, employeeId }: Props) => {
  const [form, setForm] = useState(
    defaultValues || { name: "", email: "", phone: "", role: "stylist" }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (employeeId) {
        await API.put(`/employees/${employeeId}`, form);
      } else {
        await API.post("/employees", form);
      }
      onSuccess();
    } catch (err) {
      console.error("Save failed:", err);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <Input
        placeholder="Role (e.g. stylist, manager)"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : employeeId ? "Update" : "Create"}
      </Button>
    </div>
  );
};

export default EmployeeForm;
