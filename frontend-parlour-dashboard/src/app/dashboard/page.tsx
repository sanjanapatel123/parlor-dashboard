// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import EmployeesTab from "@/components/tabs/EmployeesTab";
// import TasksTab from "@/components/tabs/TasksTab";
// import AttendanceTab from "@/components/tabs/AttendanceTab";
// import { useRouter } from "next/navigation";
// import DashboardLayout from "@/components/layouts/DashboardLayout";

// const DashboardPage = () => {
//   const [tab, setTab] = useState("employees");
//   const [token, setToken] = useState("");
//   const [role, setRole] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedRole = localStorage.getItem("role");

//     if (!storedToken) {
//       router.push("/login");
//     } else {
//       setToken(storedToken);
//       setRole(storedRole || "admin");
//     }
//   }, [router]);

//   return (
//     <DashboardLayout>
//       <div className="p-6 space-y-6">
//         <div className="flex gap-4">
//           <Button
//             variant={tab === "employees" ? "default" : "outline"}
//             onClick={() => setTab("employees")}
//           >
//             Employees
//           </Button>
//           <Button
//             variant={tab === "tasks" ? "default" : "outline"}
//             onClick={() => setTab("tasks")}
//           >
//             Tasks
//           </Button>
//           <Button
//             variant={tab === "attendance" ? "default" : "outline"}
//             onClick={() => setTab("attendance")}
//           >
//             Attendance
//           </Button>
//         </div>

//         <div className="mt-4">
//           {tab === "employees" && <EmployeesTab token={token} role={role} />}
//           {tab === "tasks" && <TasksTab token={token} role={role} />}
//           {tab === "attendance" && <AttendanceTab />}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default DashboardPage;

"use client";

import { useEffect, useState } from "react";
import EmployeesTab from "@/components/tabs/EmployeesTab";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function DashboardPage() {
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
      <EmployeesTab token={token} role={role} />
    </DashboardLayout>
  );
}
