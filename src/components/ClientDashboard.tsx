import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, FileText, Calendar, CreditCard, Home,
  LogOut, CheckCircle2, Clock, Circle, ChevronRight,
  MapPin, User, Phone, Mail, Shield, Award,
  Building2, AlertTriangle, Menu, Loader2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { Tables } from "../lib/supabase";

// ── Types (from Supabase) ──────────────────────────────────────────────────────

type Document       = Tables["documents"];
type SiteVisit      = Tables["site_visits"];
type Payment        = Tables["payments"];
type Property       = Tables["properties"];

interface DashboardData {
  documents:  Document[];
  visits:     SiteVisit[];
  payments:   Payment[];
  properties: Property[];
}

// ── Tab definitions ────────────────────────────────────────────────────────────

type Tab = "overview" | "documents" | "visits" | "payments" | "properties";

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview",    label: "Overview",        icon: LayoutDashboard },
  { id: "documents",   label: "Docs & Progress", icon: FileText        },
  { id: "visits",      label: "Site Visits",     icon: Calendar        },
  { id: "payments",    label: "Payments",        icon: CreditCard      },
  { id: "properties",  label: "My Properties",   icon: Home            },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: string }) {
  if (status === "done")        return <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />;
  if (status === "in-progress") return <Clock        className="w-5 h-5 text-[#C8A467] flex-shrink-0 animate-pulse" />;
  return                               <Circle       className="w-5 h-5 text-[#F5EFE3]/20 flex-shrink-0" />;
}

function StatCard({ label, value, sub, accent = false }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "bg-[#B08A4E]/15 border-[#C8A467]/30" : "bg-white/5 border-[#F5EFE3]/8"}`}>
      <p className="font-sans text-[10px] tracking-widest uppercase text-[#F5EFE3]/40 mb-1">{label}</p>
      <p className={`font-serif text-3xl font-bold ${accent ? "text-[#C8A467]" : "text-[#F5EFE3]"}`}>{value}</p>
      <p className="font-sans text-[11px] text-[#F5EFE3]/40 mt-1">{sub}</p>
    </div>
  );
}

// ── Sub-sections ───────────────────────────────────────────────────────────────

function OverviewTab({ data, user }: { data: DashboardData; user: ReturnType<typeof useAuth>["user"] }) {
  if (!user) return null;
  const doneDocs = data.documents.filter(d => d.status === "done").length;
  const upcoming = data.visits.filter(v => v.status === "upcoming").length;
  const paidCount = data.payments.filter(p => p.status === "paid").length;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-[#0B3C33] to-[#06221D] rounded-2xl border border-emerald-700/30 p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#C8A467]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <p className="font-sans text-[10px] tracking-widest text-emerald-400/70 uppercase mb-1 relative">Welcome back</p>
        <h2 className="font-serif text-3xl text-[#F5EFE3] relative">{user.name}</h2>
        <p className="font-sans text-xs text-[#F5EFE3]/50 mt-1 relative">
          Member since {new Date(user.joinedAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        </p>
        <div className="flex gap-4 mt-5 relative">
          <div className="bg-[#C8A467]/10 border border-[#C8A467]/20 rounded-xl px-4 py-2">
            <p className="font-sans text-[9px] text-[#C8A467] uppercase tracking-widest">Role</p>
            <p className="font-sans text-xs text-[#F5EFE3] font-bold capitalize">{user.role}</p>
          </div>
          <div className="bg-[#C8A467]/10 border border-[#C8A467]/20 rounded-xl px-4 py-2">
            <p className="font-sans text-[9px] text-[#C8A467] uppercase tracking-widest">Client ID</p>
            <p className="font-sans text-xs text-[#F5EFE3] font-bold">{user.id.substring(0, 8).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Docs Completed"  value={`${doneDocs}/${data.documents.length}`} sub="of total stages" accent />
        <StatCard label="Properties"      value={`${data.properties.length}`}            sub="registered plot(s)" />
        <StatCard label="Site Visits"     value={`${upcoming}`}                          sub="upcoming scheduled" />
        <StatCard label="Payments Cleared" value={`${paidCount}`}                        sub="milestone(s) paid" />
      </div>

      {/* Progress bar */}
      {data.documents.length > 0 && (
        <div className="bg-white/5 border border-[#F5EFE3]/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-sans text-[10px] tracking-widest uppercase text-[#F5EFE3]/40">Overall Documentation Progress</p>
            <p className="font-sans text-xs font-bold text-[#C8A467]">{Math.round((doneDocs / data.documents.length) * 100)}%</p>
          </div>
          <div className="h-2 bg-[#F5EFE3]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B08A4E] to-[#C8A467] rounded-full transition-all duration-700"
              style={{ width: `${(doneDocs / data.documents.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-sans"><CheckCircle2 className="w-3 h-3" /> {doneDocs} Completed</span>
            <span className="flex items-center gap-1.5 text-[10px] text-[#C8A467] font-sans"><Clock className="w-3 h-3" /> {data.documents.filter(d => d.status === "in-progress").length} In Progress</span>
            <span className="flex items-center gap-1.5 text-[10px] text-[#F5EFE3]/30 font-sans"><Circle className="w-3 h-3" /> {data.documents.filter(d => d.status === "pending").length} Pending</span>
          </div>
        </div>
      )}

      {/* Quick info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-[#F5EFE3]/8 rounded-2xl p-5 flex items-center gap-3">
          <Mail className="w-5 h-5 text-[#C8A467]" />
          <div>
            <p className="font-sans text-[9px] text-[#F5EFE3]/30 uppercase tracking-widest">Email</p>
            <p className="font-sans text-xs text-[#F5EFE3]">{user.email}</p>
          </div>
        </div>
        <div className="bg-white/5 border border-[#F5EFE3]/8 rounded-2xl p-5 flex items-center gap-3">
          <Phone className="w-5 h-5 text-[#C8A467]" />
          <div>
            <p className="font-sans text-[9px] text-[#F5EFE3]/30 uppercase tracking-widest">Phone</p>
            <p className="font-sans text-xs text-[#F5EFE3]">{user.phone}</p>
          </div>
        </div>
        <div className="bg-white/5 border border-[#F5EFE3]/8 rounded-2xl p-5 flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#C8A467]" />
          <div>
            <p className="font-sans text-[9px] text-[#F5EFE3]/30 uppercase tracking-widest">Account Status</p>
            <p className="font-sans text-xs text-emerald-400 font-bold">Active & Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsTab({ documents }: { documents: Document[] }) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <p className="font-sans text-[10px] tracking-widest uppercase text-[#F5EFE3]/40 mb-1">Live Status</p>
        <h3 className="font-serif text-2xl text-[#F5EFE3]">Documentation Progress Tracker</h3>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-10 h-10 text-[#F5EFE3]/20 mx-auto mb-3" />
          <p className="font-sans text-sm text-[#F5EFE3]/30">No documents yet. Your Kuberaa team will update this soon.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-[22px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-emerald-500/40 via-[#C8A467]/30 to-[#F5EFE3]/5" />
          <div className="space-y-4">
            {documents.map((doc, idx) => (
              <div
                key={doc.id}
                className={`relative flex items-start gap-5 rounded-2xl border p-5 transition-all duration-300 ${
                  doc.status === "done"        ? "bg-emerald-950/30 border-emerald-700/25" :
                  doc.status === "in-progress" ? "bg-[#C8A467]/10 border-[#C8A467]/30 shadow-lg shadow-[#C8A467]/5" :
                                                "bg-white/3 border-[#F5EFE3]/5 opacity-60"
                }`}
              >
                <div className={`relative z-10 flex items-center justify-center w-11 h-11 rounded-full border-2 flex-shrink-0 ${
                  doc.status === "done"        ? "bg-emerald-900/50 border-emerald-500/50" :
                  doc.status === "in-progress" ? "bg-[#C8A467]/20 border-[#C8A467]/60" :
                                                "bg-[#241811] border-[#F5EFE3]/10"
                }`}>
                  {doc.status === "done"        ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
                   doc.status === "in-progress" ? <Clock        className="w-5 h-5 text-[#C8A467] animate-pulse" /> :
                                                  <span className="font-sans text-xs text-[#F5EFE3]/30 font-bold">{idx + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className={`font-sans text-sm font-bold ${
                        doc.status === "done" ? "text-emerald-300" :
                        doc.status === "in-progress" ? "text-[#C8A467]" : "text-[#F5EFE3]/40"
                      }`}>{doc.title}</p>
                      <p className="font-sans text-[11px] text-[#F5EFE3]/50 mt-0.5 leading-relaxed">{doc.subtitle}</p>
                      {doc.date && (
                        <p className="font-sans text-[10px] text-[#F5EFE3]/30 mt-1.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(doc.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      )}
                    </div>
                    {doc.badge && (
                      <span className={`text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg border font-sans flex-shrink-0 ${
                        doc.status === "done"        ? "bg-emerald-900/40 border-emerald-600/30 text-emerald-400" :
                        doc.status === "in-progress" ? "bg-[#C8A467]/15 border-[#C8A467]/30 text-[#C8A467]" :
                                                      "bg-[#F5EFE3]/5 border-[#F5EFE3]/10 text-[#F5EFE3]/30"
                      }`}>
                        {doc.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-6 pt-4 border-t border-[#F5EFE3]/5">
        <span className="flex items-center gap-2 text-[10px] text-emerald-400 font-sans"><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>
        <span className="flex items-center gap-2 text-[10px] text-[#C8A467] font-sans"><Clock className="w-3.5 h-3.5" /> In Progress</span>
        <span className="flex items-center gap-2 text-[10px] text-[#F5EFE3]/30 font-sans"><Circle className="w-3.5 h-3.5" /> Pending</span>
      </div>
    </div>
  );
}

function renderVisitCard(visit: SiteVisit) {
  return (
    <div key={visit.id} className={`rounded-2xl border p-5 ${
      visit.status === "upcoming"  ? "bg-[#C8A467]/10 border-[#C8A467]/30" :
      visit.status === "completed" ? "bg-emerald-950/20 border-emerald-700/20" :
                                    "bg-white/3 border-[#F5EFE3]/5 opacity-60"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="font-sans text-sm font-bold text-[#F5EFE3]">{visit.property}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin className="w-3 h-3 text-[#C8A467]" />
            <p className="font-sans text-[11px] text-[#F5EFE3]/50">{visit.location}</p>
          </div>
        </div>
        <span className={`text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg border font-sans flex-shrink-0 ${
          visit.status === "upcoming"  ? "bg-[#C8A467]/15 border-[#C8A467]/30 text-[#C8A467]" :
          visit.status === "completed" ? "bg-emerald-900/40 border-emerald-600/30 text-emerald-400" :
                                        "bg-red-900/30 border-red-600/30 text-red-400"
        }`}>
          {visit.status}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-4 text-[11px] font-sans text-[#F5EFE3]/50">
        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#C8A467]" />
          {visit.date ? new Date(visit.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "TBD"}
        </span>
        {visit.time && <><span>·</span><span>{visit.time}</span></>}
        {visit.consultant && <><span>·</span><span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#C8A467]" />{visit.consultant}</span></>}
      </div>
    </div>
  );
}

function VisitsTab({ visits }: { visits: SiteVisit[] }) {
  const upcoming  = visits.filter(v => v.status === "upcoming");
  const completed = visits.filter(v => v.status === "completed");


  return (
    <div className="space-y-8">
      {visits.length === 0 && (
        <div className="text-center py-16">
          <Calendar className="w-10 h-10 text-[#F5EFE3]/20 mx-auto mb-3" />
          <p className="font-sans text-sm text-[#F5EFE3]/30">No site visits scheduled yet.</p>
        </div>
      )}
      {upcoming.length > 0 && (
        <div>
          <p className="font-sans text-[10px] tracking-widest uppercase text-[#C8A467] mb-4 font-bold">Upcoming Visits</p>
          <div className="space-y-3">{upcoming.map(v => renderVisitCard(v))}</div>
        </div>
      )}
      {completed.length > 0 && (
        <div>
          <p className="font-sans text-[10px] tracking-widest uppercase text-emerald-400/70 mb-4 font-bold">Completed Visits</p>
          <div className="space-y-3">{completed.map(v => renderVisitCard(v))}</div>
        </div>
      )}
    </div>
  );
}

function PaymentsTab({ payments }: { payments: Payment[] }) {
  const totalPaid = payments.filter(p => p.status === "paid").length;
  const totalDue  = payments.filter(p => p.status === "due").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-950/30 border border-emerald-700/25 rounded-2xl p-5">
          <p className="font-sans text-[10px] uppercase tracking-widest text-emerald-400/60 mb-1">Cleared</p>
          <p className="font-serif text-2xl text-emerald-400 font-bold">{totalPaid}</p>
          <p className="font-sans text-[11px] text-[#F5EFE3]/30">payment milestone(s)</p>
        </div>
        <div className="bg-[#C8A467]/10 border border-[#C8A467]/30 rounded-2xl p-5">
          <p className="font-sans text-[10px] uppercase tracking-widest text-[#C8A467]/60 mb-1">Pending</p>
          <p className="font-serif text-2xl text-[#C8A467] font-bold">{totalDue}</p>
          <p className="font-sans text-[11px] text-[#F5EFE3]/30">payment milestone(s)</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-12">
          <CreditCard className="w-10 h-10 text-[#F5EFE3]/20 mx-auto mb-3" />
          <p className="font-sans text-sm text-[#F5EFE3]/30">No payment milestones yet.</p>
        </div>
      ) : (
        <div className="bg-white/3 border border-[#F5EFE3]/8 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 px-5 py-3 border-b border-[#F5EFE3]/5">
            <span className="col-span-4 font-sans text-[9px] uppercase tracking-widest text-[#F5EFE3]/30">Milestone</span>
            <span className="col-span-3 font-sans text-[9px] uppercase tracking-widest text-[#F5EFE3]/30">Amount</span>
            <span className="col-span-3 font-sans text-[9px] uppercase tracking-widest text-[#F5EFE3]/30 hidden sm:block">Date</span>
            <span className="col-span-2 font-sans text-[9px] uppercase tracking-widest text-[#F5EFE3]/30">Status</span>
          </div>
          {payments.map((pay, i) => (
            <div
              key={pay.id}
              className={`grid grid-cols-12 px-5 py-4 items-center ${i !== payments.length - 1 ? "border-b border-[#F5EFE3]/5" : ""} hover:bg-white/3 transition-colors`}
            >
              <div className="col-span-4">
                <p className="font-sans text-xs text-[#F5EFE3] font-medium">{pay.label}</p>
                <p className="font-sans text-[10px] text-[#F5EFE3]/30 mt-0.5">{pay.mode}</p>
              </div>
              <p className="col-span-3 font-sans text-xs font-bold text-[#F5EFE3]">{pay.amount}</p>
              <p className="col-span-3 font-sans text-[11px] text-[#F5EFE3]/50 hidden sm:block">{pay.date}</p>
              <div className="col-span-2">
                <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-1 rounded-lg border font-sans ${
                  pay.status === "paid"    ? "bg-emerald-900/40 border-emerald-600/30 text-emerald-400" :
                  pay.status === "due"     ? "bg-[#C8A467]/15 border-[#C8A467]/30 text-[#C8A467]" :
                                            "bg-red-900/30 border-red-600/30 text-red-400"
                }`}>
                  {pay.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="font-sans text-[10px] text-[#F5EFE3]/25 text-center tracking-wider">
        All payment records are for reference only. Contact Kuberaa office for official receipts.
      </p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-sans text-[9px] text-[#F5EFE3]/30 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="font-sans text-xs text-[#F5EFE3] font-medium">{value}</p>
    </div>
  );
}

function PropertiesTab({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <Home className="w-10 h-10 text-[#F5EFE3]/20 mx-auto mb-3" />
        <p className="font-sans text-sm text-[#F5EFE3]/30">No properties registered yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {properties.map(prop => (
        <div key={prop.id} className="bg-white/3 border border-[#F5EFE3]/8 rounded-2xl overflow-hidden">
          {prop.image_url && (
            <div className="h-52 overflow-hidden relative">
              <img src={prop.image_url} alt={prop.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-sans text-[9px] font-bold tracking-widest uppercase bg-[#B08A4E] text-[#2E1E14] px-2.5 py-1 rounded-lg">
                  {prop.tag}
                </span>
                <p className="font-serif text-xl text-[#F5EFE3] mt-1.5">{prop.name}</p>
              </div>
            </div>
          )}
          {!prop.image_url && (
            <div className="h-20 bg-gradient-to-r from-[#2E1E14] to-[#1a0f0a] flex items-center px-6 gap-3">
              <span className="font-sans text-[9px] font-bold tracking-widest uppercase bg-[#B08A4E] text-[#2E1E14] px-2.5 py-1 rounded-lg">{prop.tag}</span>
              <p className="font-serif text-lg text-[#F5EFE3]">{prop.name}</p>
            </div>
          )}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-4">
              <Detail label="Plot Number"    value={prop.plot_number} />
              <Detail label="Plot Area"      value={prop.area} />
              <Detail label="Location"       value={prop.location} />
              <Detail label="Purchase Price" value={prop.purchase_price} />
            </div>
            <div className="space-y-4">
              <Detail label="Purchase Date"  value={prop.purchase_date} />
              <div>
                <p className="font-sans text-[9px] text-[#F5EFE3]/30 uppercase tracking-widest mb-1">DTCP Reference</p>
                <p className="font-mono text-xs text-[#C8A467] bg-[#C8A467]/10 px-2.5 py-1 rounded-lg inline-block">{prop.dtcp_ref}</p>
              </div>
              <div>
                <p className="font-sans text-[9px] text-[#F5EFE3]/30 uppercase tracking-widest mb-1">TNRERA Reference</p>
                <p className="font-mono text-xs text-[#C8A467] bg-[#C8A467]/10 px-2.5 py-1 rounded-lg inline-block">{prop.tnera_ref}</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-[#F5EFE3]/5 flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-sans">
              <Shield className="w-3.5 h-3.5" /> DTCP Sanctioned
            </div>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-sans">
              <Award className="w-3.5 h-3.5" /> TNRERA Registered
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab]   = useState<Tab>("overview");
  const [data, setData]             = useState<DashboardData | null>(null);
  const [loading, setLoading]       = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      window.location.hash = "#/signin";
      return;
    }
    // Admin should be on admin panel
    if (user.role === "admin") {
      window.location.hash = "#/admin";
      return;
    }
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    const [docsRes, visitsRes, paymentsRes, propsRes] = await Promise.all([
      supabase.from("documents").select("*").eq("user_id", user.id).order("sort_order"),
      supabase.from("site_visits").select("*").eq("user_id", user.id).order("date", { ascending: false }),
      supabase.from("payments").select("*").eq("user_id", user.id).order("sort_order"),
      supabase.from("properties").select("*").eq("user_id", user.id),
    ]);
    setData({
      documents:  (docsRes.data   as Document[])  || [],
      visits:     (visitsRes.data  as SiteVisit[]) || [],
      payments:   (paymentsRes.data as Payment[])  || [],
      properties: (propsRes.data   as Property[])  || [],
    });
    setLoading(false);
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a0f0a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#C8A467] animate-spin mx-auto mb-4" />
          <p className="font-sans text-[#F5EFE3]/40 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const TabIcon = TABS.find(t => t.id === activeTab)?.icon || LayoutDashboard;

  return (
    <div className="min-h-screen bg-[#1a0f0a] flex" id="client-dashboard">

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#2E1E14] border-r border-[#C8A467]/15 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="dashboard-sidebar"
      >
        {/* Brand */}
        <div className="px-6 pt-8 pb-6 border-b border-[#C8A467]/10">
          <a href="#/" className="flex items-center gap-2">
            <span className="font-serif text-[#C8A467] text-xl font-bold">Kuberaa</span>
            <span className="font-sans text-[#F5EFE3]/40 text-[9px] tracking-widest uppercase mt-0.5">Portal</span>
          </a>
        </div>

        {/* Avatar */}
        <div className="px-6 py-6 border-b border-[#C8A467]/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#B08A4E] to-[#C8A467] flex items-center justify-center flex-shrink-0">
              <span className="font-sans font-bold text-sm text-[#2E1E14]">{user.avatarInitials}</span>
            </div>
            <div className="min-w-0">
              <p className="font-sans text-sm font-bold text-[#F5EFE3] truncate">{user.name}</p>
              <p className="font-sans text-[10px] text-[#F5EFE3]/40 truncate capitalize">{user.role} · Active</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer font-sans text-xs font-medium ${
                  active
                    ? "bg-[#B08A4E] text-[#2E1E14] shadow-md"
                    : "text-[#F5EFE3]/60 hover:bg-white/5 hover:text-[#F5EFE3]"
                }`}
                id={`tab-${tab.id}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 pb-8 border-t border-[#C8A467]/10 pt-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#F5EFE3]/40 hover:text-red-400 hover:bg-red-900/20 transition-all cursor-pointer font-sans text-xs font-medium"
            id="dashboard-logout"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#1a0f0a]/95 backdrop-blur-md border-b border-[#F5EFE3]/5 px-6 py-4 flex items-center gap-4" id="dashboard-header">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#F5EFE3]/50 hover:text-[#C8A467] transition-colors cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <TabIcon className="w-4 h-4 text-[#C8A467] flex-shrink-0" />
            <h2 className="font-sans text-sm font-bold text-[#F5EFE3] truncate">
              {TABS.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B08A4E] to-[#C8A467] flex items-center justify-center">
              <span className="font-sans font-bold text-[11px] text-[#2E1E14]">{user.avatarInitials}</span>
            </div>
            <span className="font-sans text-xs text-[#F5EFE3]/60 hidden sm:block">{user.name.split(" ")[0]}</span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 px-6 py-8 overflow-y-auto max-w-5xl w-full mx-auto">
          {activeTab === "overview"    && <OverviewTab    data={data} user={user} />}
          {activeTab === "documents"   && <DocumentsTab   documents={data.documents} />}
          {activeTab === "visits"      && <VisitsTab      visits={data.visits} />}
          {activeTab === "payments"    && <PaymentsTab    payments={data.payments} />}
          {activeTab === "properties"  && <PropertiesTab  properties={data.properties} />}
        </div>
      </main>
    </div>
  );
}
