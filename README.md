# MMUST HostelHub

Frontend-only prototype of a student hostel booking platform for MMUST (Masinde Muliro University of Science and Technology), Kenya.

Built with React + Vite + TypeScript + Tailwind CSS + React Router. No backend, database, payments, or real authentication — all data is mocked and bookings/favourites are handled with local state and `localStorage`.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Reusable UI building blocks (Navbar, HostelCard, FilterPanel, etc.)
  pages/        Route-level pages (Home, Hostels, HostelDetails, Booking, Dashboard, ...)
  layouts/      MainLayout wraps every page with the Navbar + Footer
  data/         Mock hostel data + TypeScript interfaces for it
  hooks/        useSavedHostels — localStorage-backed favourites
  types/        Shared TypeScript interfaces (Hostel, RoomType, BookingDetails)
```

## Routes

| Route | Page |
|---|---|
| `/` | Home / landing page |
| `/hostels` | Hostel listing with search, filters, sort |
| `/hostels/:id` | Hostel details, room selection |
| `/booking` | 3-step booking form (`?hostel=<id>&room=<id>`) |
| `/booking/confirmation` | Booking confirmation with mock reference |
| `/dashboard` | Student dashboard (mock booking, saved hostels, activity) |
| `/saved` | Saved/favourited hostels |
| `/login` | Frontend-only login (simulated) |
| `/about` | About page |

## Notes for the next phase

This prototype is structured so a real backend can be dropped in later:
- Replace `src/data/hostels.ts` with API calls (e.g. React Query / fetch) behind the same `Hostel`/`RoomType` shapes in `src/types`.
- Swap `useSavedHostels`'s localStorage calls for authenticated API calls once real accounts exist.
- `Booking.tsx`'s submit handler is where the real POST to a bookings endpoint and M-Pesa integration would go.
- `Login.tsx` currently just redirects to `/dashboard` after a simulated delay — swap in real auth here.
