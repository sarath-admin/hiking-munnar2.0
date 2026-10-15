import React from 'react';

export default function TrekerLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Treker Custom Stylized 'T' Symbol */}
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center p-1.5 shadow-md shadow-orange-500/20">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
          <path
            d="M4 6.5C4 5.67157 4.67157 5 5.5 5H18.5C19.3284 5 20 5.67157 20 6.5C20 7.32843 19.3284 8 18.5 8H13.5V18.5C13.5 19.3284 12.8284 20 12 20C11.1716 20 10.5 19.3284 10.5 18.5V8H5.5C4.67157 8 4 7.32843 4 6.5Z"
            fill="currentColor"
          />
          <path
            d="M6 11C6 10.4477 6.44772 10 7 10C8.5 10 10 11 10.5 12.5C11 14 10 16 8 16.5C6.5 17 6 15.5 6 15V11Z"
            fill="white"
            fillOpacity="0.4"
          />
        </svg>
      </div>

      <span className="font-extrabold text-2xl tracking-tight text-white font-sans">
        Treker
      </span>
    </div>
  );
}
