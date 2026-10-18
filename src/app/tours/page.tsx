import React from 'react';
import type { Metadata } from 'next';
import ToursCatalogClient from '@/components/ToursCatalogClient';

export const metadata: Metadata = {
  title: 'Munnar Hiking Tours & Jeep Safaris | All Tour Packages',
  description: 'Explore the complete collection of trekking tours, off-road jeep safaris, sunrise peaks, tea plantation walks, and wildlife sanctuary tours in Munnar.',
};

export default function ToursPage() {
  return <ToursCatalogClient />;
}
