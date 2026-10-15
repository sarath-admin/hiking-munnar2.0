-- Supabase SQL Schema for Munnar Hiking Tours

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ENQUIRIES TABLE
create table public.enquiries (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    phone text not null,
    email text,
    tour_name text,
    tour_date date,
    group_size integer,
    message text,
    status text default 'new'::text check (status in ('new', 'contacted', 'confirmed'))
);

-- 2. TOURS TABLE
create table public.tours (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    slug text not null unique,
    type text not null check (type in ('trek', 'safari', 'camping', 'package')),
    price_inr integer,
    duration text,
    difficulty text,
    short_description text,
    content text,
    itinerary jsonb, -- array of objects: {day, title, description}
    inclusions jsonb, -- array of strings
    exclusions jsonb, -- array of strings
    what_to_carry jsonb, -- array of strings
    main_image_url text,
    seo_title text,
    seo_meta_desc text,
    is_published boolean default true
);

-- 3. REVIEWS TABLE
create table public.reviews (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    tour_id uuid references public.tours(id) on delete cascade,
    author_name text not null,
    rating integer check (rating >= 1 and rating <= 5),
    text text not null,
    is_published boolean default false
);

-- 4. GALLERY TABLE
create table public.gallery (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    image_url text not null,
    alt_text text,
    tour_id uuid references public.tours(id) on delete set null
);

-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enquiries: public can insert, authenticated can read/update
alter table public.enquiries enable row level security;

create policy "Public can insert enquiries"
    on public.enquiries for insert
    to public
    with check (true);

create policy "Authenticated admins can view enquiries"
    on public.enquiries for select
    to authenticated
    using (true);

create policy "Authenticated admins can update enquiries"
    on public.enquiries for update
    to authenticated
    using (true);

-- Tours: public can read published, authenticated can do all
alter table public.tours enable row level security;

create policy "Public can view published tours"
    on public.tours for select
    to public
    using (is_published = true);

create policy "Authenticated admins can manage tours"
    on public.tours for all
    to authenticated
    using (true);

-- Reviews: public can read published, authenticated can do all
alter table public.reviews enable row level security;

create policy "Public can view published reviews"
    on public.reviews for select
    to public
    using (is_published = true);

create policy "Authenticated admins can manage reviews"
    on public.reviews for all
    to authenticated
    using (true);

-- Gallery: public can view, authenticated can do all
alter table public.gallery enable row level security;

create policy "Public can view gallery"
    on public.gallery for select
    to public
    using (true);

create policy "Authenticated admins can manage gallery"
    on public.gallery for all
    to authenticated
    using (true);
