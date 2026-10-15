-- =====================================================================
-- Munnar Hiking Tours (Treker Admin) - FULL Supabase schema
-- Safe to re-run. Paste in Supabase > SQL Editor > New query > Run
-- Covers: Dashboard, Enquiries, Bookings, Customers, Destinations,
--         Gallery, Reports (views), Settings (admin profile), Calendar
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------- 1. ENQUIRIES (website BookingForm + admin Enquiries) ----------
create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  email       text,
  tour_name   text,                 -- admin "destination"
  tour_date   date,                 -- admin "date"
  group_size  integer default 1,    -- admin "travelers"
  budget      text,
  message     text,
  status      text not null default 'new'
);
alter table public.enquiries add column if not exists budget text;
alter table public.enquiries drop constraint if exists enquiries_status_check;
alter table public.enquiries add constraint enquiries_status_check
  check (status in ('new','contacted','confirmed','cancelled'));

-- ---------- 2. CUSTOMERS ----------
create table if not exists public.customers (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text unique,
  phone         text,
  avatar_url    text,
  status        text not null default 'active'
                check (status in ('active','vip','inactive'))
);

-- ---------- 3. DESTINATIONS / TOURS ----------
create table if not exists public.destinations (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null,
  slug           text unique,
  state          text default 'Kerala',
  country        text default 'India',
  category       text,
  image_url      text,
  price          integer default 0,
  rating         numeric(2,1) default 5.0 check (rating between 0 and 5),
  duration       text,
  description    text,
  status         text not null default 'active'
                 check (status in ('active','seasonal','inactive'))
);

-- ---------- 4. BOOKINGS ----------
create sequence if not exists public.booking_code_seq start 1000;

create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  booking_code    text unique not null
                  default ('TRK-' || to_char(now(),'YYYY') || '-' || nextval('public.booking_code_seq')),
  enquiry_id      uuid references public.enquiries(id)    on delete set null,
  customer_id     uuid references public.customers(id)    on delete set null,
  destination_id  uuid references public.destinations(id) on delete set null,
  customer_name   text not null,
  customer_email  text,
  customer_phone  text,
  destination     text not null,
  tour_date       date not null,
  travelers       integer not null default 1 check (travelers > 0),
  amount          integer not null default 0,
  payment_status  text not null default 'pending'
                  check (payment_status in ('paid','pending','refunded')),
  status          text not null default 'confirmed'
                  check (status in ('confirmed','in-progress','completed','cancelled'))
);

-- ---------- 5. GALLERY ----------
create table if not exists public.gallery (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  title        text not null default '',
  category     text not null default 'NATURE'
               check (category in ('ROOMS','RESORT','NATURE','VIDEO')),
  image_url    text not null,
  is_video     boolean default false,
  video_url    text,
  description  text,
  file_size    text,
  dimensions   text
);
alter table public.gallery add column if not exists title text default '';
alter table public.gallery add column if not exists category text default 'NATURE';
alter table public.gallery add column if not exists is_video boolean default false;
alter table public.gallery add column if not exists video_url text;
alter table public.gallery add column if not exists description text;
alter table public.gallery add column if not exists file_size text;
alter table public.gallery add column if not exists dimensions text;

-- ---------- 6. REVIEWS ----------
create table if not exists public.reviews (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  destination_id  uuid references public.destinations(id) on delete cascade,
  author_name     text not null,
  rating          integer check (rating between 1 and 5),
  text            text not null,
  is_published    boolean default false
);

-- ---------- 7. CALENDAR EVENTS (Dashboard) ----------
create table if not exists public.calendar_events (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  title       text not null,
  date        date not null,
  type        text not null default 'booking'
              check (type in ('booking','departure','enquiry','safari')),
  color       text default '#f97316'
);

-- ---------- 8. ADMIN PROFILE (Settings) ----------
create table if not exists public.admin_profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  created_at    timestamptz not null default now(),
  name          text,
  role          text default 'Administrator',
  company       text default 'Munnar Hiking Tours',
  email         text,
  phone         text,
  avatar_url    text,
  bio           text
);

-- ---------- INDEXES ----------
create index if not exists idx_enquiries_created on public.enquiries(created_at desc);
create index if not exists idx_enquiries_status  on public.enquiries(status);
create index if not exists idx_bookings_date     on public.bookings(tour_date);
create index if not exists idx_bookings_status   on public.bookings(status);
create index if not exists idx_gallery_category  on public.gallery(category);

-- ---------- REPORTS (views for Dashboard / Reports page) ----------
create or replace view public.report_summary with (security_invoker = true) as
select
  (select count(*) from public.enquiries)                              as total_enquiries,
  (select count(*) from public.enquiries where status = 'new')         as new_enquiries,
  (select count(*) from public.bookings)                               as total_bookings,
  (select coalesce(sum(amount),0) from public.bookings where payment_status = 'paid') as total_revenue,
  (select count(*) from public.customers)                              as total_customers;

create or replace view public.report_monthly_revenue with (security_invoker = true) as
select to_char(date_trunc('month', tour_date), 'YYYY-MM') as month,
       count(*) as bookings,
       coalesce(sum(amount) filter (where payment_status = 'paid'),0) as revenue
from public.bookings
group by 1 order by 1;

-- ---------- CUSTOMER STATS VIEW ----------
create or replace view public.customer_stats with (security_invoker = true) as
select c.*,
       count(b.id)                as total_bookings,
       coalesce(sum(b.amount),0)  as total_spent
from public.customers c
left join public.bookings b on b.customer_id = c.id
group by c.id;

-- =====================================================================
-- ROW LEVEL SECURITY
-- public (anon) = website visitors, authenticated = logged-in admin
-- =====================================================================
alter table public.enquiries       enable row level security;
alter table public.customers       enable row level security;
alter table public.destinations    enable row level security;
alter table public.bookings        enable row level security;
alter table public.gallery         enable row level security;
alter table public.reviews         enable row level security;
alter table public.calendar_events enable row level security;
alter table public.admin_profiles  enable row level security;

-- Enquiries: anyone can submit, admin full access
drop policy if exists "enq_public_insert" on public.enquiries;
create policy "enq_public_insert" on public.enquiries
  for insert to anon, authenticated with check (true);
drop policy if exists "enq_admin_all" on public.enquiries;
create policy "enq_admin_all" on public.enquiries
  for all to authenticated using (true) with check (true);

-- Public read tables (destinations, gallery, published reviews)
drop policy if exists "dest_public_read" on public.destinations;
create policy "dest_public_read" on public.destinations
  for select to anon, authenticated using (status <> 'inactive');
drop policy if exists "gal_public_read" on public.gallery;
create policy "gal_public_read" on public.gallery
  for select to anon, authenticated using (true);
drop policy if exists "rev_public_read" on public.reviews;
create policy "rev_public_read" on public.reviews
  for select to anon, authenticated using (is_published = true);

-- Admin full access
drop policy if exists "dest_admin_all" on public.destinations;
create policy "dest_admin_all" on public.destinations
  for all to authenticated using (true) with check (true);
drop policy if exists "gal_admin_all" on public.gallery;
create policy "gal_admin_all" on public.gallery
  for all to authenticated using (true) with check (true);
drop policy if exists "rev_admin_all" on public.reviews;
create policy "rev_admin_all" on public.reviews
  for all to authenticated using (true) with check (true);
drop policy if exists "cust_admin_all" on public.customers;
create policy "cust_admin_all" on public.customers
  for all to authenticated using (true) with check (true);
drop policy if exists "book_admin_all" on public.bookings;
create policy "book_admin_all" on public.bookings
  for all to authenticated using (true) with check (true);
drop policy if exists "cal_admin_all" on public.calendar_events;
create policy "cal_admin_all" on public.calendar_events
  for all to authenticated using (true) with check (true);

-- Admin profile: each admin only their own row
drop policy if exists "profile_own" on public.admin_profiles;
create policy "profile_own" on public.admin_profiles
  for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- =====================================================================
-- STORAGE bucket for gallery uploads
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "gallery_public_read" on storage.objects;
create policy "gallery_public_read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'gallery');
drop policy if exists "gallery_admin_write" on storage.objects;
create policy "gallery_admin_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery');
drop policy if exists "gallery_admin_update" on storage.objects;
create policy "gallery_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'gallery');
drop policy if exists "gallery_admin_delete" on storage.objects;
create policy "gallery_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'gallery');

-- =====================================================================
-- VERIFY (run after - should list all tables with rls_enabled = true)
-- =====================================================================
select tablename, rowsecurity as rls_enabled
from pg_tables where schemaname = 'public' order by tablename;
