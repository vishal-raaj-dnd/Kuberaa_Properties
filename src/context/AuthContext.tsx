import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";
import { MOCK_USERS } from "../data";

// ── Types ──────────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string, phone: string) => Promise<{ success: boolean; error?: string }>;
}

// ── Context ────────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "kuberaa_auth_session";

// ── Provider ───────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: User = JSON.parse(raw);
        setUser(saved);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate async auth check
    await new Promise(r => setTimeout(r, 600));

    // Check seeded users first
    const seeded = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password
    );
    if (seeded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      setUser(seeded);
      return { success: true };
    }

    // Check locally registered users
    try {
      const raw = localStorage.getItem("kuberaa_registered_users") || "[]";
      const registered: User[] = JSON.parse(raw);
      const match = registered.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password
      );
      if (match) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(match));
        setUser(match);
        return { success: true };
      }
    } catch { /* ignore */ }

    return { success: false, error: "Invalid email or password. Please try again." };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    window.location.hash = "#/";
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 600));

    // Check duplicate
    const allUsers = [
      ...MOCK_USERS,
      ...(() => {
        try {
          return JSON.parse(localStorage.getItem("kuberaa_registered_users") || "[]") as User[];
        } catch { return []; }
      })()
    ];
    if (allUsers.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser: User = {
      id: "user-" + Date.now(),
      name,
      email,
      passwordHash: password,
      phone,
      role: "client",
      avatarInitials: name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase(),
      joinedAt: new Date().toISOString().split("T")[0]
    };

    try {
      const raw = localStorage.getItem("kuberaa_registered_users") || "[]";
      const arr: User[] = JSON.parse(raw);
      arr.push(newUser);
      localStorage.setItem("kuberaa_registered_users", JSON.stringify(arr));
    } catch { /* ignore */ }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
