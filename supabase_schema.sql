-- ========================================================
-- PIZZORA RESTAURANT - SUPABASE DATABASE SCHEMA
-- Supabase SQL Editor ga nusxalab olib "Run" tugmasini bosing
-- ========================================================

-- 1. Create Orders Table
create table if not exists public.orders (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  customer jsonb,
  items jsonb,
  subtotal numeric,
  discount numeric default 0,
  delivery_fee numeric default 0,
  tax numeric default 0,
  total numeric,
  status text default 'Pending',
  payment_method text,
  estimated_time text,
  order_notes text,
  delivery_slot text
);

-- 2. Enable Row Level Security (RLS) & Allow public read/write for restaurant kiosks
alter table public.orders enable row level security;

create policy "Allow all operations for anon restaurant kiosk"
  on public.orders
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- 3. Enable Realtime updates for live kitchen kiosk and waiter panels
alter publication supabase_realtime add table public.orders;

