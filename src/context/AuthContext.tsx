import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { User } from "../types";

// ── Types ──────────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string, phone: string) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

// ── Context ────────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Map DB profile → app User ──────────────────────────────────────────────────

function mapProfile(profile: Record<string, unknown>): User {
  return {
    id: profile.id as string,
    name: profile.name as string,
    email: profile.email as string,
    passwordHash: "",           // never exposed client-side with Supabase Auth
    phone: profile.phone as string,
    role: profile.role as "client" | "admin",
    avatarInitials: profile.avatar_initials as string,
    joinedAt: profile.joined_at as string,
  };
}

// ── Provider ───────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile from Supabase given a Supabase auth user
  const fetchProfile = async (supaUser: SupabaseUser): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supaUser.id)
        .single();
      if (error || !data) return null;
      return mapProfile(data as Record<string, unknown>);
    } catch {
      return null;
    }
  };

  // On mount — restore session
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const profile = await fetchProfile(session.user);
        setUser(profile);
      }
      setIsLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          const profile = await fetchProfile(session.user);
          setUser(profile);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const refreshUser = async () => {
    if (!session?.user) return;
    const profile = await fetchProfile(session.user);
    setUser(profile);
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; role?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) {
        return { success: false, error: error?.message || "Login failed. Please check your credentials." };
      }
      const profile = await fetchProfile(data.user);
      if (!profile) {
        return { success: false, error: "Account profile not found. Please contact support." };
      }
      setUser(profile);
      return { success: true, role: profile.role };
    } catch (err) {
      return { success: false, error: "An unexpected error occurred. Please try again." };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    window.location.hash = "#/";
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error || !data.user) {
        return { success: false, error: error?.message || "Registration failed." };
      }

      const avatarInitials = name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
      const today = new Date().toISOString().split("T")[0];

      // Insert profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        email,
        phone,
        role: "client",
        avatar_initials: avatarInitials,
        joined_at: today,
      });

      if (profileError) {
        return { success: false, error: "Account created but profile setup failed. Please contact support." };
      }

      // Seed empty document steps for the new user
      const defaultDocs = [
        { title: "Account Created", subtitle: "Your Kuberaa client account is now active.", date: today, status: "done", badge: "ACTIVE", sort_order: 1 },
        { title: "Property Selection", subtitle: "Browse our available estates and express interest.", date: "", status: "pending", badge: null, sort_order: 2 },
        { title: "Agreement of Sale", subtitle: "Pending property selection.", date: "", status: "pending", badge: null, sort_order: 3 },
        { title: "Documentation & Verification", subtitle: "Pending agreement.", date: "", status: "pending", badge: null, sort_order: 4 },
        { title: "Registration", subtitle: "Pending documentation.", date: "", status: "pending", badge: null, sort_order: 5 },
        { title: "Possession & Handover", subtitle: "Pending registration.", date: "", status: "pending", badge: null, sort_order: 6 },
      ].map(doc => ({ ...doc, user_id: data.user!.id }));

      await supabase.from("documents").insert(defaultDocs);

      return { success: true };
    } catch (err) {
      return { success: false, error: "An unexpected error occurred." };
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, login, logout, register, refreshUser }}>
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
