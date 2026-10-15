-- =====================================================================
-- Munnar Hiking Tours — Supabase database setup
--
-- HOW TO RUN:
--   Supabase Dashboard → SQL Editor → New query → paste this file → Run
--
-- Safe to re-run (idempotent). Supersedes supabase/schema.sql and
-- upgrades its tables in place if that file was already executed.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 0. EXTENSIONS
-- ---------------------------------------------------------------------
create extension if not exists pgcrypto;  -- provides gen_random_uuid()


-- ---------------------------------------------------------------------
-- 1. HELPER: auto-maintain updated_at
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ---------------------------------------------------------------------
-- 2. ADMINS (also stores the admin profile shown in the dashboard)
--    Only users listed here can read customer data / manage content.
-- ---------------------------------------------------------------------
create table if not exists public.admins (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text not null default 'Admin',
  role        text not null default 'Admin',
  company     text default 'Munnar Hiking Tours',
  email       text,
  phone       text,
  avatar_url  text,
  bio         text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where id = auth.uid());
$$;


-- ---------------------------------------------------------------------
-- 3. ENQUIRIES  (written by the public BookingForm)
--    Column names match src/components/BookingForm.tsx exactly.
-- ---------------------------------------------------------------------
create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  email       text,
  tour_name   text,
  tour_date   date,
  group_size  integer,
  budget      text,
  message     text,
  status      text default 'new'
);

-- Upgrade path for the older schema.sql
alter table public.enquiries add column if not exists updated_at timestamptz not null default now();
alter table public.enquiries add column if not exists budget text;

alter table public.enquiries drop constraint if exists enquiries_status_check;
alter table public.enquiries add  constraint enquiries_status_check
  check (status in ('new', 'contacted', 'confirmed', 'cancelled'));

-- Basic anti-garbage validation for anonymous inserts
alter table public.enquiries drop constraint if exists enquiries_input_check;
alter table public.enquiries add  constraint enquiries_input_check check (
      char_length(name)  between 2 and 100
  and char_length(phone) between 7 and 20
  and (email      is null or char_length(email)   <= 254)
  and (group_size is null or group_size between 1 and 100)
  and (message    is null or char_length(message) <= 2000)
) not valid;  -- enforce on new rows, don't fail on any legacy rows


-- ---------------------------------------------------------------------
-- 4. TOURS  (treks, safaris, camping, packages — "destinations" in admin)
-- ---------------------------------------------------------------------
create table if not exists public.tours (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  title              text not null,
  slug               text not null unique,
  type               text not null,
  category           text,
  location           text default 'Munnar, Kerala',
  price_inr          integer check (price_inr >= 0),
  duration           text,
  difficulty         text,
  rating             numeric(2,1) check (rating between 0 and 5),
  short_description  text,
  content            text,
  itinerary          jsonb default '[]'::jsonb,  -- [{day, title, description}]
  inclusions         jsonb default '[]'::jsonb,  -- ["..."]
  exclusions         jsonb default '[]'::jsonb,
  what_to_carry      jsonb default '[]'::jsonb,
  main_image_url     text,
  seo_title          text,
  seo_meta_desc      text,
  is_seasonal        boolean not null default false,
  is_published       boolean not null default true
);

-- Upgrade path for the older schema.sql
alter table public.tours add column if not exists updated_at  timestamptz not null default now();
alter table public.tours add column if not exists category    text;
alter table public.tours add column if not exists location    text default 'Munnar, Kerala';
alter table public.tours add column if not exists rating      numeric(2,1) check (rating between 0 and 5);
alter table public.tours add column if not exists is_seasonal boolean not null default false;

alter table public.tours drop constraint if exists tours_type_check;
alter table public.tours add  constraint tours_type_check
  check (type in ('trek', 'hike', 'safari', 'camping', 'walk', 'stay', 'package'));


-- ---------------------------------------------------------------------
-- 5. CUSTOMERS
-- ---------------------------------------------------------------------
create table if not exists public.customers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),   -- "joined date"
  updated_at  timestamptz not null default now(),
  name        text not null,
  email       text unique,
  phone       text,
  avatar_url  text,
  status      text not null default 'active'
              check (status in ('active', 'vip', 'inactive')),
  notes       text
);


-- ---------------------------------------------------------------------
-- 6. BOOKINGS  (booking_code auto-generated, e.g. TRK-2026-1001)
-- ---------------------------------------------------------------------
create sequence if not exists public.booking_code_seq start with 1001;

create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  booking_code    text not null unique
                  default ('TRK-' || to_char(now(), 'YYYY') || '-' || nextval('public.booking_code_seq')),
  customer_id     uuid references public.customers(id) on delete set null,
  enquiry_id      uuid references public.enquiries(id) on delete set null,
  tour_id         uuid references public.tours(id)     on delete set null,
  customer_name   text not null,
  customer_email  text,
  customer_phone  text,
  tour_name       text not null,
  tour_date       date not null,
  travelers       integer not null default 1 check (travelers >= 1),
  amount_inr      integer not null default 0 check (amount_inr >= 0),
  payment_status  text not null default 'pending'
                  check (payment_status in ('paid', 'pending', 'refunded')),
  status          text not null default 'confirmed'
                  check (status in ('confirmed', 'in-progress', 'completed', 'cancelled'))
);


-- ---------------------------------------------------------------------
-- 7. CALENDAR EVENTS
-- ---------------------------------------------------------------------
create table if not exists public.calendar_events (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  title       text not null,
  event_date  date not null,
  type        text not null default 'booking'
              check (type in ('booking', 'departure', 'enquiry', 'safari')),
  color       text default '#f97316',
  booking_id  uuid unique references public.bookings(id) on delete cascade
);

-- Keep a calendar entry in sync with every booking
create or replace function public.sync_booking_event()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.calendar_events (title, event_date, type, color, booking_id)
    values (new.tour_name || ' (' || new.travelers || ' pax)', new.tour_date, 'booking', '#f97316', new.id);
  elsif tg_op = 'UPDATE' then
    update public.calendar_events
       set title      = new.tour_name || ' (' || new.travelers || ' pax)',
           event_date = new.tour_date
     where booking_id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists bookings_sync_event on public.bookings;
create trigger bookings_sync_event
  after insert or update of tour_name, tour_date, travelers on public.bookings
  for each row execute function public.sync_booking_event();


-- ---------------------------------------------------------------------
-- 8. REVIEWS
-- ---------------------------------------------------------------------
create table if not exists public.reviews (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  tour_id       uuid references public.tours(id) on delete cascade,
  author_name   text not null,
  rating        integer check (rating >= 1 and rating <= 5),
  text          text not null,
  is_published  boolean default false
);


-- ---------------------------------------------------------------------
-- 9. GALLERY  (image metadata; files live in the "gallery" storage bucket)
-- ---------------------------------------------------------------------
create table if not exists public.gallery (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  image_url     text not null,
  alt_text      text,
  tour_id       uuid references public.tours(id) on delete set null
);

-- Extra columns used by the admin media manager
alter table public.gallery add column if not exists name         text;
alter table public.gallery add column if not exists storage_path text;
alter table public.gallery add column if not exists size_bytes   bigint;
alter table public.gallery add column if not exists mime_type    text;
alter table public.gallery add column if not exists sort_order   integer not null default 0;


-- ---------------------------------------------------------------------
-- 10. updated_at TRIGGERS
-- ---------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['admins', 'enquiries', 'tours', 'customers', 'bookings'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format(
      'create trigger set_updated_at before update on public.%I
         for each row execute function public.set_updated_at()', t);
  end loop;
end $$;


-- ---------------------------------------------------------------------
-- 11. INDEXES
-- ---------------------------------------------------------------------
create index if not exists enquiries_status_created_idx on public.enquiries (status, created_at desc);
create index if not exists bookings_tour_date_idx       on public.bookings (tour_date);
create index if not exists bookings_customer_idx        on public.bookings (customer_id);
create index if not exists bookings_tour_idx            on public.bookings (tour_id);
create index if not exists reviews_tour_idx             on public.reviews (tour_id);
create index if not exists gallery_tour_idx             on public.gallery (tour_id);
create index if not exists calendar_events_date_idx     on public.calendar_events (event_date);


-- ---------------------------------------------------------------------
-- 12. DASHBOARD VIEWS  (security_invoker → respects RLS of the caller)
-- ---------------------------------------------------------------------
create or replace view public.customer_stats
with (security_invoker = true) as
select
  c.*,
  count(b.id)::int                                                        as total_bookings,
  coalesce(sum(b.amount_inr) filter (where b.payment_status = 'paid'), 0)::int as total_spent
from public.customers c
left join public.bookings b on b.customer_id = c.id
group by c.id;

create or replace view public.dashboard_stats
with (security_invoker = true) as
select
  (select count(*) from public.enquiries where status = 'new')                               as new_enquiries,
  (select count(*) from public.bookings)                                                     as total_bookings,
  (select count(*) from public.customers)                                                    as total_customers,
  (select coalesce(sum(amount_inr), 0) from public.bookings where payment_status = 'paid')   as total_revenue;


-- ---------------------------------------------------------------------
-- 13. ROW LEVEL SECURITY
-- ---------------------------------------------------------------------
alter table public.admins          enable row level security;
alter table public.enquiries       enable row level security;
alter table public.tours           enable row level security;
alter table public.customers       enable row level security;
alter table public.bookings        enable row level security;
alter table public.calendar_events enable row level security;
alter table public.reviews         enable row level security;
alter table public.gallery         enable row level security;

-- Remove the permissive policies from the old schema.sql
-- (they allowed ANY logged-in user to read every enquiry)
drop policy if exists "Public can insert enquiries"               on public.enquiries;
drop policy if exists "Authenticated admins can view enquiries"   on public.enquiries;
drop policy if exists "Authenticated admins can update enquiries" on public.enquiries;
drop policy if exists "Public can view published tours"           on public.tours;
drop policy if exists "Authenticated admins can manage tours"     on public.tours;
drop policy if exists "Public can view published reviews"         on public.reviews;
drop policy if exists "Authenticated admins can manage reviews"   on public.reviews;
drop policy if exists "Public can view gallery"                   on public.gallery;
drop policy if exists "Authenticated admins can manage gallery"   on public.gallery;

-- admins
drop policy if exists "admins_select" on public.admins;
create policy "admins_select" on public.admins
  for select to authenticated using (id = auth.uid() or public.is_admin());

drop policy if exists "admins_update_self" on public.admins;
create policy "admins_update_self" on public.admins
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- enquiries: anyone can submit, only admins can read/manage
drop policy if exists "enquiries_public_insert" on public.enquiries;
create policy "enquiries_public_insert" on public.enquiries
  for insert to anon, authenticated with check (status = 'new');

drop policy if exists "enquiries_admin_all" on public.enquiries;
create policy "enquiries_admin_all" on public.enquiries
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- tours: public reads published, admins manage
drop policy if exists "tours_public_read" on public.tours;
create policy "tours_public_read" on public.tours
  for select to anon, authenticated using (is_published or public.is_admin());

drop policy if exists "tours_admin_all" on public.tours;
create policy "tours_admin_all" on public.tours
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- reviews: public reads published + may submit (hidden until approved)
drop policy if exists "reviews_public_read" on public.reviews;
create policy "reviews_public_read" on public.reviews
  for select to anon, authenticated using (is_published or public.is_admin());

drop policy if exists "reviews_public_submit" on public.reviews;
create policy "reviews_public_submit" on public.reviews
  for insert to anon, authenticated with check (is_published = false);

drop policy if exists "reviews_admin_all" on public.reviews;
create policy "reviews_admin_all" on public.reviews
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- gallery: public reads, admins manage
drop policy if exists "gallery_public_read" on public.gallery;
create policy "gallery_public_read" on public.gallery
  for select to anon, authenticated using (true);

drop policy if exists "gallery_admin_all" on public.gallery;
create policy "gallery_admin_all" on public.gallery
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- private admin-only tables
drop policy if exists "customers_admin_all" on public.customers;
create policy "customers_admin_all" on public.customers
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "bookings_admin_all" on public.bookings;
create policy "bookings_admin_all" on public.bookings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "calendar_events_admin_all" on public.calendar_events;
create policy "calendar_events_admin_all" on public.calendar_events
  for all to authenticated using (public.is_admin()) with check (public.is_admin());


-- ---------------------------------------------------------------------
-- 14. STORAGE BUCKET for gallery / tour images
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gallery', 'gallery', true, 5242880,  -- 5 MB
        array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do nothing;

drop policy if exists "gallery_files_public_read" on storage.objects;
create policy "gallery_files_public_read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'gallery');

drop policy if exists "gallery_files_admin_insert" on storage.objects;
create policy "gallery_files_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "gallery_files_admin_update" on storage.objects;
create policy "gallery_files_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "gallery_files_admin_delete" on storage.objects;
create policy "gallery_files_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'gallery' and public.is_admin());


-- ---------------------------------------------------------------------
-- 15. SEED: tours offered in the booking form
--     (prices left NULL where unknown — edit in Table Editor)
-- ---------------------------------------------------------------------
insert into public.tours (title, slug, type, category, price_inr, duration, main_image_url) values
  ('Kolukkumalai Sunrise Trek', 'kolukkumalai-sunrise-trek', 'safari',  'Jeep Safari & Sunrise', 1500, '4 Hours',  '/images/kolukkumalai_sunrise_view.jpg'),
  ('Chokramudi Trek',           'chokramudi-trek',           'trek',    'Peak Trek',             2500, null,       null),
  ('Meesapulimala Trek',        'meesapulimala-trek',        'trek',    'High Altitude Trek',    2500, 'Full Day', '/images/meesapulimala.png'),
  ('Soft Hiking',               'soft-hiking',               'hike',    'Easy Hike',             null, null,       null),
  ('Half Day Hike',             'half-day-hike',             'hike',    'Hike',                  null, 'Half Day', null),
  ('Full Day Trek',             'full-day-trek',             'trek',    'Trek',                  null, 'Full Day', null),
  ('Jeep Safari',               'jeep-safari',               'safari',  'Off-Road Safari',       2500, 'Half Day', '/images/jeep_safari_anakulam_hq.jpg'),
  ('Tent Camping',              'tent-camping',              'camping', 'Camping',               null, null,       null)
on conflict (slug) do nothing;


-- =====================================================================
-- 16. MAKE YOURSELF AN ADMIN  (run once, after creating your user in
--     Dashboard → Authentication → Users → "Add user")
--     Replace the email below, uncomment, and run:
-- =====================================================================
-- insert into public.admins (id, name, email)
-- select id, 'Your Name', email
-- from auth.users
-- where email = 'you@example.com'
-- on conflict (id) do nothing;
