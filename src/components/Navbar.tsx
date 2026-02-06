"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/tasks" className="text-xl font-bold text-blue-600">
          Todo App
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600">{user.name || user.email}</span>
          )}
          <Link
            href="/tasks"
            className="text-gray-600 hover:text-gray-900"
          >
            My Tasks
          </Link>

          <button
            onClick={() => signOut()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
