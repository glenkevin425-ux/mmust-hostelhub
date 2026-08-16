-- Run this once in Supabase SQL Editor.
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  booking_reference text not null,
  amount integer not null default 5500,
  transaction_code text not null,
  status text not null default 'pending' check (status in ('pending','verified','rejected')),
  created_at timestamptz not null default now()
);

create index if not exists payments_user_id_idx on public.payments(user_id);
create index if not exists payments_booking_reference_idx on public.payments(booking_reference);

alter table public.payments enable row level security;

drop policy if exists "Users can submit their own payments" on public.payments;
create policy "Users can submit their own payments"
on public.payments for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can view their own payments" on public.payments;
create policy "Users can view their own payments"
on public.payments for select
to authenticated
using (auth.uid() = user_id);

-- Verification is intentionally not exposed to normal users.
-- An admin workflow can later update status to verified/rejected.
