'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { saveEnquiryToStore } from '@/lib/adminData';
import { Send, CheckCircle2 } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  tour_name: z.string().min(1, 'Please select a trek/package'),
  tour_date: z.string().min(1, 'Date is required'),
  group_size: z.coerce.number().min(1, 'At least 1 person'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BookingForm({ initialTour = '' }: { initialTour?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tour_name: initialTour,
      group_size: 2,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // 1. Save directly to Admin Dashboard store
      try {
        saveEnquiryToStore({
          name: data.name,
          email: data.email || '',
          phone: data.phone,
          destination: data.tour_name,
          date: data.tour_date,
          travelers: Number(data.group_size),
          budget: 'Custom / Standard',
          status: 'new',
          message: data.message,
        });
      } catch (storeErr) {
        console.warn('Local store sync error:', storeErr);
      }

      // 2. Try Supabase if real credentials are configured (not placeholder)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      if (supabaseUrl && !supabaseUrl.includes('placeholder')) {
        try {
          await supabase.from('enquiries').insert([data]);
        } catch (sbErr) {
          console.warn('Supabase optional sync error:', sbErr);
        }
      }
      
      // 3. Open WhatsApp with formatted booking message
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919496520787';
      const text = `Hi Munnar Hiking Tours, I want to book ${data.tour_name} on ${data.tour_date} for ${data.group_size} people.\n\nName: ${data.name}\nPhone: ${data.phone}${data.email ? `\nEmail: ${data.email}` : ''}${data.message ? `\nNote: ${data.message}` : ''}`;
      const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
      
      setIsSuccess(true);
      window.open(url, '_blank');
      
    } catch (error) {
      console.error('Error submitting form', error);
      // Fallback: still allow user to chat on WhatsApp directly
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919496520787';
      const text = `Hi Munnar Hiking Tours, I want to book ${data.tour_name} on ${data.tour_date} for ${data.group_size} people.\nName: ${data.name}\nPhone: ${data.phone}`;
      const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
      setIsSuccess(true);
      window.open(url, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-xl text-center shadow-sm">
        <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
        <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
        <p>We've received your enquiry and opened a WhatsApp chat to confirm the details. We'll also get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <h3 className="text-2xl font-bold mb-6 text-[var(--color-dark)]">Book Your Adventure</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input 
            {...register('name')} 
            className={`w-full p-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (WhatsApp) *</label>
          <input 
            {...register('phone')} 
            className={`w-full p-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all`}
            placeholder="+91 98XXXXXXXX"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
        <input 
          {...register('email')} 
          type="email"
          className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Trek / Package *</label>
        <select 
          {...register('tour_name')} 
          className={`w-full p-3 rounded-lg border ${errors.tour_name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all bg-white`}
        >
          <option value="">-- Choose an option --</option>
          <option value="Kolukkumalai Sunrise Trek">Kolukkumalai Sunrise Trek</option>
          <option value="Chokramudi Trek">Chokramudi Trek</option>
          <option value="Meesapulimala Trek">Meesapulimala Trek</option>
          <option value="Soft Hiking">Soft Hiking</option>
          <option value="Half Day Hike">Half Day Hike</option>
          <option value="Full Day Trek">Full Day Trek</option>
          <option value="Jeep Safari">Munnar Jeep Safari</option>
          <option value="Tent Camping">Tent Camping</option>
        </select>
        {errors.tour_name && <p className="text-red-500 text-xs mt-1">{errors.tour_name.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
          <input 
            {...register('tour_date')} 
            type="date"
            className={`w-full p-3 rounded-lg border ${errors.tour_date ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all`}
          />
          {errors.tour_date && <p className="text-red-500 text-xs mt-1">{errors.tour_date.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of People *</label>
          <input 
            {...register('group_size')} 
            type="number"
            min="1"
            className={`w-full p-3 rounded-lg border ${errors.group_size ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all`}
          />
          {errors.group_size && <p className="text-red-500 text-xs mt-1">{errors.group_size.message}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message (Optional)</label>
        <textarea 
          {...register('message')} 
          rows={3}
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all"
          placeholder="Any special requirements?"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl disabled:opacity-70"
      >
        {isSubmitting ? (
          'Processing...'
        ) : (
          <>
            <Send size={20} />
            Book via WhatsApp
          </>
        )}
      </button>
      
      <p className="text-center text-xs text-gray-500 mt-4">
        Free cancellation up to 24 hrs before the trek.
      </p>
    </form>
  );
}
