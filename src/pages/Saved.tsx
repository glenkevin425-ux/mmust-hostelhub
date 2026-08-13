import { Link } from "react-router-dom";
import { hostels } from "../data/hostels";
import { useSavedHostels } from "../hooks/useSavedHostels";
import HostelCard from "../components/HostelCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
export default function Saved(){const {saved,isSaved,toggleSaved}=useSavedHostels();const savedHostels=hostels.filter(h=>saved.includes(h.id));return <div className="container-page py-10"><h1 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">Saved Hostels</h1><p className="mt-1 text-subink">Hostels you've saved for later comparison.</p><div className="mt-8">{savedHostels.length===0?<EmptyState title="No saved hostels yet." description="Save hostels you're interested in and compare them later." action={<Link to="/hostels"><Button>Explore Hostels</Button></Link>}/>:<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{savedHostels.map(hostel=><HostelCard key={hostel.id} hostel={hostel} isSaved={isSaved(hostel.id)} onToggleSave={toggleSaved}/>)}</div>}</div></div>}
