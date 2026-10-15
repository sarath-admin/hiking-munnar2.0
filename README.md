# Munnar Hiking Tours Website

A complete, production-ready, mobile-first website for a Munnar trekking and hiking tour company. 

## Features

- **Next.js App Router**: Optimized with Server Components, Server Actions, static generation, and ISR.
- **Tailwind CSS v4**: Beautiful, custom-designed UI with modern styling.
- **Supabase Integration**: PostgreSQL database for enquiries, tours, reviews, and a secure admin panel.
- **Mobile-First Conversions**: Sticky WhatsApp buttons, click-to-call, and optimized booking forms.
- **SEO & Performance**: Server-rendered metadata, semantic HTML, self-hosted fonts, high Lighthouse scores.

## Setup Instructions

### 1. Environment Variables

Rename `.env.example` to `.env.local` and add your Supabase credentials.

```bash
cp .env.example .env.local
```

You'll need to set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER` (format: +919496520787)
- `NEXT_PUBLIC_CONTACT_NUMBER` (format: +919496520787)

### 2. Database Setup (Supabase)

1. Create a new project in Supabase.
2. Go to the SQL Editor.
3. Copy the contents of `supabase/schema.sql` and run it. This will create all necessary tables and Row Level Security (RLS) policies.

### 3. Installation

Install all dependencies:

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Go to Vercel and import the repository.
3. Add the Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, etc.) in the Vercel project settings.
4. Deploy!

## Post-Launch SEO Checklist

- [ ] Connect Google Search Console and submit the sitemap (`/sitemap.xml`).
- [ ] Connect Google Analytics 4 (GA4) for click tracking (add your tag id).
- [ ] Create/Update Google Business Profile with consistent NAP (Name, Address, Phone).
- [ ] Ensure all individual trek pages have unique H1s and Meta descriptions.
- [ ] Share on social media and build local backlinks.
