type ResumeJSON = {
  name?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  skills?: Record<string, string[]>;
  experience?: {
    company: string;
    date_range: string;
    title: string;
    responsibilities: string[];
  }[];
  education?: {
    institution: string;
    date_range: string;
    degree: string;
    cgpa?: string;
  };
  additional_contributions?: string[];
};

export function parseResumeTextToJSON(resumeText: string): ResumeJSON {
  const json: ResumeJSON = {};

  // Normalize whitespace
  const text = resumeText.replace(/\s+/g, " ").trim();

  // Basic info
  json.name = text.match(/Ayush\s+Das/i)?.[0] || undefined;
  json.phone = text.match(/\b\d{3,5}[-\s]?\d{3}[-\s]?\d{3,4}\b/)?.[0];
  json.email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0];
  json.linkedin = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i)?.[0]
    ? `https://${text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i)?.[0]}`
    : undefined;
  json.github = text.match(/github\.com\/[a-zA-Z0-9_-]+/i)?.[0]
    ? `https://${text.match(/github\.com\/[a-zA-Z0-9_-]+/i)?.[0]}`
    : undefined;

  // Summary
  const summaryMatch = text.match(/Summary\s*[-–—]?\s*(.*?)Skills/i);
  if (summaryMatch) json.summary = summaryMatch[1].trim();

  // Skills extraction
  const skillsMatch = text.match(/Skills\s*(.*?)Experience/i);
  if (skillsMatch) {
    const skillsText = skillsMatch[1];
    json.skills = {
      languages: skillsText.match(/Languages\s*(.*?)Frontend/i)?.[1]?.split(/[,;]/).map(s => s.trim()) || [],
      frontend: skillsText.match(/Frontend\s*(.*?)Backend/i)?.[1]?.split(/[,;]/).map(s => s.trim()) || [],
      backend_db: skillsText.match(/Backend\/DB\s*(.*?)AI\/ML/i)?.[1]?.split(/[,;]/).map(s => s.trim()) || [],
      ai_ml: skillsText.match(/AI\/ML\s*(.*?)DevOps/i)?.[1]?.split(/[,;]/).map(s => s.trim()) || [],
      devops: skillsText.match(/DevOps\s*(.*?)Others/i)?.[1]?.split(/[,;]/).map(s => s.trim()) || [],
      others: skillsText.match(/Others\s*(.*)/i)?.[1]?.split(/[,;]/).map(s => s.trim()) || []
    };
  }

  // Experience (chunk by company keywords)
  const expSection = text.match(/Experience\s*(.*?)Education/i)?.[1] || "";
  const expBlocks = expSection.split(/(?=[A-Z][a-z]+(?:Global|Solutions|APISIX|Plan))/);
  json.experience = [];

  for (const block of expBlocks) {
    if (!block.trim()) continue;
    const companyMatch = block.match(/([A-Z][A-Za-z\s&.]+Ltd|APISIX|Plan)/);
    const company = companyMatch?.[0]?.trim() || "";
    const date = block.match(/[A-Z][a-z]{2}\s?\d{4}\s?[–-]\s?[A-Z][a-z]{2}\s?\d{4}|Present/i)?.[0] || "";
    const title = block.match(/(Engineer|Analyst|Intern)[A-Za-z\s()]*/i)?.[0]?.trim() || "";
    const bullets = block.split(/[–-]\s/).slice(1).map(b => b.trim()).filter(Boolean);
    json.experience.push({ company, date_range: date, title, responsibilities: bullets });
  }

  // Education
  const eduMatch = text.match(/Education\s*(.*?)Additional/i);
  if (eduMatch) {
    const eduText = eduMatch[1];
    json.education = {
      institution: eduText.match(/Maharaja.*Technology/i)?.[0]?.trim() || "",
      date_range: eduText.match(/[A-Z][a-z]{2}\s?\d{4}\s?[–-]\s?[A-Z][a-z]{2}\s?\d{4}/)?.[0] || "",
      degree: eduText.match(/Bachelor.*Technology.*Information Technology/i)?.[0]?.trim() || "",
      cgpa: eduText.match(/CGPA[:\s]*([\d.]+)/i)?.[1]
    };
  }

  // Additional Contributions
  const addMatch = text.match(/Additional.*?(Google.*)$/i);
  if (addMatch) {
    json.additional_contributions = addMatch[1]
      .split(/–|-/)
      .map(line => line.trim())
      .filter(Boolean);
  }

  return json;
}
