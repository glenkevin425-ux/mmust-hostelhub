import { FormEvent, useState, type ReactNode } from "react";
import { Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const STUDENT_EMAIL_DOMAIN = "@students.mmust.ac.ke";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);
    const normalizedEmail = email.trim().toLowerCase();

    if (fullName.trim().length < 2) return setMessage({ type: "error", text: "Enter your full name." });
    if (registrationNumber.trim().length < 4) return setMessage({ type: "error", text: "Enter your MMUST registration number." });
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) return setMessage({ type: "error", text: "Enter a valid student email address." });
    if (!normalizedEmail.endsWith(STUDENT_EMAIL_DOMAIN)) return setMessage({ type: "error", text: `Use your MMUST student email ending in ${STUDENT_EMAIL_DOMAIN}.` });
    if (password.length < 8) return setMessage({ type: "error", text: "Use a password with at least 8 characters." });
    if (password !== confirmPassword) return setMessage({ type: "error", text: "The passwords do not match." });

    setSubmitting(true);
    const result = await signUp(normalizedEmail, password, fullName.trim(), registrationNumber.trim().toUpperCase());
    setSubmitting(false);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
      return;
    }

    if (result.needsEmailConfirmation) {
      setMessage({ type: "success", text: "Account created. Check your MMUST student email and confirm your address before signing in." });
      return;
    }

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-bg px-5 py-12">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white"><GraduationCap size={22} /></span>
          <h1 className="mt-4 text-2xl font-bold text-brand-navy sm:text-3xl">Create your student account</h1>
          <p className="mt-2 text-sm text-subink">Use your MMUST student details to access bookings and your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2" noValidate>
          <Field label="Full Name"><input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Kevin Okello" className={inputClass} autoComplete="name" /></Field>
          <Field label="Registration Number"><input value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} placeholder="e.g. CE/1234/21" className={inputClass} /></Field>
          <div className="sm:col-span-2"><Field label="Student Email"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@students.mmust.ac.ke" className={inputClass} autoComplete="email" /></Field></div>
          <Field label="Password">
            <div className="relative"><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className={`${inputClass} pr-11`} autoComplete="new-password" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
          </Field>
          <Field label="Confirm Password"><input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat your password" className={inputClass} autoComplete="new-password" /></Field>

          <div className="sm:col-span-2">
            {message && <div className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`} role="alert">{message.text}</div>}
            <Button type="submit" fullWidth size="lg" disabled={submitting}>{submitting ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin" /> Creating account…</span> : "Create Account"}</Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-subink">Already have an account? <Link to="/login" className="font-semibold text-brand-blue hover:underline">Sign in</Link></p>
      </div>
    </div>
  );
}

const inputClass = "mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/10";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-sm font-medium text-ink">{label}{children}</label>;
}
