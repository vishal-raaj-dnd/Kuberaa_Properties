import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Kuberaa] Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

// ── Database type helpers ──────────────────────────────────────────────────────

export type Tables = {
  profiles: {
    id: string;           // matches auth.users.id
    name: string;
    email: string;
    phone: string;
    role: "client" | "admin";
    avatar_initials: string;
    joined_at: string;
    created_at: string;
  };
  documents: {
    id: string;
    user_id: string;
    title: string;
    subtitle: string;
    date: string;
    status: "done" | "in-progress" | "pending";
    badge: string | null;
    sort_order: number;
    created_at: string;
  };
  site_visits: {
    id: string;
    user_id: string;
    property: string;
    location: string;
    date: string;
    time: string;
    consultant: string;
    status: "upcoming" | "completed" | "cancelled";
    created_at: string;
  };
  payments: {
    id: string;
    user_id: string;
    label: string;
    amount: string;
    date: string;
    mode: string;
    status: "paid" | "due" | "overdue";
    sort_order: number;
    created_at: string;
  };
  properties: {
    id: string;
    user_id: string;
    name: string;
    plot_number: string;
    area: string;
    location: string;
    tag: "Residential Plot" | "Commercial Plot" | "Investment Plot";
    dtcp_ref: string;
    tnera_ref: string;
    purchase_date: string;
    purchase_price: string;
    image_url: string;
    created_at: string;
  };
};
