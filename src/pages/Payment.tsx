import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Copy, CreditCard, ShieldCheck } from "lucide-react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

const PAYBILL = "000000";
const AMOUNT = 5500;

export default function Payment() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const { user } = useAuth();
  const [transactionCode, setTransactionCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const cleanRef = useMemo(() => ref?.trim() || "", [ref]);

  if (!cleanRef) return <Navigate to="/dashboard" replace />;

  const copyPaybill = async () => {
    try {
      await navigator.clipboard.writeText(PAYBILL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const submitPayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const code = transactionCode.trim().toUpperCase();
    if (code.length < 6 || !user || !supabase) return;

    setSaving(true);
    const { error: insertError } = await supabase.from("payments").insert({
      user_id: user.id,
      booking_reference: cleanRef,
      amount: AMOUNT,
      transaction_code: code,
      status: "pending",
    });
    setSaving(false);

    if (insertError) {
      setError("We couldn't submit the transaction code. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-bg px-5 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">
        <Link to="/dashboard" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-subink hover:text-brand-blue"><ArrowLeft size={17} /> Back to dashboard</Link>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
          <div className="bg-brand-navy px-6 py-7 text-white sm:px-8"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"><CreditCard size={22} /></span><div><p className="text-sm text-white/70">HostelHub Payment</p><h1 className="text-2xl font-bold">Complete your payment</h1></div></div></div>
          <div className="p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-brand-light p-4"><p className="text-xs font-medium text-subink">Amount due</p><p className="mt-1 text-2xl font-bold text-brand-navy">KSh {AMOUNT.toLocaleString()}</p><p className="text-xs text-subink">Per semester</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-medium text-subink">Booking reference</p><p className="mt-1 break-all font-mono text-lg font-bold text-brand-navy">{cleanRef}</p></div></div>
            <div className="mt-7 rounded-2xl border border-slate-200 p-5"><p className="text-sm font-bold text-brand-navy">Pay via M-Pesa</p><ol className="mt-4 space-y-3 text-sm text-subink"><li><span className="font-bold text-brand-navy">1.</span> Open M-Pesa and select <strong>Lipa na M-Pesa</strong>.</li><li><span className="font-bold text-brand-navy">2.</span> Select <strong>Pay Bill</strong>.</li><li><span className="font-bold text-brand-navy">3.</span> Enter the HostelHub Paybill number below.</li><li><span className="font-bold text-brand-navy">4.</span> Use your booking reference as the account/reference.</li><li><span className="font-bold text-brand-navy">5.</span> Pay <strong>KSh {AMOUNT.toLocaleString()}</strong> and keep the M-Pesa confirmation message.</li></ol><div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4"><div><p className="text-xs text-subink">Paybill number</p><p className="font-mono text-2xl font-bold tracking-wider text-brand-navy">{PAYBILL}</p></div><button type="button" onClick={copyPaybill} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-brand-navy hover:bg-slate-100"><Copy size={15} /> {copied ? "Copied" : "Copy"}</button></div><p className="mt-2 text-xs text-amber-700">The Paybill shown is a temporary placeholder and will be updated before launch.</p></div>
            {submitted ? <div className="mt-7 rounded-2xl bg-emerald-50 p-5 text-center"><CheckCircle2 className="mx-auto text-emerald-600" size={30}/><h2 className="mt-2 font-bold text-emerald-800">Payment submitted for verification</h2><p className="mt-1 text-sm text-emerald-700">Your transaction code has been recorded for booking <strong>{cleanRef}</strong>. Your payment remains pending until it is verified.</p><Link to="/dashboard" className="mt-4 inline-block"><Button variant="outline">Return to Dashboard</Button></Link></div> : <form onSubmit={submitPayment} className="mt-7"><label className="block text-sm font-semibold text-ink" htmlFor="transaction-code">M-Pesa transaction code</label><input id="transaction-code" value={transactionCode} onChange={e=>setTransactionCode(e.target.value.toUpperCase())} placeholder="e.g. QWE123ABC4" maxLength={20} required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm uppercase focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/10"/>{error&&<p className="mt-2 text-sm font-medium text-red-600">{error}</p>}<p className="mt-2 text-xs text-subink">Enter the transaction code exactly as shown in your M-Pesa confirmation message.</p><Button type="submit" fullWidth size="lg" className="mt-5" disabled={saving}>{saving?"Submitting...":"Submit Payment for Verification"}</Button></form>}
            <div className="mt-6 flex gap-3 rounded-xl bg-slate-50 p-4 text-xs text-subink"><ShieldCheck size={18} className="shrink-0 text-emerald-600"/><p>Submitting a transaction code does not automatically confirm your booking. Payments are subject to verification.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
