import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, ClipboardCheck, Heart, Home, LogOut, XCircle } from "lucide-react";
import { hostels } from "../data/hostels";
import { getHostelById } from "../data/hostels";
import { useSavedHostels } from "../hooks/useSavedHostels";
import HostelCard from "../components/HostelCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { addActivity, clearBooking, getActivities, getBooking, type ActivityRecord, type BookingRecord } from "../lib/booking";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { saved, isSaved, toggleSaved } = useSavedHostels();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [activity, setActivity] = useState<ActivityRecord[]>([]);
  const savedHostels = hostels.filter((h) => saved.includes(h.id));
  const fullName = user?.user_metadata?.full_name as string | undefined;
  const firstName = fullName?.split(" ")[0] || user?.email?.split("@")[0] || "Student";

  useEffect(() => {
    if (!user) return;
    setBooking(getBooking(user.id));
    setActivity(getActivities(user.id));
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const handleCancelBooking = () => {
    if (!user || !booking) return;
    const confirmed = window.confirm("Cancel this booking request? This cannot be undone.");
    if (!confirmed) return;
    clearBooking(user.id);
    addActivity(user.id, `Booking request cancelled · ${booking.ref}`);
    setBooking(null);
    setActivity(getActivities(user.id));
  };

  const bookedHostel = booking ? getHostelById(booking.hostelId) : undefined;

  return (
    <div className="bg-bg py-10">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">Good morning, {firstName}</h1>
            <p className="mt-1 text-subink">Here's what's happening with your accommodation search.</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}><LogOut size={16} /> Sign out</Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard icon={Home} label="Current Booking" value={booking?.hostelName || "No active booking"} />
          <SummaryCard icon={ClipboardCheck} label="Booking Status" value={booking?.status || "None"} accent />
          <SummaryCard icon={Heart} label="Saved Hostels" value={String(savedHostels.length)} />
          <SummaryCard icon={CalendarDays} label="Upcoming Move-in" value={booking?.moveInDate ? formatDate(booking.moveInDate) : "—"} />
        </div>

        <section className="mt-10">
          <h2 className="font-semibold text-ink">My Booking</h2>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-6">
            {booking && bookedHostel ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-4">
                  <img src={bookedHostel.images[0]} alt={bookedHostel.name} className="h-20 w-20 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-ink">{booking.hostelName}</p>
                    <p className="text-sm text-subink">{booking.roomName}</p>
                    <span className="mt-1.5 inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">{booking.status}</span>
                    <p className="mt-1 text-xs text-subink">Move-in: {formatDate(booking.moveInDate)}</p>
                    <p className="mt-1 text-xs text-subink">Reference: {booking.ref}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/hostels/${booking.hostelId}`}><Button variant="outline">View Hostel</Button></Link>
                  {booking.status === "Pending" && <Button variant="ghost" onClick={handleCancelBooking}><XCircle size={16} /> Cancel Request</Button>}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-ink">No active booking request.</p>
                  <p className="mt-1 text-sm text-subink">Find a hostel and submit a request when you're ready.</p>
                </div>
                <Link to="/hostels"><Button>Explore Hostels</Button></Link>
              </div>
            )}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between"><h2 className="font-semibold text-ink">Saved Hostels</h2><Link to="/saved" className="text-sm font-semibold text-brand-blue hover:underline">View all</Link></div>
          <div className="mt-3">
            {savedHostels.length === 0 ? <EmptyState title="No saved hostels yet." description="Save hostels you're interested in and compare them later." action={<Link to="/hostels"><Button>Explore Hostels</Button></Link>} /> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{savedHostels.slice(0, 3).map((hostel) => <HostelCard key={hostel.id} hostel={hostel} isSaved={isSaved(hostel.id)} onToggleSave={toggleSaved} />)}</div>}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-semibold text-ink">Recent Activity</h2>
          <ul className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
            {activity.length === 0 ? (
              <li className="px-5 py-4 text-sm text-subink">No recent activity yet.</li>
            ) : activity.slice(0, 5).map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
                <span className="text-ink">{item.label}</span>
                <span className="shrink-0 text-subink">{relativeTime(item.timestamp)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function relativeTime(value: string) {
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function SummaryCard({ icon: Icon, label, value, accent }: { icon: typeof Home; label: string; value: string; accent?: boolean }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent ? "bg-amber-50 text-amber-600" : "bg-brand-light text-brand-blue"}`}><Icon size={18} /></span><p className="mt-3 text-xs text-subink">{label}</p><p className="mt-0.5 truncate font-semibold text-ink">{value}</p></div>;
}
