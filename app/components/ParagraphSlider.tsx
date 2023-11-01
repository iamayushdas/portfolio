"use client";
import React, { useState } from 'react';

const ParagraphSlider = ({ paragraphs }: any) => {
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const nextParagraph = () => {
    setCurrentParagraph((prev) => (prev === paragraphs.length - 1 ? 0 : prev + 1));
  };

  const previousParagraph = () => {
    setCurrentParagraph((prev) => (prev === 0 ? paragraphs.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="prose max-w-none prose-lg pt-8 pb-7 dark:prose-invert xl:col-span-2">
        <p>{paragraphs[currentParagraph]}</p>
        <div className="flex justify-between items-center px-4 sm:px-0 pt-4">
        <button onClick={previousParagraph}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-teal-500 hover:text-teal-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {paragraphs.map((_:any, index:any) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentParagraph ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            ></span>
          ))}
        </div>
        <button onClick={nextParagraph}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-teal-500 hover:text-teal-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
      </div>

    </>
  );
};

export default ParagraphSlider;
