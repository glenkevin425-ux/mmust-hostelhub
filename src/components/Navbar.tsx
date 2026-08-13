import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import Button from "./Button";
import mmustLogo from "../assets/mmust-logo.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/hostels", label: "Find Hostels" },
  { to: "/#how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow duration-200 ${
        scrolled ? "shadow-[0_1px_0_0_rgba(15,23,42,0.06),0_4px_16px_-8px_rgba(15,23,42,0.15)]" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src={mmustLogo}
            alt="Masinde Muliro University of Science and Technology logo"
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span className="text-lg font-bold tracking-tight text-brand-navy">
            MMUST <span className="font-extrabold text-brand-blue">HostelHub</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive && link.to !== "/#how-it-works"
                    ? "text-brand-blue"
                    : "text-ink hover:text-brand-blue"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/saved"
            aria-label="Saved hostels"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-brand-light hover:text-brand-blue"
          >
            <Heart size={18} />
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/hostels">
            <Button size="sm">Find a Hostel</Button>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-5 pb-5 pt-2 animate-[fadeIn_150ms_ease-out]">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-brand-light hover:text-brand-blue"
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/saved" className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-brand-light hover:text-brand-blue">
              Saved Hostels
            </NavLink>
          </nav>
          <div className="mt-4 flex gap-2">
            <Link to="/login" className="flex-1">
              <Button variant="outline" fullWidth>Login</Button>
            </Link>
            <Link to="/hostels" className="flex-1">
              <Button fullWidth>Find a Hostel</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
