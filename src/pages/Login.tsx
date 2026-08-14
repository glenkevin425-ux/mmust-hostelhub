import { FormEvent, useState } from "react";
import { GraduationCap, Eye, EyeOff, Loader2, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const from = (location.state as { from?: string } | null)?.from || "/dashboard";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setMessage({ type: "error", text: "Enter a valid email address." });
      return;
    }
    if (password.length < 6) {
      setMessage({ type: "error", text: "Your password must contain at least 6 characters." });
      return;
    }

    setSubmitting(true);
    const result = await signIn(normalizedEmail, password);
    setSubmitting(false);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
      return;
    }

    if (!remember) sessionStorage.setItem("mmust-session-preference", "session");
    navigate(from, { replace: true });
  };

  const handleForgotPassword = async () => {
    setMessage(null);
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setMessage({ type: "error", text: "Enter your email first, then tap Forgot password." });
      return;
    }

    setSubmitting(true);
    const result = await resetPassword(normalizedEmail);
    setSubmitting(false);
    setMessage(result.error
      ? { type: "error", text: result.error }
      : { type: "success", text: "If an account exists for that email, a password-reset link has been sent." });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-bg px-5 py-12 sm:py-16">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden bg-brand-navy p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue"><GraduationCap size={24} /></span>
            <h2 className="mt-8 text-3xl font-bold tracking-tight">Your hostel search, securely connected.</h2>
            <p className="mt-4 leading-7 text-slate-300">Sign in to manage bookings, saved hostels and your accommodation profile.</p>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="flex items-center gap-2"><ShieldCheck size={17} /> Secure session management</p>
            <p className="flex items-center gap-2"><LockKeyhole size={17} /> Passwords are handled by the authentication provider</p>
          </div>
        </aside>

        <main className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">
            <div className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white lg:hidden"><GraduationCap size={22} /></span>
              <h1 className="mt-4 text-2xl font-bold text-brand-navy sm:text-3xl">Welcome back.</h1>
              <p className="mt-2 text-sm text-subink">Sign in to manage your hostel bookings.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-ink">Email</label>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@gmail.com" className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/10" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-ink">Password</label>
                  <button type="button" onClick={handleForgotPassword} className="text-sm font-semibold text-brand-blue hover:underline">Forgot password?</button>
                </div>
                <div className="relative mt-1.5">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-11 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/10" />
                  <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-ink">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-brand-blue" />
                Keep me signed in on this device
              </label>

              {message && (
                <div className={`rounded-xl px-4 py-3 text-sm font-medium ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`} role="alert">
                  {message.text}
                </div>
              )}

              <Button type="submit" fullWidth size="lg" disabled={submitting}>
                {submitting ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin" /> Signing in…</span> : "Sign In"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-subink">
              New to MMUST HostelHub? <Link to="/register" className="font-semibold text-brand-blue hover:underline">Create an account</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
