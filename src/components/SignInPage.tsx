import React, { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, Shield, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type Mode = "signin" | "signup";
type LoginRole = "customer" | "admin";

export default function SignInPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [loginRole, setLoginRole] = useState<LoginRole>("customer");

  // Sign-in state
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siShowPw, setSiShowPw] = useState(false);
  const [siError, setSiError] = useState("");
  const [siLoading, setSiLoading] = useState(false);

  // Sign-up state
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm, setSuConfirm] = useState("");
  const [suShowPw, setSuShowPw] = useState(false);
  const [suError, setSuError] = useState("");
  const [suLoading, setSuLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSiError("");
    setSiLoading(true);
    const result = await login(siEmail.trim(), siPassword);
    setSiLoading(false);
    if (result.success) {
      // Route based on actual role from DB
      if (result.role === "admin") {
        window.location.hash = "#/admin";
      } else {
        window.location.hash = "#/dashboard";
      }
    } else {
      setSiError(result.error || "Login failed.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuError("");
    if (suPassword !== suConfirm) {
      setSuError("Passwords do not match.");
      return;
    }
    if (suPassword.length < 8) {
      setSuError("Password must be at least 8 characters.");
      return;
    }
    setSuLoading(true);
    const result = await register(suName.trim(), suEmail.trim(), suPassword, suPhone.trim());
    setSuLoading(false);
    if (result.success) {
      window.location.hash = "#/dashboard";
    } else {
      setSuError(result.error || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EBDD] pt-20 flex items-center justify-center px-4 py-12" id="signin-page">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-[#2E1E14] rounded-3xl border border-[#C8A467]/20 shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-br from-[#2E1E14] to-[#1a0f0a] px-8 pt-10 pb-6 text-center border-b border-[#C8A467]/10">
            {/* Logo mark */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#B08A4E]/20 border border-[#C8A467]/30 mb-5">
              <span className="font-serif text-[#C8A467] text-xl font-bold">K</span>
            </div>
            <h1 className="font-serif text-3xl text-[#F5EFE3] mb-1">
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="font-sans text-[11px] text-[#F5EFE3]/50 tracking-wider">
              {mode === "signin"
                ? "Sign in to access your portal"
                : "Register to track your property journey"}
            </p>

            {/* ── Role Selector (only on signin) ── */}
            {mode === "signin" && (
              <div className="mt-6 p-1 bg-[#1a0f0a]/60 rounded-2xl border border-[#C8A467]/15">
                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() => { setLoginRole("customer"); setSiError(""); }}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer font-sans ${
                      loginRole === "customer"
                        ? "bg-[#B08A4E] text-[#2E1E14] shadow-lg shadow-[#B08A4E]/30"
                        : "text-[#F5EFE3]/40 hover:text-[#F5EFE3]/70"
                    }`}
                    id="role-customer"
                  >
                    <Users className="w-3.5 h-3.5" />
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLoginRole("admin"); setSiError(""); }}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer font-sans ${
                      loginRole === "admin"
                        ? "bg-[#B08A4E] text-[#2E1E14] shadow-lg shadow-[#B08A4E]/30"
                        : "text-[#F5EFE3]/40 hover:text-[#F5EFE3]/70"
                    }`}
                    id="role-admin"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin / Owner
                  </button>
                </div>
              </div>
            )}

            {/* ── Mode Toggle (Sign In / Sign Up) ── */}
            {mode === "signin" && loginRole === "customer" && (
              <div className="flex rounded-xl border border-[#C8A467]/20 mt-5 overflow-hidden">
                <button
                  onClick={() => { setMode("signin"); setSiError(""); }}
                  className="flex-1 py-2.5 text-[10px] tracking-widest font-sans font-bold uppercase bg-[#B08A4E] text-[#2E1E14] cursor-pointer"
                  id="signin-tab"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setMode("signup"); setSuError(""); }}
                  className="flex-1 py-2.5 text-[10px] tracking-widest font-sans font-bold uppercase text-[#F5EFE3]/50 hover:text-[#F5EFE3] bg-transparent transition-all duration-300 cursor-pointer"
                  id="signup-tab"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Admin badge */}
            {mode === "signin" && loginRole === "admin" && (
              <div className="mt-5 flex items-center justify-center gap-2 bg-[#C8A467]/10 border border-[#C8A467]/30 rounded-xl py-2.5 px-4">
                <Shield className="w-3.5 h-3.5 text-[#C8A467]" />
                <span className="font-sans text-[10px] font-bold tracking-wider text-[#C8A467] uppercase">
                  Kuberaa Admin Portal — Owner Access
                </span>
              </div>
            )}

            {/* Mode Toggle when in signup */}
            {mode === "signup" && (
              <div className="flex rounded-xl border border-[#C8A467]/20 mt-5 overflow-hidden">
                <button
                  onClick={() => { setMode("signin"); setSiError(""); }}
                  className="flex-1 py-2.5 text-[10px] tracking-widest font-sans font-bold uppercase text-[#F5EFE3]/50 hover:text-[#F5EFE3] bg-transparent transition-all duration-300 cursor-pointer"
                  id="signin-tab-from-signup"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setMode("signup"); setSuError(""); }}
                  className="flex-1 py-2.5 text-[10px] tracking-widest font-sans font-bold uppercase bg-[#B08A4E] text-[#2E1E14] cursor-pointer"
                  id="signup-tab-active"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <div className="px-8 py-8">

            {/* ── SIGN IN FORM ── */}
            {mode === "signin" && (
              <form onSubmit={handleSignIn} className="space-y-5" id="signin-form">

                {/* Context-aware hint */}
                <div className={`rounded-xl p-3.5 border ${
                  loginRole === "admin"
                    ? "bg-[#C8A467]/10 border-[#C8A467]/25"
                    : "bg-white/3 border-[#F5EFE3]/8"
                }`}>
                  <p className="text-[10px] font-sans text-[#F5EFE3]/50 leading-relaxed">
                    {loginRole === "admin"
                      ? "🔒 Admin access grants full control over all customer records. Use your registered admin credentials."
                      : "Enter your registered email and password to access your property dashboard."}
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#B08A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={siEmail}
                      onChange={e => setSiEmail(e.target.value)}
                      className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-xl pl-10 pr-4 py-3.5 outline-none transition-all placeholder:text-[#F5EFE3]/20"
                      id="signin-email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#B08A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={siShowPw ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={siPassword}
                      onChange={e => setSiPassword(e.target.value)}
                      className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-xl pl-10 pr-12 py-3.5 outline-none transition-all placeholder:text-[#F5EFE3]/20"
                      id="signin-password"
                    />
                    <button
                      type="button"
                      onClick={() => setSiShowPw(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B08A4E] hover:text-[#C8A467] transition-colors cursor-pointer"
                    >
                      {siShowPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {siError && (
                  <div className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 rounded-xl px-3.5 py-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="text-[11px] text-red-300 font-sans">{siError}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={siLoading}
                  className={`w-full py-4 disabled:opacity-60 text-[#2E1E14] font-bold text-[10px] tracking-widest uppercase rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans mt-2 ${
                    loginRole === "admin"
                      ? "bg-gradient-to-r from-[#B08A4E] to-[#C8A467] hover:from-[#C8A467] hover:to-[#D4B07A]"
                      : "bg-[#B08A4E] hover:bg-[#C8A467]"
                  }`}
                  id="signin-submit"
                >
                  {siLoading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating…</>
                  ) : loginRole === "admin" ? (
                    <><Shield className="w-3.5 h-3.5" /><span>Access Admin Panel</span><ArrowRight className="w-3.5 h-3.5" /></>
                  ) : (
                    <><span>Sign In to Dashboard</span><ArrowRight className="w-3.5 h-3.5" /></>
                  )}
                </button>
              </form>
            )}

            {/* ── SIGN UP FORM ── */}
            {mode === "signup" && (
              <form onSubmit={handleSignUp} className="space-y-4" id="signup-form">

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#B08A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={suName}
                      onChange={e => setSuName(e.target.value)}
                      className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-xl pl-10 pr-4 py-3.5 outline-none transition-all placeholder:text-[#F5EFE3]/20"
                      id="signup-name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#B08A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={suEmail}
                      onChange={e => setSuEmail(e.target.value)}
                      className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-xl pl-10 pr-4 py-3.5 outline-none transition-all placeholder:text-[#F5EFE3]/20"
                      id="signup-email"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#B08A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={suPhone}
                      onChange={e => setSuPhone(e.target.value)}
                      className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-xl pl-10 pr-4 py-3.5 outline-none transition-all placeholder:text-[#F5EFE3]/20"
                      id="signup-phone"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#B08A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={suShowPw ? "text" : "password"}
                      required
                      placeholder="Min. 8 characters"
                      value={suPassword}
                      onChange={e => setSuPassword(e.target.value)}
                      className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-xl pl-10 pr-12 py-3.5 outline-none transition-all placeholder:text-[#F5EFE3]/20"
                      id="signup-password"
                    />
                    <button
                      type="button"
                      onClick={() => setSuShowPw(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B08A4E] hover:text-[#C8A467] cursor-pointer"
                    >
                      {suShowPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-[10px] tracking-wider uppercase font-bold text-[#C8A467]">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#B08A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="Re-enter password"
                      value={suConfirm}
                      onChange={e => setSuConfirm(e.target.value)}
                      className="w-full bg-[#241811] border border-[#C8A467]/20 focus:border-[#C8A467] text-[#F5EFE3] text-xs font-sans rounded-xl pl-10 pr-4 py-3.5 outline-none transition-all placeholder:text-[#F5EFE3]/20"
                      id="signup-confirm"
                    />
                  </div>
                </div>

                {/* Error */}
                {suError && (
                  <div className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 rounded-xl px-3.5 py-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="text-[11px] text-red-300 font-sans">{suError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={suLoading}
                  className="w-full py-4 bg-[#B08A4E] hover:bg-[#C8A467] disabled:opacity-60 text-[#2E1E14] font-bold text-[10px] tracking-widest uppercase rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans mt-1"
                  id="signup-submit"
                >
                  {suLoading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account…</>
                  ) : (
                    <><span>Create My Account</span><ArrowRight className="w-3.5 h-3.5" /></>
                  )}
                </button>
              </form>
            )}

            {/* Footer note */}
            <p className="text-[9px] text-center text-[#F5EFE3]/25 font-sans mt-6 tracking-wider uppercase">
              Kuberaa Properties Client Portal · TNRERA Compliant
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="#/"
            className="text-[10px] font-sans tracking-widest text-[#241811]/50 hover:text-[#B08A4E] uppercase transition-colors"
          >
            ← Back to Kuberaa Properties
          </a>
        </div>
      </div>
    </div>
  );
}
