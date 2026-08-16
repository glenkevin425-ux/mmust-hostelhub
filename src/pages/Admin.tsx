import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { CheckCircle2, Clock3, CreditCard, RefreshCw, ShieldAlert, XCircle } from "lucide-react";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

type PaymentStatus = "pending" | "verified" | "rejected";
interface Payment { id:string; user_id:string; booking_reference:string; amount:number; transaction_code:string; status:PaymentStatus; created_at:string; }

export default function Admin(){
  const { user, loading } = useAuth();
  const isAdmin = user?.app_metadata?.role === "admin";
  const [payments,setPayments]=useState<Payment[]>([]);
  const [loadingPayments,setLoadingPayments]=useState(false);
  const [error,setError]=useState("");
  const [filter,setFilter]=useState<"all"|PaymentStatus>("all");
  const [updating,setUpdating]=useState<string|null>(null);

  const loadPayments=useCallback(async()=>{
    if(!supabase||!isAdmin)return;
    setLoadingPayments(true); setError("");
    const {data,error:queryError}=await supabase.from("payments").select("id,user_id,booking_reference,amount,transaction_code,status,created_at").order("created_at",{ascending:false});
    if(queryError){setError(queryError.message);setPayments([]);} else setPayments((data||[]) as Payment[]);
    setLoadingPayments(false);
  },[isAdmin]);

  useEffect(()=>{loadPayments();},[loadPayments]);

  const updateStatus=async(id:string,status:PaymentStatus)=>{
    if(!supabase)return;
    setUpdating(id); setError("");
    const {error:updateError}=await supabase.from("payments").update({status}).eq("id",id);
    if(updateError)setError(updateError.message); else setPayments(items=>items.map(item=>item.id===id?{...item,status}:item));
    setUpdating(null);
  };

  const visible=useMemo(()=>filter==="all"?payments:payments.filter(p=>p.status===filter),[filter,payments]);
  const pending=payments.filter(p=>p.status==="pending").length;
  const verified=payments.filter(p=>p.status==="verified").length;
  const rejected=payments.filter(p=>p.status==="rejected").length;
  const totalVerified=payments.filter(p=>p.status==="verified").reduce((sum,p)=>sum+p.amount,0);

  if(loading)return <div className="min-h-[60vh] grid place-items-center text-subink">Loading admin dashboard…</div>;
  if(!user)return <Navigate to="/login" replace/>;
  if(!isAdmin)return <div className="min-h-[60vh] bg-bg py-16"><div className="container-page"><div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center"><ShieldAlert className="mx-auto text-red-500" size={42}/><h1 className="mt-4 text-2xl font-bold text-brand-navy">Admin access required</h1><p className="mt-2 text-sm text-subink">This area is restricted to authorised administrators.</p></div></div></div>;

  return <div className="min-h-[70vh] bg-bg py-10"><div className="container-page">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-brand-blue">MMUST HOSTELHUB</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">Admin Dashboard</h1><p className="mt-1 text-sm text-subink">Manage payment verification and monitor booking payments.</p></div><Button variant="outline" onClick={loadPayments} disabled={loadingPayments}><RefreshCw size={16} className={loadingPayments?"animate-spin":""}/> Refresh</Button></div>

    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat icon={Clock3} label="Pending Payments" value={pending.toString()} tone="amber"/>
      <Stat icon={CheckCircle2} label="Verified Payments" value={verified.toString()} tone="green"/>
      <Stat icon={XCircle} label="Rejected Payments" value={rejected.toString()} tone="red"/>
      <Stat icon={CreditCard} label="Verified Amount" value={`KSh ${totalVerified.toLocaleString()}`} tone="blue"/>
    </div>

    <section className="mt-8 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold text-ink">Payment Verification</h2><p className="mt-1 text-xs text-subink">Review transaction codes submitted by students.</p></div><div className="flex gap-2 overflow-x-auto">{(["all","pending","verified","rejected"] as const).map(value=><button key={value} onClick={()=>setFilter(value)} className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${filter===value?"bg-brand-navy text-white":"bg-slate-100 text-subink hover:bg-slate-200"}`}>{value}</button>)}</div></div>
      {error&&<div className="m-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {loadingPayments?<div className="p-10 text-center text-sm text-subink">Loading payments…</div>:visible.length===0?<div className="p-10 text-center text-sm text-subink">No {filter==="all"?"payments":filter+" payments"} found.</div>:<div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-subink"><tr><th className="px-5 py-3">Booking</th><th className="px-5 py-3">Transaction</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Submitted</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{visible.map(payment=><tr key={payment.id} className="hover:bg-slate-50"><td className="px-5 py-4"><p className="font-semibold text-ink">{payment.booking_reference}</p><p className="mt-0.5 text-xs text-subink">User {payment.user_id.slice(0,8)}…</p></td><td className="px-5 py-4 font-mono font-semibold tracking-wide text-ink">{payment.transaction_code}</td><td className="px-5 py-4 font-medium text-ink">KSh {payment.amount.toLocaleString()}</td><td className="px-5 py-4 text-subink">{formatDate(payment.created_at)}</td><td className="px-5 py-4"><Status status={payment.status}/></td><td className="px-5 py-4"><div className="flex justify-end gap-2">{payment.status!=="verified"&&<Button size="sm" onClick={()=>updateStatus(payment.id,"verified")} disabled={updating===payment.id}><CheckCircle2 size={14}/> Verify</Button>}{payment.status!=="rejected"&&<Button size="sm" variant="ghost" onClick={()=>updateStatus(payment.id,"rejected")} disabled={updating===payment.id}><XCircle size={14}/> Reject</Button>}</div></td></tr>)}</tbody></table></div>}
    </section>
  </div></div>;
}

function Stat({icon:Icon,label,value,tone}:{icon:typeof Clock3;label:string;value:string;tone:"amber"|"green"|"red"|"blue"}){const toneClass={amber:"bg-amber-50 text-amber-600",green:"bg-emerald-50 text-emerald-600",red:"bg-red-50 text-red-600",blue:"bg-brand-light text-brand-blue"}[tone];return <div className="rounded-2xl border border-slate-200 bg-white p-5"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClass}`}><Icon size={18}/></span><p className="mt-3 text-xs text-subink">{label}</p><p className="mt-0.5 text-xl font-bold text-ink">{value}</p></div>}
function Status({status}:{status:PaymentStatus}){const map={pending:"bg-amber-50 text-amber-700",verified:"bg-emerald-50 text-emerald-700",rejected:"bg-red-50 text-red-700"};return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${map[status]}`}>{status}</span>}
function formatDate(value:string){const date=new Date(value);return Number.isNaN(date.getTime())?value:date.toLocaleString(undefined,{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"});}
