"use client";

import React, { useEffect, useState } from "react";
import client from "../lib/contentful";
import Link from "next/link";

function Resume() {
  const [content, setContent] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const entryId = process.env.NEXT_PUBLIC_CONTENTFUL_RESUME_ENTRY_ID as string | undefined;
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
    return <div>Loading...</div>;
  }

  const fileUrl = content?.resume?.fields?.file?.url;
  const fileType = content?.resume?.fields?.file?.contentType;

  return (
    <div>
      <Link download href={fileUrl}>
        Resume
      </Link>
    </div>
  );
}

export default Resume;
