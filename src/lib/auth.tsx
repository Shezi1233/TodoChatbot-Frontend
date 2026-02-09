/**
 * Authentication Context - Production Ready
 *
 * Simple JWT-based authentication for frontend.
 * Uses NEXT_PUBLIC_API_URL environment variable for backend URL.
 */

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

// =============================================================================
// Types
// =============================================================================

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

// =============================================================================
// Configuration
// =============================================================================
// Production fallback ensures the app works even if env var is missing

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://shezi1344-todo-chatbot-backend.hf.space";

// Log API URL in development
if (typeof window !== "undefined") {
  console.log("[Auth] Backend URL:", API_URL);
}

// =============================================================================
// Context
// =============================================================================

const AuthContext = createContext<AuthContextType | null>(null);

// =============================================================================
// Helpers
// =============================================================================

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("[Auth] Error decoding token:", error);
    return true;
  }
};

// =============================================================================
// Provider
// =============================================================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        if (isTokenExpired(storedToken)) {
          console.log("[Auth] Token expired, clearing session");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoading(false);
          return;
        }

        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("[Auth] Signing in...");

    const res = await fetch(`${API_URL}/api/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error("[Auth] Sign in failed:", error);
      throw new Error(error.detail || "Sign in failed");
    }

    const data = await res.json();
    const accessToken = data.access_token;

    if (isTokenExpired(accessToken)) {
      throw new Error("Received expired token from server");
    }

    setToken(accessToken);
    setUser(data.user);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("[Auth] Sign in successful");
    router.push("/tasks");
  };

  const signUp = async (email: string, password: string, name: string) => {
    console.log("[Auth] Signing up...");

    const res = await fetch(`${API_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error("[Auth] Sign up failed:", error);
      throw new Error(error.detail || "Sign up failed");
    }

    console.log("[Auth] Sign up successful, auto signing in...");
    await signIn(email, password);
  };

  const signOut = () => {
    console.log("[Auth] Signing out...");
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/signin");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, signIn, signUp, signOut, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =============================================================================
// Hook
// =============================================================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
