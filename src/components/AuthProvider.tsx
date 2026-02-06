"use client";

import { AuthProvider, useAuth } from "@/lib/auth";

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { useAuth };
