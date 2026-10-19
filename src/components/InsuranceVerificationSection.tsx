'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, ExternalLink, FileCheck, CheckCircle2, Eye, X, Award } from 'lucide-react';

export default function InsuranceVerificationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mt-12 pt-10 border-t border-[#233329] text-left">
        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A2E22] border border-[#2E543C] text-emerald-300 text-xs font-bold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Client Safety & Insurance Guarantee
          </div>
          <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Digitally Signed & Verified
          </span>
        </div>

        {/* Insurance Card Container */}
        <div className="bg-gradient-to-br from-[#152019] to-[#0e1611] rounded-2xl p-6 md:p-8 border border-[#294233] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Insurance Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-12 bg-white rounded-lg p-1.5 shadow-md flex items-center justify-center shrink-0">
                  <Image
                    src="/images/uiic_logo.png"
                    alt="United India Insurance Company Limited"
                    width={56}
                    height={38}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg md:text-xl font-serif">
                    United India Insurance Company Limited
                  </h4>
                  <p className="text-xs text-emerald-400/90 font-medium">
                    Branch Office Adimaly, Idukki, Kerala – 685561
                  </p>
                </div>
              </div>

              <div className="bg-[#0b120e]/80 rounded-xl p-4 border border-[#1f3327] space-y-2 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block">Policy Type:</span>
                    <strong className="text-gray-200 font-semibold">Public Liability Non Industrial Policy</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Policy Number:</span>
                    <strong className="text-[#FFA94D] font-mono tracking-wider">1011042726P104867250</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Insured Under:</span>
                    <strong className="text-gray-200 font-semibold">
                      M/s HIGHRANGE ADVENTURE PROMOTERS SOCIETY, MUNNAR
                    </strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Period of Insurance:</span>
                    <strong className="text-emerald-400">03/07/2026 to 02/07/2027</strong>
                  </div>
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                We claim complete insurance protection for all our clients. Every trekking trail, mountain hike, and jeep safari guest is covered under our government-registered Public Liability Insurance policy for a worry-free Kerala adventure.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-md shadow-emerald-900/30 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  View Official Certificate
                </button>
                <a
                  href="http://www.uiic.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#1C2C22] hover:bg-[#253d2f] text-emerald-300 border border-[#2E543C] text-xs md:text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Verify on UIIC Portal (uiic.co.in)
                </a>
              </div>
            </div>

            {/* Right Column: QR Code verification box */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="bg-white p-3 rounded-2xl shadow-2xl border-2 border-[#FFA94D]/30 inline-block hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
                title="Click to view full policy certificate"
              >
                <div className="relative w-32 h-32 md:w-36 md:h-36">
                  <Image
                    src="/images/insurance_qr_code.png"
                    alt="Scan to Verify Insurance Policy"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-white block uppercase tracking-wider">
                  Scan to Verify Policy
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  Direct government portal verification
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Certificate Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-[#121814] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#2A4136] shadow-2xl p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-white font-bold text-base md:text-lg">
                  Official Public Liability Insurance Policy
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition-colors"
                aria-label="Close certificate modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Certificate Image */}
            <div className="py-4 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[700/1024] rounded-lg overflow-hidden border border-gray-700 shadow-xl bg-white">
                <Image
                  src="/images/insurance_policy_certificate.jpg"
                  alt="United India Insurance Public Liability Policy Certificate"
                  fill
                  className="object-contain"
                  quality={95}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
              <div>
                Policy No: <strong className="text-white">1011042726P104867250</strong>
              </div>
              <div className="flex gap-2">
                <a
                  href="/images/insurance_policy_certificate.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Full Resolution
                </a>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
