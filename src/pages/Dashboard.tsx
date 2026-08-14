import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, ClipboardCheck, Heart, Home, LogOut } from "lucide-react";
import { hostels } from "../data/hostels";
import { useSavedHostels } from "../hooks/useSavedHostels";
import HostelCard from "../components/HostelCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const currentBooking = {
  hostel: hostels[0],
  room: hostels[0].roomTypes[0],
  status: "Pending",
  moveIn: "September 1, 2026",
};

const activity = [
  { label: "Booking request submitted", time: "Today" },
  { label: "Hostel saved", time: "Yesterday" },
  { label: "Profile updated", time: "3 days ago" },
];

export default function Dashboard() {
  const { saved, isSaved, toggleSaved } = useSavedHostels();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const savedHostels = hostels.filter((h) => saved.includes(h.id));
  const fullName = user?.user_metadata?.full_name as string | undefined;
  const firstName = fullName?.split(" ")[0] || user?.email?.split("@")[0] || "Student";

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

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
          <SummaryCard icon={Home} label="Current Booking" value={currentBooking.hostel.name} />
          <SummaryCard icon={ClipboardCheck} label="Booking Status" value={currentBooking.status} accent />
          <SummaryCard icon={Heart} label="Saved Hostels" value={String(savedHostels.length)} />
          <SummaryCard icon={CalendarDays} label="Upcoming Move-in" value={currentBooking.moveIn} />
        </div>

        <section className="mt-10">
          <h2 className="font-semibold text-ink">My Booking</h2>
          <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <img src={currentBooking.hostel.images[0]} alt={currentBooking.hostel.name} className="h-20 w-20 rounded-xl object-cover" />
              <div>
                <p className="font-semibold text-ink">{currentBooking.hostel.name}</p>
                <p className="text-sm text-subink">{currentBooking.room.name}</p>
                <span className="mt-1.5 inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">{currentBooking.status}</span>
                <p className="mt-1 text-xs text-subink">Move-in: {currentBooking.moveIn}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/hostels/${currentBooking.hostel.id}`}><Button variant="outline">View Booking</Button></Link>
              <Button variant="ghost">Cancel Request</Button>
            </div>
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
            {activity.map((item) => <li key={item.label} className="flex items-center justify-between px-5 py-3.5 text-sm"><span className="text-ink">{item.label}</span><span className="text-subink">{item.time}</span></li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, accent }: { icon: typeof Home; label: string; value: string; accent?: boolean }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent ? "bg-amber-50 text-amber-600" : "bg-brand-light text-brand-blue"}`}><Icon size={18} /></span><p className="mt-3 text-xs text-subink">{label}</p><p className="mt-0.5 truncate font-semibold text-ink">{value}</p></div>;
}
