/**
 * PDF Parser Utility
 * 
 * This utility provides robust PDF parsing functionality with pdf2json.
 * It supports both URL-based and buffer-based PDF parsing.
 */

import PDFParser from "pdf2json";

export interface PDFParseResult {
  text: string;
  numPages: number;
  metadata?: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string;
    creator?: string;
    producer?: string;
    creationDate?: Date;
    modificationDate?: Date;
  };
}

export interface PDFParseOptions {
  method?: 'pdf2json';
  maxPages?: number;
  preserveFormatting?: boolean;
}

/**
 * Parse PDF from a buffer using pdf2json
 */
async function parsePDFWithPdf2Json(buffer: Buffer): Promise<PDFParseResult> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    
    let extractedText = "";
    let pageCount = 0;

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error("pdf2json parsing error:", errData.parserError);
      reject(new Error(`pdf2json failed: ${errData.parserError}`));
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        pageCount = pdfData.Pages?.length || 0;
        
        // Extract text from all pages
        if (pdfData.Pages) {
          for (const page of pdfData.Pages) {
            if (page.Texts) {
              for (const text of page.Texts) {
                if (text.R) {
                  for (const run of text.R) {
                    if (run.T) {
                      // Decode URI-encoded text with error handling
                      try {
                        extractedText += decodeURIComponent(run.T) + " ";
                      } catch (e) {
                        // If decoding fails, use the text as-is
                        extractedText += run.T + " ";
                      }
                    }
                  }
                }
              }
              extractedText += "\n";
            }
          }
        }

        resolve({
          text: extractedText.trim(),
          numPages: pageCount,
          metadata: {
            title: pdfData.Meta?.Title,
            author: pdfData.Meta?.Author,
            subject: pdfData.Meta?.Subject,
            keywords: pdfData.Meta?.Keywords,
            creator: pdfData.Meta?.Creator,
            producer: pdfData.Meta?.Producer,
          },
        });
      } catch (error) {
        reject(new Error(`Error processing pdf2json data: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    });

    // Parse the buffer
    pdfParser.parseBuffer(buffer);
  });
}

/**
 * Fetch PDF from URL and return as buffer
 */
async function fetchPDFBuffer(url: string): Promise<Buffer> {
  try {
    const fullUrl = url.startsWith('http') ? url : `https:${url}`;
    const response = await fetch(fullUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error fetching PDF:", error);
    throw new Error(`Failed to fetch PDF from URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Main PDF parsing function
 */
export async function parsePDF(
  input: string | Buffer,
  options: PDFParseOptions = {}
): Promise<PDFParseResult> {
  try {
    // Get buffer from input
    let buffer: Buffer;
    if (typeof input === 'string') {
      console.log("Fetching PDF from URL:", input);
      buffer = await fetchPDFBuffer(input);
    } else {
      buffer = input;
    }

    console.log(`PDF buffer size: ${buffer.length} bytes`);

    // Parse using pdf2json
    console.log("Parsing PDF with pdf2json...");
    const result = await parsePDFWithPdf2Json(buffer);
    console.log(`Successfully parsed ${result.numPages} pages with pdf2json`);
    return result;
    
  } catch (error) {
    console.error("PDF parsing failed:", error);
    throw new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Clean and normalize extracted PDF text
 */
export function cleanPDFText(text: string): string {
  return text
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Remove multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim each line
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')
    .trim();
}

/**
 * Extract specific sections from PDF text based on headings
 */
export function extractSections(text: string, sectionTitles: string[]): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = text.split('\n');
  
  let currentSection: string | null = null;
  let currentContent: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check if line matches any section title
    const matchedSection = sectionTitles.find(title => 
      trimmedLine.toLowerCase().includes(title.toLowerCase()) ||
      trimmedLine.toLowerCase() === title.toLowerCase()
    );

    if (matchedSection) {
      // Save previous section if exists
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      
      // Start new section
      currentSection = matchedSection;
      currentContent = [];
    } else if (currentSection) {
      // Add content to current section
      if (trimmedLine) {
        currentContent.push(trimmedLine);
      }
    }
  }

  // Save last section
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  return sections;
}

/**
 * Parse resume-specific information from PDF
 */
export interface ResumeData {
  rawText: string;
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  sections: Record<string, string>;
}

export async function parseResume(input: string | Buffer): Promise<ResumeData> {
  try {
    const pdfResult = await parsePDF(input);
    const cleanedText = cleanPDFText(pdfResult.text);

    // Extract common resume sections
    const commonSections = [
      'Experience',
      'Work Experience',
      'Professional Experience',
      'Education',
      'Skills',
      'Technical Skills',
      'Projects',
      'Certifications',
      'Summary',
      'About',
      'Contact',
    ];

    const sections = extractSections(cleanedText, commonSections);

    // Extract email
    const emailMatch = cleanedText.match(/[\w.-]+@[\w.-]+\.\w+/);
    const email = emailMatch ? emailMatch[0] : undefined;

    // Extract phone
    const phoneMatch = cleanedText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const phone = phoneMatch ? phoneMatch[0] : undefined;

    // Extract skills (if skills section exists)
    let skills: string[] | undefined;
    const skillsSection = sections['Skills'] || sections['Technical Skills'];
    if (skillsSection) {
      skills = skillsSection
        .split(/[,\n•·-]/)
        .map(s => s.trim())
        .filter(s => s.length > 0 && s.length < 50);
    }

    return {
      rawText: cleanedText,
      email,
      phone,
      skills,
      experience: sections['Experience'] || sections['Work Experience'] || sections['Professional Experience'],
      education: sections['Education'],
      sections,
    };
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw error;
  }
}

const pdfParserUtils = {
  parsePDF,
  parseResume,
  cleanPDFText,
  extractSections,
};

export default pdfParserUtils;
