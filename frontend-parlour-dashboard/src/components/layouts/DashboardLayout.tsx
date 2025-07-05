"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard", label: "Employees" },
  { href: "/dashboard/tasks", label: "Tasks" },
  { href: "/dashboard/attendence", label: "Attendance" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();

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

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4 hidden md:block">
        <h1 className="text-2xl font-bold">Parlour Admin</h1>
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded hover:bg-gray-700",
                pathname === link.href ? "bg-gray-700 font-semibold" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
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

        {children}
      </main>
    </div>
  );
}
