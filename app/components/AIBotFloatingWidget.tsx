"use client";

import React, { useState } from "react";
import AIBotChat from "./AIBotChat";

export default function AIBotFloatingWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Bot Button - Desktop Only */}
      <button
        aria-label="Open AI Chatbot"
        className="hidden sm:flex fixed bottom-6 right-6 z-50 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-full shadow-2xl w-14 h-14 items-center justify-center focus:outline-none focus:ring-4 focus:ring-teal-500/50 transition-all hover:scale-110 active:scale-95 group"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Pulse rings */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping"></span>
        <span className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 opacity-50"></span>
        
        {/* Bot Icon with animation */}
        <svg 
          width="28" 
          height="28" 
          fill="none" 
          viewBox="0 0 24 24" 
          className={`relative z-10 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          {open ? (
            // Close icon
            <>
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          ) : (
            // Bot icon
            <>
              <path d="M12 2a2 2 0 012 2v1h3a2 2 0 012 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h3V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="11" r="1.5" fill="currentColor"/>
              <circle cx="15" cy="11" r="1.5" fill="currentColor"/>
              <path d="M9 15c.5.5 1.5 1 3 1s2.5-.5 3-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </>
          )}
        </svg>
        
        {/* Notification badge (optional - can be activated for new features) */}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></span>
        )}
      </button>

      {/* Chatbot Panel - Desktop Only */}
      {open && (
        <div className="hidden sm:block fixed bottom-6 right-6 z-50 w-[450px] h-[650px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] animate-in slide-in-from-bottom-8 fade-in duration-300">
          <AIBotChat onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
