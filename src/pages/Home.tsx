import { Link } from "react-router-dom";
import { ArrowRight, SlidersHorizontal, Eye, GraduationCap as GradIcon, ListChecks, Search, ShieldCheck, KeyRound } from "lucide-react";
import SearchBar from "../components/SearchBar";
import HostelCard from "../components/HostelCard";
import Button from "../components/Button";
import { hostels } from "../data/hostels";
import { useSavedHostels } from "../hooks/useSavedHostels";

const FEATURES = [
  { icon: SlidersHorizontal, title: "Compare Easily", description: "Compare hostels by price, distance and facilities." },
  { icon: Eye, title: "Know What You're Getting", description: "View photos, room types, amenities and accommodation details before booking." },
  { icon: GradIcon, title: "Student-Friendly", description: "Designed specifically around the needs of MMUST students." },
  { icon: ListChecks, title: "Simple Booking", description: "Choose a room and submit your booking request in a few simple steps." },
];
const STEPS = [
  { number: "01", icon: Search, title: "Search", description: "Explore hostels around MMUST based on your preferred location, budget and room type." },
  { number: "02", icon: ShieldCheck, title: "Compare", description: "Check prices, facilities, distance and available rooms." },
  { number: "03", icon: KeyRound, title: "Book", description: "Select your preferred room and submit your booking request." },
];

export default function Home() {
  const { isSaved, toggleSaved } = useSavedHostels();
  const featured = hostels.slice(0, 6);
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-light to-bg">
        <div className="container-page grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-blue shadow-sm">For MMUST students</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-navy sm:text-5xl">Find a hostel that feels like home.</h1>
            <p className="mt-5 max-w-lg text-lg text-subink">Discover comfortable, affordable student accommodation around MMUST and find a space that fits your budget and lifestyle.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/hostels"><Button size="lg" icon={<ArrowRight size={18} />} fullWidth>Find a Hostel</Button></Link>
              <a href="#how-it-works"><Button size="lg" variant="outline" fullWidth>How It Works</Button></a>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl"><img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80" alt="Student accommodation near MMUST" className="h-full w-full object-cover" /></div>
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-cardHover"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand-blue"><ShieldCheck size={20} /></span><div><p className="text-sm font-semibold text-ink">120+ verified hostels</p><p className="text-xs text-subink">Around MMUST campus</p></div></div>
          </div>
        </div>
        <div className="container-page pb-16 lg:-mt-4"><SearchBar /></div>
      </section>
      <section className="container-page py-16">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">Popular hostels near MMUST</h2><p className="mt-1 text-subink">Explore some of the most popular student accommodation options.</p></div><Link to="/hostels" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-blue hover:underline sm:flex">View all hostels <ArrowRight size={16} /></Link></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((hostel) => <HostelCard key={hostel.id} hostel={hostel} isSaved={isSaved(hostel.id)} onToggleSave={toggleSaved} />)}</div>
        <Link to="/hostels" className="mt-8 flex items-center justify-center gap-1 text-sm font-semibold text-brand-blue hover:underline sm:hidden">View all hostels <ArrowRight size={16} /></Link>
      </section>
      <section className="bg-brand-navy py-16"><div className="container-page"><h2 className="max-w-xl text-2xl font-bold tracking-tight text-white sm:text-3xl">Everything you need to choose the right hostel.</h2><div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{FEATURES.map((feature) => <div key={feature.title} className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white"><feature.icon size={20} /></span><h3 className="mt-4 font-semibold text-white">{feature.title}</h3><p className="mt-1.5 text-sm text-slate-300">{feature.description}</p></div>)}</div></div></section>
      <section id="how-it-works" className="container-page py-16 scroll-mt-20"><div className="text-center"><h2 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">How It Works</h2><p className="mt-2 text-subink">Three simple steps to your next home near campus.</p></div><div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">{STEPS.map((step) => <div key={step.number} className="relative flex flex-col items-center text-center sm:items-start sm:text-left"><span className="text-4xl font-extrabold text-brand-light">{step.number}</span><span className="mt-2 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand-blue"><step.icon size={20} /></span><h3 className="mt-4 font-semibold text-ink">{step.title}</h3><p className="mt-1.5 max-w-xs text-sm text-subink">{step.description}</p></div>)}</div><div className="mt-10 flex justify-center"><Link to="/hostels"><Button size="lg" icon={<ArrowRight size={18} />}>Start Exploring</Button></Link></div></section>
    </div>
  );
}
