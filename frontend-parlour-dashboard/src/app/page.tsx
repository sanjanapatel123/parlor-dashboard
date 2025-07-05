"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="text-center space-y-6 p-8 bg-white/90 rounded-xl shadow-lg max-w-xl w-full">
        <h1 className="text-4xl font-bold text-pink-700">
          Welcome to Parlour Admin
        </h1>
        <p className="text-gray-600 text-lg">
          Manage employees, tasks, and attendance with ease — built for salons
          and parlours.
        </p>
        <Button className="text-lg px-6 py-2" onClick={goToLogin}>
          Login to Continue
        </Button>
      </div>
    </main>
  );
}
