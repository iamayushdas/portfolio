"use client";

import React, { useState } from "react";
import AIBotChat from "./AIBotChat";

export default function AIBotFloatingWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Bot Icon */}
      <button
        aria-label="Open AI Chatbot"
        className="fixed bottom-6 right-6 z-50 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center focus:outline-none focus:ring"
        onClick={() => setOpen((v) => !v)}
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
      >
        {/* Bot SVG Icon */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M8 15c1.333 1 4.667 1 6 0" strokeWidth="2" strokeLinecap="round" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
        </svg>
      </button>
      {/* Chatbot Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[90vw]">
          <div className="relative">
            <button
              aria-label="Close AI Chatbot"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              onClick={() => setOpen(false)}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth="2" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <AIBotChat />
          </div>
        </div>
      )}
    </>
  );
}
