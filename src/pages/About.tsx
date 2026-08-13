import { Link } from "react-router-dom";
import { ShieldCheck, Users, MapPin } from "lucide-react";
import Button from "../components/Button";

export default function About() {
  return (
    <div>
      <section className="bg-brand-light py-16">
        <div className="container-page text-center">
          <h1 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
            Built for MMUST students, by people who get campus life.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-subink">
            MMUST HostelHub exists to make finding accommodation around campus simple, transparent and stress-free —
            especially in the first few chaotic weeks of a new semester.
          </p>
        </div>
      </section>

      <section className="container-page grid grid-cols-1 gap-6 py-16 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand-blue">
            <MapPin size={20} />
          </span>
          <h3 className="mt-4 font-semibold text-ink">Hyper-local</h3>
          <p className="mt-1.5 text-sm text-subink">Every listing is within walking or boda distance of MMUST.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand-blue">
            <ShieldCheck size={20} />
          </span>
          <h3 className="mt-4 font-semibold text-ink">Transparent</h3>
          <p className="mt-1.5 text-sm text-subink">Real prices, real facilities — no hidden surprises at move-in.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand-blue">
            <Users size={20} />
          </span>
          <h3 className="mt-4 font-semibold text-ink">Student-first</h3>
          <p className="mt-1.5 text-sm text-subink">Designed around how MMUST students actually search and decide.</p>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-center">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to find your space?</h2>
          <div className="mt-6">
            <Link to="/hostels">
              <Button size="lg">Browse Hostels</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
