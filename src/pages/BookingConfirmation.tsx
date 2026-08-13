import { Link, Navigate, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Button from "../components/Button";

export default function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");

  if (!ref) {
    return <Navigate to="/hostels" replace />;
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-bg px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="mt-5 text-xl font-bold text-brand-navy">Booking request submitted.</h1>
        <p className="mt-2 text-sm text-subink">
          Your accommodation request has been received. You can track its status from your dashboard.
        </p>

        <div className="mt-6 rounded-xl bg-brand-light px-4 py-3">
          <p className="text-xs font-medium text-subink">Booking reference</p>
          <p className="font-mono text-lg font-bold text-brand-navy">{ref}</p>
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <Link to="/dashboard">
            <Button fullWidth size="lg">View My Booking</Button>
          </Link>
          <Link to="/hostels">
            <Button fullWidth variant="outline" size="lg">Browse More Hostels</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
