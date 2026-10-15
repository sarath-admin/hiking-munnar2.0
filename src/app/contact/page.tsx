import React from 'react';
import BookingForm from '@/components/BookingForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Munnar Hiking Tours',
  description: 'Get in touch with Munnar Hiking Tours to book your next mountain adventure.',
};

export default function ContactPage() {
  const contactNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER || '+919496520787';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919496520787';
  
  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-dark)] mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready for your next adventure? Reach out to us for bookings, custom itinerary requests, or general inquiries. We typically reply within an hour!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Details */}
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-dark)]">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone / WhatsApp</h3>
                    <p className="text-gray-600 mb-2">Available 24/7 for urgent bookings</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a href={`tel:${contactNumber}`} className="text-[var(--color-primary)] font-bold text-lg hover:underline">{contactNumber}</a>
                      <a 
                        href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent("Hi! I would like to enquire about Munnar hiking tours.")}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                    <p className="text-gray-600 mb-2">For custom corporate or large group packages</p>
                    <a href="mailto:hello@munnarhikingtours.com" className="text-[var(--color-primary)] font-bold text-lg hover:underline">hello@munnarhikingtours.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Base Camp / Office</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Munnar Hiking Tours Building,<br/>
                      Near KSRTC Bus Stand,<br/>
                      Munnar, Kerala 685612
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--color-primary)] text-white p-8 rounded-2xl shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={28} />
                <h2 className="text-2xl font-bold">Office Hours</h2>
              </div>
              <p className="text-green-100 mb-2">Monday - Sunday</p>
              <p className="text-xl font-semibold">6:00 AM - 10:00 PM</p>
              <p className="text-sm mt-4 text-green-200 italic">*Trek operations run 24/7 as scheduled.</p>
            </div>
          </div>
          
          {/* Booking Form */}
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold mb-2 text-[var(--color-dark)]">Send an Enquiry</h2>
              <p className="text-gray-500 mb-8 text-sm">Fill out the form below and we will redirect you to our WhatsApp directly!</p>
              <BookingForm />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
