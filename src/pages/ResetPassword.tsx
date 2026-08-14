import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole, Loader2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { user, loading, updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      setMessage({ type: "error", text: "This password-reset link is invalid or has expired. Request a new one from the sign-in page." });
    }
  }, [loading, user]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);
    if (password.length < 8) return setMessage({ type: "error", text: "Use a password with at least 8 characters." });
    if (password !== confirmPassword) return setMessage({ type: "error", text: "The passwords do not match." });

    setSubmitting(true);
    const result = await updatePassword(password);
    setSubmitting(false);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
      return;
    }
    setMessage({ type: "success", text: "Your password has been updated. Redirecting to your dashboard…" });
    setTimeout(() => navigate("/dashboard", { replace: true }), 1200);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-bg px-5 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white"><LockKeyhole size={22} /></span>
          <h1 className="mt-4 text-2xl font-bold text-brand-navy sm:text-3xl">Set a new password</h1>
          <p className="mt-2 text-sm text-subink">Choose a new password for your MMUST HostelHub account.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-ink">New password</label>
            <input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/10" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-ink">Confirm password</label>
            <input id="confirmPassword" type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat your password" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/10" />
          </div>

          {message && <div className={`rounded-xl px-4 py-3 text-sm font-medium ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`} role="alert">{message.text}</div>}

          <Button type="submit" fullWidth size="lg" disabled={submitting || loading || !user}>
            {submitting ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin" /> Updating password…</span> : "Update Password"}
          </Button>
        </form>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-subink"><ShieldCheck size={15} /> Your password is securely handled by Supabase Auth.</p>
      </div>
    </div>
  );
}
