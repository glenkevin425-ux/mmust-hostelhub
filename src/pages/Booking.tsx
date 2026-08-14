import { FormEvent, ReactNode, useMemo, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { getHostelById } from "../data/hostels";
import BookingStepper from "../components/BookingStepper";
import BookingSummary from "../components/BookingSummary";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { createBookingRecord } from "../lib/booking";

const STEPS = ["Accommodation", "Student Details", "Confirmation"];
interface FormState { fullName:string; phone:string; email:string; gender:string; course:string; yearOfStudy:string; moveInDate:string; }
const initialForm: FormState = { fullName:"", phone:"", email:"", gender:"", course:"", yearOfStudy:"", moveInDate:"2026-09-01" };

export default function Booking(){
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();
  const { user } = useAuth();
  const hostelId=searchParams.get("hostel");
  const roomId=searchParams.get("room");
  const hostel=hostelId?getHostelById(hostelId):undefined;
  const room=hostel?.roomTypes.find(r=>r.id===roomId)??hostel?.roomTypes[0];
  const [step,setStep]=useState(1);
  const [form,setForm]=useState<FormState>(initialForm);
  const [errors,setErrors]=useState<Partial<Record<keyof FormState,string>>>({});
  const update=(field:keyof FormState,value:string)=>{setForm(p=>({...p,[field]:value}));setErrors(p=>({...p,[field]:undefined}));};

  const validateStep2=()=>{
    const e:Partial<Record<keyof FormState,string>>={};
    if(!form.fullName.trim())e.fullName="Full name is required.";
    if(!/^(?:\+254|0)7\d{8}$/.test(form.phone.trim()))e.phone="Enter a valid Kenyan phone number, e.g. 0712 345 678.";
    if(!/^\S+@\S+\.\S+$/.test(form.email.trim()))e.email="Enter a valid email address.";
    if(!form.gender)e.gender="Select a gender.";
    if(!form.course.trim())e.course="Course is required.";
    if(!form.yearOfStudy)e.yearOfStudy="Select your year of study.";
    if(!form.moveInDate)e.moveInDate="Select a move-in date.";
    setErrors(e);return Object.keys(e).length===0;
  };

  const handleContinue=(e:FormEvent)=>{
    e.preventDefault();
    if(step===2){
      if(!validateStep2()||!user||!hostel||!room)return;
      const booking=createBookingRecord({userId:user.id,hostel,room,moveInDate:form.moveInDate});
      navigate(`/booking/confirmation?ref=${booking.ref}`,{state:{hostelId:hostel.id,roomId:room.id,...form}});
      return;
    }
    setStep(s=>Math.min(s+1,STEPS.length));
  };

  const moveInFormatted=useMemo(()=>form.moveInDate,[form.moveInDate]);
  if(!hostel||!room)return <Navigate to="/hostels" replace/>;

  return <div className="bg-bg py-10"><div className="container-page"><h1 className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">Complete your booking</h1><p className="mt-1 text-subink">You're one step away from securing your room at {hostel.name}.</p><div className="mt-8"><BookingStepper steps={STEPS} currentStep={step}/></div><div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]"><form onSubmit={handleContinue} noValidate>{step===1&&<div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-semibold text-ink">Your accommodation</h2><div className="mt-4 flex gap-4"><img src={hostel.images[0]} alt={hostel.name} className="h-24 w-24 rounded-xl object-cover"/><div><p className="font-semibold text-ink">{hostel.name}</p><p className="text-sm text-subink">{hostel.location} · {hostel.distanceKm} km from MMUST</p><p className="mt-1 text-sm font-medium text-brand-blue">{room.name} · KSh {room.price.toLocaleString()}/semester</p></div></div><div className="mt-6"><label htmlFor="moveInDate" className="text-sm font-medium text-ink">Preferred move-in date</label><input id="moveInDate" type="date" value={form.moveInDate} onChange={e=>update("moveInDate",e.target.value)} className="mt-1.5 w-full max-w-xs rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"/></div><Button type="submit" className="mt-6" size="lg">Continue</Button></div>}{step===2&&<div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-semibold text-ink">Student details</h2><div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2"><Field label="Full Name" error={errors.fullName}><input value={form.fullName} onChange={e=>update("fullName",e.target.value)} placeholder="e.g. Kevin Okello" className={inputClass(!!errors.fullName)}/></Field><Field label="Phone Number" error={errors.phone}><input value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="0712 345 678" className={inputClass(!!errors.phone)}/></Field><Field label="Email" error={errors.email}><input type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="you@example.com" className={inputClass(!!errors.email)}/></Field><Field label="Gender" error={errors.gender}><select value={form.gender} onChange={e=>update("gender",e.target.value)} className={inputClass(!!errors.gender)}><option value="">Select gender</option><option value="Female">Female</option><option value="Male">Male</option><option value="Prefer not to say">Prefer not to say</option></select></Field><Field label="Year of Study" error={errors.yearOfStudy}><select value={form.yearOfStudy} onChange={e=>update("yearOfStudy",e.target.value)} className={inputClass(!!errors.yearOfStudy)}><option value="">Select year</option><option value="1">Year 1</option><option value="2">Year 2</option><option value="3">Year 3</option><option value="4">Year 4</option><option value="5">Year 5</option></select></Field><Field label="Course" error={errors.course} full><input value={form.course} onChange={e=>update("course",e.target.value)} placeholder="e.g. BSc Civil Engineering" className={inputClass(!!errors.course)}/></Field></div><div className="mt-6 flex gap-3"><Button type="button" variant="outline" onClick={()=>setStep(1)}>Back</Button><Button type="submit" size="lg">Submit Booking Request</Button></div></div>}</form><aside className="hidden lg:block"><div className="sticky top-24"><BookingSummary hostel={hostel} room={room} moveInDate={moveInFormatted}/></div></aside></div></div></div>
}
function inputClass(hasError:boolean){return `w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 ${hasError?"border-red-400 focus:border-red-400 focus:ring-red-400":"border-slate-200 focus:border-brand-blue focus:ring-brand-blue"}`}
function Field({label,error,full,children}:{label:string;error?:string;full?:boolean;children:ReactNode}){return <div className={full?"sm:col-span-2":""}><label className="text-sm font-medium text-ink">{label}</label><div className="mt-1.5">{children}</div>{error&&<p className="mt-1 text-xs font-medium text-red-500">{error}</p>}</div>}
