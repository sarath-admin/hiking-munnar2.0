import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TourDetailsClient from '@/components/TourDetailsClient';
import { getTourBySlug, getAllTourSlugs } from '@/data/toursData';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllTourSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: 'Tour Not Found | Munnar Hiking Tours',
      description: 'The requested tour package could not be found.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.munnarhikingtours.com';
  const pageUrl = `${siteUrl}/tours/${tour.slug}`;

  return {
    title: `${tour.title} | Munnar Hiking Tours`,
    description: tour.shortDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${tour.title} – Munnar Hiking Tours`,
      description: tour.shortDescription,
      url: pageUrl,
      siteName: 'Munnar Hiking Tours',
      images: [
        {
          url: tour.imageUrl.startsWith('http') ? tour.imageUrl : `${siteUrl}${tour.imageUrl}`,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tour.title} | Munnar Hiking Tours`,
      description: tour.shortDescription,
      images: [tour.imageUrl.startsWith('http') ? tour.imageUrl : `${siteUrl}${tour.imageUrl}`],
    },
  };
}

// Inner async component to resolve URL params behind Suspense
async function TourContent({ params }: PageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return <TourDetailsClient tour={tour} />;
}

// Root page component: Renders App Shell immediately, streams URL data behind Suspense
export default function TourPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#14171A] flex flex-col items-center justify-center pt-24 text-white">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-300 font-medium text-base">Loading tour details...</p>
        </div>
      }
    >
      <TourContent params={params} />
    </Suspense>
  );
}
