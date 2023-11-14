"use client";

import React, { useEffect, useState } from "react";
import client from "../lib/contentful";
import Link from "next/link";

function Resume() {
  const [content, setContent] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const entryId = process.env.NEXT_PUBLIC_CONTENTFUL_RESUME_ENTRY_ID as
          | string
          | undefined;
        if (!entryId) {
          console.error("CONTENTFUL_RESUME_ENTRY_ID is not defined");
          return;
        }
        const entry = await client.getEntry(entryId);
        setContent(entry.fields);
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    };

    fetchData();
  }, []);

  if (!content) {
    return (
      <button className="flex items-center gap-1 bg-teal-500/30 py-2 px-4 mt-3 rounded-lg text-teal-500">
        loading
      </button>
    );
  }

  const fileUrl = content?.resume?.fields?.file?.url;
  const fileType = content?.resume?.fields?.file?.contentType;

  return (
    <div>
      <Link download href={fileUrl}>
        <button className="flex items-center gap-1 bg-teal-500/30 py-2 px-4 mt-3 rounded-lg text-teal-500">
          Resume
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-teal-500 hover:text-teal-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default Resume;
