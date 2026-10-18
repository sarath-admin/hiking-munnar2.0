'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Send, CheckCircle2, MessageSquare, Calendar, Users, MapPin, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { saveEnquiryToStore } from '@/lib/adminData';

const bookingSchema = z.object({
  tour_name: z.string().min(1, 'Tour name is required'),
  name: z.string().min(2, 'Please enter your full name (at least 2 characters)'),
  phone: z.string().min(10, 'Please enter a valid phone number (at least 10 digits)'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  tour_date: z.string().min(1, 'Please select your preferred date'),
  group_size: z.coerce.number().min(1, 'Group size must be at least 1 person'),
  pickup_location: z.string().optional(),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface TourBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName: string;
  tourPrice?: string;
}

export default function TourBookingModal({
  isOpen,
  onClose,
  tourName,
  tourPrice,
}: TourBookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919496520787';
  const cleanPhone = whatsappNumber.replace('+', '').replace(/\s+/g, '');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tour_name: tourName,
      group_size: 2,
      tour_date: '',
      pickup_location: 'Munnar Town / Hotel Pickup',
      message: '',
    },
  });

  // Keep tour name in sync when prop changes
  useEffect(() => {
    if (tourName) {
      setValue('tour_name', tourName);
    }
  }, [tourName, setValue]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSuccess(false);
      setErrorMessage('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 1. Save to local/admin store
      try {
        await saveEnquiryToStore({
          name: data.name,
          email: data.email || '',
          phone: data.phone,
          destination: data.tour_name,
          date: data.tour_date,
          travelers: Number(data.group_size),
          budget: tourPrice || 'Standard Rate',
          status: 'new',
          message: `${data.pickup_location ? `[Pickup: ${data.pickup_location}] ` : ''}${data.message || ''}`,
        });
      } catch (storeErr) {
        console.warn('Admin store notice:', storeErr);
      }

      // 2. Direct Supabase sync if live credentials available
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      if (supabaseUrl && !supabaseUrl.includes('placeholder')) {
        try {
          await supabase.from('enquiries').insert([
            {
              name: data.name,
              phone: data.phone,
              email: data.email || null,
              tour_name: data.tour_name,
              tour_date: data.tour_date,
              group_size: data.group_size,
              message: `${data.pickup_location ? `Pickup: ${data.pickup_location}. ` : ''}${data.message || ''}`,
              status: 'new',
            },
          ]);
        } catch (sbErr) {
          console.warn('Supabase optional notice:', sbErr);
        }
      }

      // 3. Format WhatsApp booking message
      const text = `Hi Munnar Hiking Tours, I would like to book the following tour:
*Tour:* ${data.tour_name}
*Date:* ${data.tour_date}
*Guests:* ${data.group_size} person(s)
*Name:* ${data.name}
*Phone:* ${data.phone}${data.email ? `\n*Email:* ${data.email}` : ''}${data.pickup_location ? `\n*Pickup:* ${data.pickup_location}` : ''}${data.message ? `\n*Note:* ${data.message}` : ''}

Please confirm availability and share payment/reporting details. Thank you!`;

      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;

      setIsSuccess(true);

      // Open WhatsApp automatically in a new tab
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 700);
    } catch (err) {
      console.error('Booking submission error:', err);
      setErrorMessage('Unable to process automatically. Please connect directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualWhatsApp = () => {
    const text = `Hi Munnar Hiking Tours, I am interested in booking *${tourName}*. Please share available dates and pricing!`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-zinc-950 text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-6 pb-4 bg-gradient-to-r from-emerald-950/70 via-zinc-900 to-emerald-950/70 border-b border-white/10 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X size={20} />
          </button>

          <span className="inline-block px-3 py-1 mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            Direct Trail Reservation
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif leading-tight">
            Book This Tour
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 truncate">
            {tourName}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10 animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-white">Booking Request Prepared!</h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Your reservation details have been captured and WhatsApp is opening now to confirm your schedule with our local coordinator.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleManualWhatsApp}
                  className="bg-[#25D366] hover:bg-[#1faa53] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                >
                  <MessageSquare size={18} />
                  Open WhatsApp Chat
                </button>
                <button
                  onClick={onClose}
                  className="bg-zinc-800 hover:bg-zinc-700 text-gray-200 font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer text-sm"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {errorMessage && (
                <div className="p-3 text-xs bg-red-950/80 border border-red-500/40 text-red-300 rounded-xl">
                  {errorMessage}
                </div>
              )}

              {/* Selected Tour (Read-only / Preselected) */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Selected Tour
                </label>
                <div className="relative">
                  <input
                    {...register('tour_name')}
                    readOnly
                    className="w-full bg-zinc-900/90 border border-white/10 rounded-xl py-3 px-4 text-sm font-semibold text-emerald-400 focus:outline-none cursor-default"
                  />
                </div>
              </div>

              {/* Name & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      {...register('name')}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full bg-zinc-900 border ${
                        errors.name ? 'border-red-500' : 'border-white/10'
                      } rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      {...register('phone')}
                      placeholder="+91 98765 43210"
                      className={`w-full bg-zinc-900 border ${
                        errors.phone ? 'border-red-500' : 'border-white/10'
                      } rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Email & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="rahul@example.com"
                      className={`w-full bg-zinc-900 border ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      {...register('tour_date')}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full bg-zinc-900 border ${
                        errors.tour_date ? 'border-red-500' : 'border-white/10'
                      } rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors [color-scheme:dark]`}
                    />
                  </div>
                  {errors.tour_date && (
                    <p className="text-red-400 text-xs mt-1">{errors.tour_date.message}</p>
                  )}
                </div>
              </div>

              {/* Guests & Pickup Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      {...register('group_size')}
                      type="number"
                      min={1}
                      max={40}
                      className={`w-full bg-zinc-900 border ${
                        errors.group_size ? 'border-red-500' : 'border-white/10'
                      } rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors`}
                    />
                  </div>
                  {errors.group_size && (
                    <p className="text-red-400 text-xs mt-1">{errors.group_size.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      {...register('pickup_location')}
                      placeholder="Hotel name or Munnar town"
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Special Requests or Notes (Optional)
                </label>
                <textarea
                  {...register('message')}
                  rows={2}
                  placeholder="Need jeep pickup, diet preferences, photography focus, or private tour..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all cursor-pointer disabled:opacity-50 text-base"
                >
                  {isSubmitting ? (
                    <span>Confirming Booking...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Confirm & Book on WhatsApp</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-gray-400 px-1 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    Zero advance payment required
                  </span>
                  <span>Free cancel up to 24h prior</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
