import React, { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, Users, FileText, Calendar, CreditCard, Home,
  LogOut, ChevronRight, ChevronLeft, Search, Plus, Save, Trash2,
  CheckCircle2, Clock, Circle, AlertTriangle, Edit3, X, Menu,
  Phone, Mail, Shield, TrendingUp, Building2, Loader2, RefreshCw, UserPlus
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { Tables } from "../lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────────

type AdminTab = "overview" | "customers" | "customer-detail";

type CustomerProfile = Tables["profiles"];
type Document       = Tables["documents"];
type SiteVisit      = Tables["site_visits"];
type Payment        = Tables["payments"];
type Property       = Tables["properties"];
type DetailTab      = "documents" | "visits" | "payments" | "properties" | "profile";

// ── Helpers ────────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    done:        "bg-emerald-900/40 border-emerald-600/30 text-emerald-400",
    "in-progress": "bg-[#C8A467]/15 border-[#C8A467]/30 text-[#C8A467]",
    pending:     "bg-white/5 border-[#F5EFE3]/10 text-[#F5EFE3]/30",
    paid:        "bg-emerald-900/40 border-emerald-600/30 text-emerald-400",
    due:         "bg-[#C8A467]/15 border-[#C8A467]/30 text-[#C8A467]",
    overdue:     "bg-red-900/30 border-red-600/30 text-red-400",
    upcoming:    "bg-[#C8A467]/15 border-[#C8A467]/30 text-[#C8A467]",
    completed:   "bg-emerald-900/40 border-emerald-600/30 text-emerald-400",
    cancelled:   "bg-red-900/30 border-red-600/30 text-red-400",
    admin:       "bg-purple-900/40 border-purple-600/30 text-purple-400",
    client:      "bg-[#C8A467]/15 border-[#C8A467]/30 text-[#C8A467]",
  };
  return (
    <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-1 rounded-lg border font-sans inline-block ${colors[status] || colors.pending}`}>
      {status}
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-sans text-[9px] uppercase tracking-widest text-[#F5EFE3]/30 mb-1">{label}</p>
      {children}
    </div>
  );
}

function inputCls(extra = "") {
  return `w-full bg-[#1a0f0a] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-xl px-3 py-2.5 outline-none transition-all placeholder:text-[#F5EFE3]/20 ${extra}`;
}

function selectCls(extra = "") {
  return `w-full bg-[#1a0f0a] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-xl px-3 py-2.5 outline-none transition-all ${extra}`;
}

// ── Overview Stats ─────────────────────────────────────────────────────────────

function AdminOverview({ customers }: { customers: CustomerProfile[] }) {
  const clients = customers.filter(c => c.role === "client");
  return (
    <div className="space-y-8">
      <div>
        <p className="font-sans text-[10px] tracking-widest uppercase text-[#F5EFE3]/40 mb-1">Dashboard</p>
        <h2 className="font-serif text-3xl text-[#F5EFE3]">Admin Overview</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Clients", value: `${clients.length}`, sub: "registered accounts", accent: true },
          { label: "Total Users", value: `${customers.length}`, sub: "including admins" },
          { label: "Active Portal", value: "Live", sub: "Supabase connected" },
          { label: "Data Sync", value: "Real-time", sub: "all tables" },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-5 ${s.accent ? "bg-[#B08A4E]/15 border-[#C8A467]/30" : "bg-white/5 border-[#F5EFE3]/8"}`}>
            <p className="font-sans text-[10px] tracking-widest uppercase text-[#F5EFE3]/40 mb-1">{s.label}</p>
            <p className={`font-serif text-3xl font-bold ${s.accent ? "text-[#C8A467]" : "text-[#F5EFE3]"}`}>{s.value}</p>
            <p className="font-sans text-[11px] text-[#F5EFE3]/40 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/3 border border-[#F5EFE3]/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F5EFE3]/5">
          <p className="font-sans text-xs font-bold text-[#F5EFE3]">Recent Clients</p>
        </div>
        {clients.length === 0 ? (
          <p className="text-center text-[#F5EFE3]/30 font-sans text-xs py-10">No clients yet.</p>
        ) : (
          <div className="divide-y divide-[#F5EFE3]/5">
            {clients.slice(0, 5).map(c => (
              <div key={c.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B08A4E] to-[#C8A467] flex items-center justify-center flex-shrink-0">
                  <span className="font-sans font-bold text-[11px] text-[#2E1E14]">{c.avatar_initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-xs font-bold text-[#F5EFE3] truncate">{c.name}</p>
                  <p className="font-sans text-[10px] text-[#F5EFE3]/40 truncate">{c.email}</p>
                </div>
                <StatusBadge status={c.role} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Customer List ──────────────────────────────────────────────────────────────

function CustomerList({
  customers,
  onSelect,
  onAdd,
}: {
  customers: CustomerProfile[];
  onSelect: (c: CustomerProfile) => void;
  onAdd: () => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = customers.filter(
    c => c.role === "client" && (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="font-sans text-[10px] tracking-widest uppercase text-[#F5EFE3]/40 mb-1">All Clients</p>
          <h2 className="font-serif text-3xl text-[#F5EFE3]">Customer Management</h2>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-[#B08A4E] hover:bg-[#C8A467] text-[#2E1E14] font-bold text-[10px] tracking-widest uppercase px-5 py-3 rounded-xl transition-all cursor-pointer font-sans"
          id="add-customer-btn"
        >
          <UserPlus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#B08A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#2E1E14] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-xl pl-10 pr-4 py-3.5 outline-none transition-all placeholder:text-[#F5EFE3]/30"
          id="customer-search"
        />
      </div>

      {/* Table */}
      <div className="bg-white/3 border border-[#F5EFE3]/8 rounded-2xl overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 px-5 py-3 border-b border-[#F5EFE3]/5">
          <span className="col-span-4 font-sans text-[9px] uppercase tracking-widest text-[#F5EFE3]/30">Name</span>
          <span className="col-span-4 font-sans text-[9px] uppercase tracking-widest text-[#F5EFE3]/30">Email</span>
          <span className="col-span-2 font-sans text-[9px] uppercase tracking-widest text-[#F5EFE3]/30">Phone</span>
          <span className="col-span-2 font-sans text-[9px] uppercase tracking-widest text-[#F5EFE3]/30">Joined</span>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-[#F5EFE3]/30 font-sans text-xs py-10">
            {search ? "No customers found." : "No customers registered yet."}
          </p>
        ) : (
          <div className="divide-y divide-[#F5EFE3]/5">
            {filtered.map(c => (
              <button
                key={c.id}
                onClick={() => onSelect(c)}
                className="w-full text-left px-5 py-4 hover:bg-[#B08A4E]/10 transition-colors group cursor-pointer sm:grid sm:grid-cols-12 sm:items-center flex items-center gap-3"
                id={`customer-row-${c.id}`}
              >
                {/* Mobile layout */}
                <div className="sm:hidden flex items-center gap-3 flex-1">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B08A4E] to-[#C8A467] flex items-center justify-center flex-shrink-0">
                    <span className="font-sans font-bold text-[11px] text-[#2E1E14]">{c.avatar_initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-xs font-bold text-[#F5EFE3] truncate">{c.name}</p>
                    <p className="font-sans text-[10px] text-[#F5EFE3]/40 truncate">{c.email}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#C8A467] ml-auto flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>

                {/* Desktop layout */}
                <div className="hidden sm:flex sm:col-span-4 items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B08A4E] to-[#C8A467] flex items-center justify-center flex-shrink-0">
                    <span className="font-sans font-bold text-[11px] text-[#2E1E14]">{c.avatar_initials}</span>
                  </div>
                  <p className="font-sans text-xs font-bold text-[#F5EFE3] truncate">{c.name}</p>
                </div>
                <p className="hidden sm:block col-span-4 font-sans text-[11px] text-[#F5EFE3]/60 truncate">{c.email}</p>
                <p className="hidden sm:block col-span-2 font-sans text-[11px] text-[#F5EFE3]/60 truncate">{c.phone}</p>
                <div className="hidden sm:flex col-span-2 items-center justify-between">
                  <p className="font-sans text-[11px] text-[#F5EFE3]/40">{c.joined_at}</p>
                  <ChevronRight className="w-4 h-4 text-[#C8A467] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Add Customer Modal ──────────────────────────────────────────────────────────

function AddCustomerModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      // Create auth user via Supabase Admin API workaround — use signUp
      const { data, error: authErr } = await supabase.auth.signUp({ email, password });
      if (authErr || !data.user) { setError(authErr?.message || "Failed to create user."); setLoading(false); return; }

      const avatarInitials = name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
      const today = new Date().toISOString().split("T")[0];

      const { error: profileErr } = await supabase.from("profiles").insert({
        id: data.user.id, name, email, phone, role: "client",
        avatar_initials: avatarInitials, joined_at: today,
      });
      if (profileErr) { setError("Profile creation failed: " + profileErr.message); setLoading(false); return; }

      // Seed default documents
      const defaultDocs = [
        { title: "Account Created", subtitle: "Client account activated by admin.", date: today, status: "done", badge: "ACTIVE", sort_order: 1 },
        { title: "Property Selection", subtitle: "Browse available estates.", date: "", status: "pending", badge: null, sort_order: 2 },
        { title: "Agreement of Sale", subtitle: "Pending property selection.", date: "", status: "pending", badge: null, sort_order: 3 },
        { title: "Documentation & Verification", subtitle: "Pending agreement.", date: "", status: "pending", badge: null, sort_order: 4 },
        { title: "Registration", subtitle: "Pending documentation.", date: "", status: "pending", badge: null, sort_order: 5 },
        { title: "Possession & Handover", subtitle: "Pending registration.", date: "", status: "pending", badge: null, sort_order: 6 },
      ].map(doc => ({ ...doc, user_id: data.user!.id }));
      await supabase.from("documents").insert(defaultDocs);

      onCreated();
      onClose();
    } catch (err) {
      setError("Unexpected error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" id="add-customer-modal">
      <div className="bg-[#2E1E14] border border-[#C8A467]/20 rounded-3xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-[#C8A467]/10">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-widest text-[#C8A467] mb-0.5">Admin Action</p>
            <h3 className="font-serif text-xl text-[#F5EFE3]">Add New Customer</h3>
          </div>
          <button onClick={onClose} className="text-[#F5EFE3]/40 hover:text-[#F5EFE3] transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
          <Field label="Full Name">
            <input type="text" required placeholder="Rajesh Kumar" value={name} onChange={e => setName(e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Email Address">
            <input type="email" required placeholder="client@example.com" value={email} onChange={e => setEmail(e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Phone Number">
            <input type="tel" required placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Temporary Password">
            <input type="password" required placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} className={inputCls()} />
          </Field>
          {error && (
            <div className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 rounded-xl px-3.5 py-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-[11px] text-red-300 font-sans">{error}</p>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-[#C8A467]/20 text-[#F5EFE3]/60 hover:text-[#F5EFE3] text-[10px] font-bold tracking-widest uppercase rounded-xl transition-all cursor-pointer font-sans">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#B08A4E] hover:bg-[#C8A467] disabled:opacity-60 text-[#2E1E14] font-bold text-[10px] tracking-widest uppercase rounded-xl transition-all cursor-pointer font-sans flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Creating…</> : <><Plus className="w-3.5 h-3.5" /> Create</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Documents Editor ────────────────────────────────────────────────────────────

function DocumentsEditor({ userId }: { userId: string }) {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: "", subtitle: "", date: "", status: "pending" as Document["status"], badge: "" });

  useEffect(() => {
    loadDocs();
  }, [userId]);

  const loadDocs = async () => {
    setLoading(true);
    const { data } = await supabase.from("documents").select("*").eq("user_id", userId).order("sort_order");
    setDocs((data as Document[]) || []);
    setLoading(false);
  };

  const updateDoc = async (doc: Document, field: Partial<Document>) => {
    setSaving(doc.id);
    const updated = { ...doc, ...field };
    setDocs(prev => prev.map(d => d.id === doc.id ? updated : d));
    await supabase.from("documents").update(field).eq("id", doc.id);
    setSaving(null);
  };

  const deleteDoc = async (docId: string) => {
    setDocs(prev => prev.filter(d => d.id !== docId));
    await supabase.from("documents").delete().eq("id", docId);
  };

  const addDoc = async () => {
    const { data } = await supabase.from("documents").insert({
      user_id: userId,
      title: newDoc.title,
      subtitle: newDoc.subtitle,
      date: newDoc.date,
      status: newDoc.status,
      badge: newDoc.badge || null,
      sort_order: docs.length + 1,
    }).select().single();
    if (data) setDocs(prev => [...prev, data as Document]);
    setNewDoc({ title: "", subtitle: "", date: "", status: "pending", badge: "" });
    setAddingNew(false);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-[#C8A467] animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-sans text-xs font-bold text-[#F5EFE3]">Documentation Steps ({docs.length})</h4>
        <button onClick={() => setAddingNew(true)} className="flex items-center gap-1.5 text-[10px] text-[#C8A467] hover:text-[#F5EFE3] font-bold uppercase tracking-wider font-sans transition-colors cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Add Step
        </button>
      </div>

      {docs.map((doc, idx) => (
        <div key={doc.id} className="bg-[#1a0f0a] border border-[#C8A467]/15 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] text-[#C8A467] font-bold">Step {idx + 1}</span>
            <div className="flex items-center gap-2">
              {saving === doc.id && <Loader2 className="w-3.5 h-3.5 text-[#C8A467] animate-spin" />}
              <button onClick={() => deleteDoc(doc.id)} className="text-[#F5EFE3]/20 hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Title">
              <input type="text" value={doc.title} onChange={e => updateDoc(doc, { title: e.target.value })} className={inputCls()} />
            </Field>
            <Field label="Status">
              <select value={doc.status} onChange={e => updateDoc(doc, { status: e.target.value as Document["status"] })} className={selectCls()}>
                <option value="done">Done</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
            </Field>
            <Field label="Subtitle / Description">
              <input type="text" value={doc.subtitle} onChange={e => updateDoc(doc, { subtitle: e.target.value })} className={inputCls()} />
            </Field>
            <Field label="Date">
              <input type="date" value={doc.date} onChange={e => updateDoc(doc, { date: e.target.value })} className={inputCls()} />
            </Field>
            <Field label="Badge Text (optional)">
              <input type="text" value={doc.badge || ""} placeholder="e.g. NOTARIZED" onChange={e => updateDoc(doc, { badge: e.target.value || null })} className={inputCls()} />
            </Field>
          </div>
        </div>
      ))}

      {/* Add new doc */}
      {addingNew && (
        <div className="bg-[#1a0f0a] border border-[#C8A467]/30 rounded-2xl p-5 space-y-3">
          <p className="font-sans text-[10px] font-bold text-[#C8A467] uppercase tracking-wider">New Step</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Title"><input type="text" placeholder="e.g. Agreement of Sale" value={newDoc.title} onChange={e => setNewDoc(p => ({...p, title: e.target.value}))} className={inputCls()} /></Field>
            <Field label="Status">
              <select value={newDoc.status} onChange={e => setNewDoc(p => ({...p, status: e.target.value as Document["status"]}))} className={selectCls()}>
                <option value="done">Done</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
            </Field>
            <Field label="Subtitle"><input type="text" placeholder="Description" value={newDoc.subtitle} onChange={e => setNewDoc(p => ({...p, subtitle: e.target.value}))} className={inputCls()} /></Field>
            <Field label="Date"><input type="date" value={newDoc.date} onChange={e => setNewDoc(p => ({...p, date: e.target.value}))} className={inputCls()} /></Field>
            <Field label="Badge (optional)"><input type="text" placeholder="NOTARIZED" value={newDoc.badge} onChange={e => setNewDoc(p => ({...p, badge: e.target.value}))} className={inputCls()} /></Field>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setAddingNew(false)} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider border border-[#C8A467]/20 text-[#F5EFE3]/50 hover:text-[#F5EFE3] rounded-xl transition-all cursor-pointer font-sans">Cancel</button>
            <button onClick={addDoc} disabled={!newDoc.title} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider bg-[#B08A4E] hover:bg-[#C8A467] disabled:opacity-50 text-[#2E1E14] rounded-xl transition-all cursor-pointer font-sans">Save Step</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Site Visits Editor ──────────────────────────────────────────────────────────

function VisitsEditor({ userId }: { userId: string }) {
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newVisit, setNewVisit] = useState({ property: "", location: "", date: "", time: "", consultant: "", status: "upcoming" as SiteVisit["status"] });

  useEffect(() => { loadVisits(); }, [userId]);

  const loadVisits = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_visits").select("*").eq("user_id", userId).order("date", { ascending: false });
    setVisits((data as SiteVisit[]) || []);
    setLoading(false);
  };

  const updateVisit = async (visit: SiteVisit, field: Partial<SiteVisit>) => {
    setSaving(visit.id);
    setVisits(prev => prev.map(v => v.id === visit.id ? { ...v, ...field } : v));
    await supabase.from("site_visits").update(field).eq("id", visit.id);
    setSaving(null);
  };

  const deleteVisit = async (id: string) => {
    setVisits(prev => prev.filter(v => v.id !== id));
    await supabase.from("site_visits").delete().eq("id", id);
  };

  const addVisit = async () => {
    const { data } = await supabase.from("site_visits").insert({ user_id: userId, ...newVisit }).select().single();
    if (data) setVisits(prev => [data as SiteVisit, ...prev]);
    setNewVisit({ property: "", location: "", date: "", time: "", consultant: "", status: "upcoming" });
    setAddingNew(false);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-[#C8A467] animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-sans text-xs font-bold text-[#F5EFE3]">Site Visits ({visits.length})</h4>
        <button onClick={() => setAddingNew(true)} className="flex items-center gap-1.5 text-[10px] text-[#C8A467] hover:text-[#F5EFE3] font-bold uppercase tracking-wider font-sans transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Visit</button>
      </div>

      {visits.map(visit => (
        <div key={visit.id} className="bg-[#1a0f0a] border border-[#C8A467]/15 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <StatusBadge status={visit.status} />
            <div className="flex items-center gap-2">
              {saving === visit.id && <Loader2 className="w-3.5 h-3.5 text-[#C8A467] animate-spin" />}
              <button onClick={() => deleteVisit(visit.id)} className="text-[#F5EFE3]/20 hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Property Name"><input type="text" value={visit.property} onChange={e => updateVisit(visit, { property: e.target.value })} className={inputCls()} /></Field>
            <Field label="Status">
              <select value={visit.status} onChange={e => updateVisit(visit, { status: e.target.value as SiteVisit["status"] })} className={selectCls()}>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </Field>
            <Field label="Location"><input type="text" value={visit.location} onChange={e => updateVisit(visit, { location: e.target.value })} className={inputCls()} /></Field>
            <Field label="Consultant"><input type="text" value={visit.consultant} onChange={e => updateVisit(visit, { consultant: e.target.value })} className={inputCls()} /></Field>
            <Field label="Date"><input type="date" value={visit.date} onChange={e => updateVisit(visit, { date: e.target.value })} className={inputCls()} /></Field>
            <Field label="Time"><input type="text" value={visit.time} placeholder="e.g. 10:00 AM" onChange={e => updateVisit(visit, { time: e.target.value })} className={inputCls()} /></Field>
          </div>
        </div>
      ))}

      {addingNew && (
        <div className="bg-[#1a0f0a] border border-[#C8A467]/30 rounded-2xl p-5 space-y-3">
          <p className="font-sans text-[10px] font-bold text-[#C8A467] uppercase tracking-wider">New Visit</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Property"><input type="text" placeholder="Property name" value={newVisit.property} onChange={e => setNewVisit(p => ({...p, property: e.target.value}))} className={inputCls()} /></Field>
            <Field label="Status">
              <select value={newVisit.status} onChange={e => setNewVisit(p => ({...p, status: e.target.value as SiteVisit["status"]}))} className={selectCls()}>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </Field>
            <Field label="Location"><input type="text" placeholder="Location" value={newVisit.location} onChange={e => setNewVisit(p => ({...p, location: e.target.value}))} className={inputCls()} /></Field>
            <Field label="Consultant"><input type="text" placeholder="Consultant name" value={newVisit.consultant} onChange={e => setNewVisit(p => ({...p, consultant: e.target.value}))} className={inputCls()} /></Field>
            <Field label="Date"><input type="date" value={newVisit.date} onChange={e => setNewVisit(p => ({...p, date: e.target.value}))} className={inputCls()} /></Field>
            <Field label="Time"><input type="text" placeholder="10:00 AM" value={newVisit.time} onChange={e => setNewVisit(p => ({...p, time: e.target.value}))} className={inputCls()} /></Field>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setAddingNew(false)} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider border border-[#C8A467]/20 text-[#F5EFE3]/50 hover:text-[#F5EFE3] rounded-xl transition-all cursor-pointer font-sans">Cancel</button>
            <button onClick={addVisit} disabled={!newVisit.property} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider bg-[#B08A4E] hover:bg-[#C8A467] disabled:opacity-50 text-[#2E1E14] rounded-xl transition-all cursor-pointer font-sans">Save Visit</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Payments Editor ─────────────────────────────────────────────────────────────

function PaymentsEditor({ userId }: { userId: string }) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newPay, setNewPay] = useState({ label: "", amount: "", date: "", mode: "", status: "due" as Payment["status"] });

  useEffect(() => { loadPayments(); }, [userId]);

  const loadPayments = async () => {
    setLoading(true);
    const { data } = await supabase.from("payments").select("*").eq("user_id", userId).order("sort_order");
    setPayments((data as Payment[]) || []);
    setLoading(false);
  };

  const updatePayment = async (pay: Payment, field: Partial<Payment>) => {
    setSaving(pay.id);
    setPayments(prev => prev.map(p => p.id === pay.id ? { ...p, ...field } : p));
    await supabase.from("payments").update(field).eq("id", pay.id);
    setSaving(null);
  };

  const deletePayment = async (id: string) => {
    setPayments(prev => prev.filter(p => p.id !== id));
    await supabase.from("payments").delete().eq("id", id);
  };

  const addPayment = async () => {
    const { data } = await supabase.from("payments").insert({ user_id: userId, ...newPay, sort_order: payments.length + 1 }).select().single();
    if (data) setPayments(prev => [...prev, data as Payment]);
    setNewPay({ label: "", amount: "", date: "", mode: "", status: "due" });
    setAddingNew(false);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-[#C8A467] animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-sans text-xs font-bold text-[#F5EFE3]">Payment Milestones ({payments.length})</h4>
        <button onClick={() => setAddingNew(true)} className="flex items-center gap-1.5 text-[10px] text-[#C8A467] hover:text-[#F5EFE3] font-bold uppercase tracking-wider font-sans transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Milestone</button>
      </div>

      {payments.map(pay => (
        <div key={pay.id} className="bg-[#1a0f0a] border border-[#C8A467]/15 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <StatusBadge status={pay.status} />
            <div className="flex items-center gap-2">
              {saving === pay.id && <Loader2 className="w-3.5 h-3.5 text-[#C8A467] animate-spin" />}
              <button onClick={() => deletePayment(pay.id)} className="text-[#F5EFE3]/20 hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Label"><input type="text" value={pay.label} onChange={e => updatePayment(pay, { label: e.target.value })} className={inputCls()} /></Field>
            <Field label="Status">
              <select value={pay.status} onChange={e => updatePayment(pay, { status: e.target.value as Payment["status"] })} className={selectCls()}>
                <option value="paid">Paid</option>
                <option value="due">Due</option>
                <option value="overdue">Overdue</option>
              </select>
            </Field>
            <Field label="Amount"><input type="text" value={pay.amount} placeholder="₹ 2,25,000" onChange={e => updatePayment(pay, { amount: e.target.value })} className={inputCls()} /></Field>
            <Field label="Date"><input type="text" value={pay.date} placeholder="15 Apr 2024" onChange={e => updatePayment(pay, { date: e.target.value })} className={inputCls()} /></Field>
            <Field label="Payment Mode"><input type="text" value={pay.mode} placeholder="NEFT — HDFC Bank" onChange={e => updatePayment(pay, { mode: e.target.value })} className={inputCls()} /></Field>
          </div>
        </div>
      ))}

      {addingNew && (
        <div className="bg-[#1a0f0a] border border-[#C8A467]/30 rounded-2xl p-5 space-y-3">
          <p className="font-sans text-[10px] font-bold text-[#C8A467] uppercase tracking-wider">New Milestone</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Label"><input type="text" placeholder="Token Advance" value={newPay.label} onChange={e => setNewPay(p => ({...p, label: e.target.value}))} className={inputCls()} /></Field>
            <Field label="Status">
              <select value={newPay.status} onChange={e => setNewPay(p => ({...p, status: e.target.value as Payment["status"]}))} className={selectCls()}>
                <option value="paid">Paid</option>
                <option value="due">Due</option>
                <option value="overdue">Overdue</option>
              </select>
            </Field>
            <Field label="Amount"><input type="text" placeholder="₹ 2,25,000" value={newPay.amount} onChange={e => setNewPay(p => ({...p, amount: e.target.value}))} className={inputCls()} /></Field>
            <Field label="Date"><input type="text" placeholder="15 Apr 2024" value={newPay.date} onChange={e => setNewPay(p => ({...p, date: e.target.value}))} className={inputCls()} /></Field>
            <Field label="Mode"><input type="text" placeholder="NEFT / Cheque / Cash" value={newPay.mode} onChange={e => setNewPay(p => ({...p, mode: e.target.value}))} className={inputCls()} /></Field>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={() => setAddingNew(false)} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider border border-[#C8A467]/20 text-[#F5EFE3]/50 hover:text-[#F5EFE3] rounded-xl transition-all cursor-pointer font-sans">Cancel</button>
            <button onClick={addPayment} disabled={!newPay.label} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider bg-[#B08A4E] hover:bg-[#C8A467] disabled:opacity-50 text-[#2E1E14] rounded-xl transition-all cursor-pointer font-sans">Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Properties Editor ───────────────────────────────────────────────────────────

function PropertiesEditor({ userId }: { userId: string }) {
  const [props, setProps] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const blank: Partial<Property> = { name: "", plot_number: "", area: "", location: "", tag: "Residential Plot", dtcp_ref: "", tnera_ref: "", purchase_date: "", purchase_price: "", image_url: "" };
  const [newProp, setNewProp] = useState<Partial<Property>>(blank);

  useEffect(() => { loadProps(); }, [userId]);

  const loadProps = async () => {
    setLoading(true);
    const { data } = await supabase.from("properties").select("*").eq("user_id", userId);
    setProps((data as Property[]) || []);
    setLoading(false);
  };

  const updateProp = async (prop: Property, field: Partial<Property>) => {
    setSaving(prop.id);
    setProps(prev => prev.map(p => p.id === prop.id ? { ...p, ...field } : p));
    await supabase.from("properties").update(field).eq("id", prop.id);
    setSaving(null);
  };

  const deleteProp = async (id: string) => {
    setProps(prev => prev.filter(p => p.id !== id));
    await supabase.from("properties").delete().eq("id", id);
  };

  const addProp = async () => {
    const { data } = await supabase.from("properties").insert({ user_id: userId, ...newProp }).select().single();
    if (data) setProps(prev => [...prev, data as Property]);
    setNewProp(blank);
    setAddingNew(false);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-[#C8A467] animate-spin" /></div>;

  const PropForm = ({ p, onChange }: { p: Partial<Property>; onChange: (f: Partial<Property>) => void }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label="Property Name"><input type="text" value={p.name || ""} placeholder="The Emerald Crest Plots" onChange={e => onChange({ name: e.target.value })} className={inputCls()} /></Field>
      <Field label="Type">
        <select value={p.tag || "Residential Plot"} onChange={e => onChange({ tag: e.target.value as Property["tag"] })} className={selectCls()}>
          <option value="Residential Plot">Residential Plot</option>
          <option value="Commercial Plot">Commercial Plot</option>
          <option value="Investment Plot">Investment Plot</option>
        </select>
      </Field>
      <Field label="Plot Number"><input type="text" value={p.plot_number || ""} placeholder="Plot No. 47 — Block B" onChange={e => onChange({ plot_number: e.target.value })} className={inputCls()} /></Field>
      <Field label="Area"><input type="text" value={p.area || ""} placeholder="1,800 sq.ft." onChange={e => onChange({ area: e.target.value })} className={inputCls()} /></Field>
      <Field label="Location"><input type="text" value={p.location || ""} placeholder="Saravanampatti, Coimbatore" onChange={e => onChange({ location: e.target.value })} className={inputCls()} /></Field>
      <Field label="Purchase Price"><input type="text" value={p.purchase_price || ""} placeholder="₹ 45,00,000" onChange={e => onChange({ purchase_price: e.target.value })} className={inputCls()} /></Field>
      <Field label="Purchase Date"><input type="text" value={p.purchase_date || ""} placeholder="April 2024" onChange={e => onChange({ purchase_date: e.target.value })} className={inputCls()} /></Field>
      <Field label="DTCP Reference"><input type="text" value={p.dtcp_ref || ""} placeholder="DTCP/CBE/2023/LP/0047" onChange={e => onChange({ dtcp_ref: e.target.value })} className={inputCls()} /></Field>
      <Field label="TNRERA Reference"><input type="text" value={p.tnera_ref || ""} placeholder="TN/01/Building/0234/2023" onChange={e => onChange({ tnera_ref: e.target.value })} className={inputCls()} /></Field>
      <Field label="Image URL (optional)"><input type="text" value={p.image_url || ""} placeholder="https://…" onChange={e => onChange({ image_url: e.target.value })} className={inputCls()} /></Field>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-sans text-xs font-bold text-[#F5EFE3]">Owned Properties ({props.length})</h4>
        <button onClick={() => setAddingNew(true)} className="flex items-center gap-1.5 text-[10px] text-[#C8A467] hover:text-[#F5EFE3] font-bold uppercase tracking-wider font-sans transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add Property</button>
      </div>

      {props.map(prop => (
        <div key={prop.id} className="bg-[#1a0f0a] border border-[#C8A467]/15 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] text-[#C8A467] font-bold">{prop.name || "Property"}</span>
            <div className="flex items-center gap-2">
              {saving === prop.id && <Loader2 className="w-3.5 h-3.5 text-[#C8A467] animate-spin" />}
              <button onClick={() => deleteProp(prop.id)} className="text-[#F5EFE3]/20 hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <PropForm p={prop} onChange={field => updateProp(prop, field)} />
        </div>
      ))}

      {addingNew && (
        <div className="bg-[#1a0f0a] border border-[#C8A467]/30 rounded-2xl p-5 space-y-3">
          <p className="font-sans text-[10px] font-bold text-[#C8A467] uppercase tracking-wider">New Property</p>
          <PropForm p={newProp} onChange={field => setNewProp(p => ({...p, ...field}))} />
          <div className="flex gap-2 pt-1">
            <button onClick={() => setAddingNew(false)} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider border border-[#C8A467]/20 text-[#F5EFE3]/50 hover:text-[#F5EFE3] rounded-xl transition-all cursor-pointer font-sans">Cancel</button>
            <button onClick={addProp} disabled={!newProp.name} className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider bg-[#B08A4E] hover:bg-[#C8A467] disabled:opacity-50 text-[#2E1E14] rounded-xl transition-all cursor-pointer font-sans">Save Property</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Profile Editor ──────────────────────────────────────────────────────────────

function ProfileEditor({ customer, onSaved }: { customer: CustomerProfile; onSaved: (updated: CustomerProfile) => void }) {
  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState(customer.phone);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const avatarInitials = name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
    await supabase.from("profiles").update({ name, phone, avatar_initials: avatarInitials }).eq("id", customer.id);
    setSaving(false);
    setSaved(true);
    onSaved({ ...customer, name, phone, avatar_initials: avatarInitials });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1a0f0a] border border-[#C8A467]/15 rounded-2xl p-6 space-y-4">
        <p className="font-sans text-[10px] font-bold text-[#C8A467] uppercase tracking-wider">Customer Profile</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name">
            <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Email Address">
            <input type="email" value={customer.email} disabled className={inputCls("opacity-50 cursor-not-allowed")} />
          </Field>
          <Field label="Phone Number">
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls()} />
          </Field>
          <Field label="Role">
            <input type="text" value={customer.role} disabled className={inputCls("opacity-50 cursor-not-allowed capitalize")} />
          </Field>
          <Field label="Member Since">
            <input type="text" value={customer.joined_at} disabled className={inputCls("opacity-50 cursor-not-allowed")} />
          </Field>
          <Field label="Client ID">
            <input type="text" value={customer.id} disabled className={inputCls("opacity-50 cursor-not-allowed font-mono text-[10px]")} />
          </Field>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#B08A4E] hover:bg-[#C8A467] disabled:opacity-60 text-[#2E1E14] font-bold text-[10px] tracking-widest uppercase px-6 py-3 rounded-xl transition-all cursor-pointer font-sans"
        >
          {saving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</> : saved ? <><CheckCircle2 className="w-3.5 h-3.5" /> Saved!</> : <><Save className="w-3.5 h-3.5" /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}

// ── Customer Detail View ────────────────────────────────────────────────────────

const DETAIL_TABS: { id: DetailTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "documents",  label: "Documents",   icon: FileText   },
  { id: "visits",     label: "Site Visits", icon: Calendar   },
  { id: "payments",   label: "Payments",    icon: CreditCard },
  { id: "properties", label: "Properties",  icon: Home       },
  { id: "profile",    label: "Profile",     icon: Users      },
];

function CustomerDetail({
  customer,
  onBack,
  onCustomerUpdated,
}: {
  customer: CustomerProfile;
  onBack: () => void;
  onCustomerUpdated: (updated: CustomerProfile) => void;
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>("documents");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[#C8A467] hover:text-[#F5EFE3] text-[10px] font-bold uppercase tracking-wider font-sans transition-colors cursor-pointer">
          <ChevronLeft className="w-3.5 h-3.5" /> All Customers
        </button>
        <span className="text-[#F5EFE3]/20">/</span>
        <span className="font-sans text-[10px] text-[#F5EFE3]/60">{customer.name}</span>
      </div>

      {/* Customer header card */}
      <div className="bg-gradient-to-br from-[#0B3C33] to-[#06221D] border border-emerald-700/30 rounded-2xl p-6 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#B08A4E] to-[#C8A467] flex items-center justify-center flex-shrink-0">
          <span className="font-sans font-bold text-lg text-[#2E1E14]">{customer.avatar_initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-2xl text-[#F5EFE3]">{customer.name}</h3>
          <p className="font-sans text-xs text-[#F5EFE3]/50 mt-0.5">{customer.email} · {customer.phone}</p>
          <p className="font-sans text-[10px] text-emerald-400/70 mt-1">Member since {customer.joined_at}</p>
        </div>
        <StatusBadge status={customer.role} />
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-[#2E1E14] border border-[#C8A467]/10 rounded-2xl p-1 overflow-x-auto">
        {DETAIL_TABS.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider font-sans whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                active ? "bg-[#B08A4E] text-[#2E1E14] shadow-md" : "text-[#F5EFE3]/50 hover:text-[#F5EFE3]"
              }`}
              id={`detail-tab-${tab.id}`}
            >
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="bg-[#2E1E14]/50 border border-[#C8A467]/10 rounded-2xl p-6">
        {activeTab === "documents"  && <DocumentsEditor  userId={customer.id} />}
        {activeTab === "visits"     && <VisitsEditor     userId={customer.id} />}
        {activeTab === "payments"   && <PaymentsEditor   userId={customer.id} />}
        {activeTab === "properties" && <PropertiesEditor userId={customer.id} />}
        {activeTab === "profile"    && <ProfileEditor    customer={customer} onSaved={onCustomerUpdated} />}
      </div>
    </div>
  );
}

// ── Main Admin Dashboard ────────────────────────────────────────────────────────

const SIDEBAR_ITEMS: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview",   label: "Overview",   icon: LayoutDashboard },
  { id: "customers",  label: "Customers",  icon: Users           },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Guard — non-admin redirected away
  useEffect(() => {
    if (user && user.role !== "admin") {
      window.location.hash = "#/dashboard";
    }
  }, [user]);

  const loadCustomers = useCallback(async () => {
    setLoadingCustomers(true);
    const { data } = await supabase.from("profiles").select("*").order("joined_at", { ascending: false });
    setCustomers((data as CustomerProfile[]) || []);
    setLoadingCustomers(false);
  }, []);

  useEffect(() => {
    if (!user) { window.location.hash = "#/signin"; return; }
    loadCustomers();
  }, [user, loadCustomers]);

  if (!user) return null;

  const handleSelectCustomer = (c: CustomerProfile) => {
    setSelectedCustomer(c);
    setActiveTab("customer-detail");
    setSidebarOpen(false);
  };

  const handleBackToCustomers = () => {
    setSelectedCustomer(null);
    setActiveTab("customers");
  };

  const handleCustomerUpdated = (updated: CustomerProfile) => {
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelectedCustomer(updated);
  };

  const currentTab = selectedCustomer ? "customer-detail" : activeTab;

  return (
    <div className="min-h-screen bg-[#1a0f0a] flex" id="admin-dashboard">

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#2E1E14] border-r border-[#C8A467]/15 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="admin-sidebar"
      >
        {/* Brand */}
        <div className="px-6 pt-8 pb-5 border-b border-[#C8A467]/10">
          <a href="#/" className="flex items-center gap-2 mb-3">
            <span className="font-serif text-[#C8A467] text-xl font-bold">Kuberaa</span>
            <span className="font-sans text-[#F5EFE3]/40 text-[9px] tracking-widest uppercase mt-0.5">Admin</span>
          </a>
          <div className="flex items-center gap-2 bg-[#C8A467]/10 border border-[#C8A467]/20 rounded-xl px-3 py-2">
            <Shield className="w-3.5 h-3.5 text-[#C8A467]" />
            <span className="font-sans text-[10px] font-bold text-[#C8A467] uppercase tracking-wider">Owner Panel</span>
          </div>
        </div>

        {/* Admin avatar */}
        <div className="px-6 py-5 border-b border-[#C8A467]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B08A4E] to-[#C8A467] flex items-center justify-center flex-shrink-0">
              <span className="font-sans font-bold text-sm text-[#2E1E14]">{user.avatarInitials}</span>
            </div>
            <div className="min-w-0">
              <p className="font-sans text-sm font-bold text-[#F5EFE3] truncate">{user.name}</p>
              <p className="font-sans text-[10px] text-[#C8A467]/70 truncate uppercase tracking-wider">Administrator</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {SIDEBAR_ITEMS.map(item => {
            const Icon = item.icon;
            const active = (item.id === "customers" && currentTab === "customer-detail") || activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSelectedCustomer(null);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer font-sans text-xs font-medium ${
                  active
                    ? "bg-[#B08A4E] text-[#2E1E14] shadow-md"
                    : "text-[#F5EFE3]/60 hover:bg-white/5 hover:text-[#F5EFE3]"
                }`}
                id={`admin-nav-${item.id}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Refresh + Logout */}
        <div className="px-4 pb-8 border-t border-[#C8A467]/10 pt-4 space-y-1">
          <button
            onClick={loadCustomers}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#F5EFE3]/40 hover:text-[#C8A467] hover:bg-[#C8A467]/10 transition-all cursor-pointer font-sans text-xs font-medium"
            id="admin-refresh"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#F5EFE3]/40 hover:text-red-400 hover:bg-red-900/20 transition-all cursor-pointer font-sans text-xs font-medium"
            id="admin-logout"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Backdrop */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── Main Content ── */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#1a0f0a]/95 backdrop-blur-md border-b border-[#F5EFE3]/5 px-6 py-4 flex items-center gap-4" id="admin-header">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#F5EFE3]/50 hover:text-[#C8A467] transition-colors cursor-pointer" aria-label="Open sidebar">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Shield className="w-4 h-4 text-[#C8A467] flex-shrink-0" />
            <h2 className="font-sans text-sm font-bold text-[#F5EFE3] truncate">
              {currentTab === "overview" ? "Admin Overview" :
               currentTab === "customer-detail" && selectedCustomer ? `Editing: ${selectedCustomer.name}` :
               "Customer Management"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {loadingCustomers && <Loader2 className="w-4 h-4 text-[#C8A467] animate-spin" />}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B08A4E] to-[#C8A467] flex items-center justify-center">
                <span className="font-sans font-bold text-[11px] text-[#2E1E14]">{user.avatarInitials}</span>
              </div>
              <span className="font-sans text-xs text-[#F5EFE3]/60 hidden sm:block">{user.name.split(" ")[0]}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 px-6 py-8 overflow-y-auto max-w-6xl w-full mx-auto">
          {currentTab === "overview"         && <AdminOverview customers={customers} />}
          {currentTab === "customers"        && (
            <CustomerList
              customers={customers}
              onSelect={handleSelectCustomer}
              onAdd={() => setShowAddModal(true)}
            />
          )}
          {currentTab === "customer-detail" && selectedCustomer && (
            <CustomerDetail
              customer={selectedCustomer}
              onBack={handleBackToCustomers}
              onCustomerUpdated={handleCustomerUpdated}
            />
          )}
        </div>
      </main>

      {/* Add Customer Modal */}
      {showAddModal && (
        <AddCustomerModal
          onClose={() => setShowAddModal(false)}
          onCreated={loadCustomers}
        />
      )}
    </div>
  );
}
