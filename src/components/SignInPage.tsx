import React, { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type Mode = "signin" | "signup";

export default function SignInPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");

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
      window.location.hash = "#/dashboard";
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

  const fillDemo = () => {
    setSiEmail("client@kuberaa.com");
    setSiPassword("Kuberaa@2024");
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
                ? "Sign in to access your property dashboard"
                : "Register to track your property journey"}
            </p>

            {/* Mode Toggle */}
            <div className="flex rounded-xl border border-[#C8A467]/20 mt-6 overflow-hidden">
              <button
                onClick={() => { setMode("signin"); setSiError(""); }}
                className={`flex-1 py-2.5 text-[10px] tracking-widest font-sans font-bold uppercase transition-all duration-300 cursor-pointer ${
                  mode === "signin"
                    ? "bg-[#B08A4E] text-[#2E1E14]"
                    : "text-[#F5EFE3]/50 hover:text-[#F5EFE3] bg-transparent"
                }`}
                id="signin-tab"
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode("signup"); setSuError(""); }}
                className={`flex-1 py-2.5 text-[10px] tracking-widest font-sans font-bold uppercase transition-all duration-300 cursor-pointer ${
                  mode === "signup"
                    ? "bg-[#B08A4E] text-[#2E1E14]"
                    : "text-[#F5EFE3]/50 hover:text-[#F5EFE3] bg-transparent"
                }`}
                id="signup-tab"
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="px-8 py-8">

            {/* ── SIGN IN FORM ── */}
            {mode === "signin" && (
              <form onSubmit={handleSignIn} className="space-y-5" id="signin-form">

                {/* Demo credentials hint */}
                <div
                  onClick={fillDemo}
                  className="flex items-start gap-3 bg-[#C8A467]/10 border border-[#C8A467]/20 rounded-xl p-3.5 cursor-pointer hover:bg-[#C8A467]/15 transition-colors group"
                  title="Click to auto-fill"
                  id="demo-credentials-hint"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C8A467]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#C8A467] text-[9px] font-bold">✦</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-sans font-bold text-[#C8A467] tracking-wider uppercase">Demo Credentials — Click to Fill</p>
                    <p className="text-[10px] text-[#F5EFE3]/50 font-sans mt-0.5">
                      Email: <span className="text-[#F5EFE3]/80">client@kuberaa.com</span>
                    </p>
                    <p className="text-[10px] text-[#F5EFE3]/50 font-sans">
                      Password: <span className="text-[#F5EFE3]/80">Kuberaa@2024</span>
                    </p>
                  </div>
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
                  className="w-full py-4 bg-[#B08A4E] hover:bg-[#C8A467] disabled:opacity-60 text-[#2E1E14] font-bold text-[10px] tracking-widest uppercase rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans mt-2"
                  id="signin-submit"
                >
                  {siLoading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating…</>
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
