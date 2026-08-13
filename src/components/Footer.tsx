import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import mmustLogo from "../assets/mmust-logo.jpg";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={mmustLogo} alt="MMUST logo" className="h-9 w-9 object-contain" />
            <span className="text-base font-bold text-brand-navy">MMUST HostelHub</span>
          </Link>
          <p className="mt-3 text-sm text-subink">Find your space. Book with confidence.</p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-subink hover:border-brand-blue hover:text-brand-blue">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-subink hover:border-brand-blue hover:text-brand-blue">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-subink hover:border-brand-blue hover:text-brand-blue text-xs font-bold">
              TT
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Platform</h4>
          <ul className="mt-3 space-y-2 text-sm text-subink">
            <li><Link to="/" className="hover:text-brand-blue">Home</Link></li>
            <li><Link to="/hostels" className="hover:text-brand-blue">Hostels</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-brand-blue">How It Works</Link></li>
            <li><Link to="/about" className="hover:text-brand-blue">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Student</h4>
          <ul className="mt-3 space-y-2 text-sm text-subink">
            <li><Link to="/dashboard" className="hover:text-brand-blue">Dashboard</Link></li>
            <li><Link to="/saved" className="hover:text-brand-blue">Saved Hostels</Link></li>
            <li><Link to="/dashboard" className="hover:text-brand-blue">My Booking</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-subink">
            <li>hello@hostelhub.co.ke</li>
            <li>+254 700 000 000</li>
            <li>Kakamega, Kenya</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 py-6">
        <div className="container-page flex flex-col gap-2 text-xs text-subink sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MMUST HostelHub</p>
          <p className="max-w-xl sm:text-right">
            MMUST HostelHub is a student accommodation platform concept and is not an official MMUST university portal.
          </p>
        </div>
      </div>
    </footer>
  );
}
