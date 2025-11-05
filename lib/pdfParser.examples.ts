/**
 * PDF Parser Usage Examples
 * 
 * This file contains practical examples of using the PDF parser utility.
 */

import { parsePDF, parseResume, cleanPDFText, extractSections } from './pdfParser';

// Example 1: Basic PDF parsing from URL
async function example1_BasicParsing() {
  try {
    const pdfUrl = 'https://example.com/document.pdf';
    const result = await parsePDF(pdfUrl);
    
    console.log('Extracted text:', result.text);
    console.log('Number of pages:', result.numPages);
    console.log('PDF Metadata:', result.metadata);
  } catch (error) {
    console.error('Error parsing PDF:', error);
  }
}

// Example 2: Parse resume and extract structured data
async function example2_ResumeParsingexample() {
  try {
    const resumeUrl = 'https://example.com/resume.pdf';
    const resumeData = await parseResume(resumeUrl);
    
    console.log('Name:', resumeData.name);
    console.log('Email:', resumeData.email);
    console.log('Phone:', resumeData.phone);
    console.log('Skills:', resumeData.skills);
    console.log('Experience:', resumeData.experience);
    console.log('Education:', resumeData.education);
    
    // Access specific sections
    console.log('All sections:', Object.keys(resumeData.sections));
  } catch (error) {
    console.error('Error parsing resume:', error);
  }
}

// Example 3: Parse PDF from Buffer
async function example3_ParseFromBuffer() {
  try {
    // Assuming you have a PDF buffer from file upload or fetch
    const response = await fetch('https://example.com/document.pdf');
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const result = await parsePDF(buffer);
    console.log('Parsed from buffer:', result.text.substring(0, 100) + '...');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 4: Clean and normalize PDF text
async function example4_CleanText() {
  const rawPdfText = `
    Multiple    spaces   and
    
    
    
    extra   newlines
    
    Need   cleaning
  `;
  
  const cleaned = cleanPDFText(rawPdfText);
  console.log('Cleaned text:', cleaned);
  // Output: "Multiple spaces and\n\nextra newlines\n\nNeed cleaning"
}

// Example 5: Extract specific sections from document
async function example5_ExtractSections() {
  try {
    const pdfUrl = 'https://example.com/document.pdf';
    const result = await parsePDF(pdfUrl);
    
    // Define sections to extract
    const sectionTitles = [
      'Introduction',
      'Methodology',
      'Results',
      'Conclusion',
      'References'
    ];
    
    const sections = extractSections(result.text, sectionTitles);
    
    console.log('Introduction:', sections.Introduction);
    console.log('Methodology:', sections.Methodology);
    console.log('Results:', sections.Results);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 6: Use in Next.js API Route
async function example6_ApiRouteUsage() {
  // app/api/parse-pdf/route.ts
  /*
  import { parseResume } from '@/lib/pdfParser';
  import { NextResponse } from 'next/server';

  export async function POST(req: Request) {
    try {
      const { url } = await req.json();
      
      if (!url) {
        return NextResponse.json(
          { error: 'PDF URL is required' },
          { status: 400 }
        );
      }

      const resumeData = await parseResume(url);
      
      return NextResponse.json({
        success: true,
        data: resumeData
      });
      
    } catch (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }
  */
}

// Example 7: Error handling
async function example7_ErrorHandling() {
  try {
    const result = await parsePDF('https://invalid-url.com/nonexistent.pdf');
    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error type:', error.name);
      console.error('Error message:', error.message);
      
      // Handle specific error types
      if (error.message.includes('Failed to fetch')) {
        console.error('Network error - check URL and connectivity');
      } else if (error.message.includes('pdf2json failed')) {
        console.error('PDF parsing error - file may be corrupted');
      }
    }
  }
}

// Example 8: Process multiple PDFs
async function example8_BatchProcessing() {
  const pdfUrls = [
    'https://example.com/resume1.pdf',
    'https://example.com/resume2.pdf',
    'https://example.com/resume3.pdf',
  ];
  
  const results = await Promise.allSettled(
    pdfUrls.map(url => parseResume(url))
  );
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Resume ${index + 1}:`, result.value.name);
    } else {
      console.error(`Error parsing resume ${index + 1}:`, result.reason);
    }
  });
}

// Example 9: Search for keywords in PDF
async function example9_KeywordSearch() {
  try {
    const pdfUrl = 'https://example.com/document.pdf';
    const result = await parsePDF(pdfUrl);
    
    const keywords = ['JavaScript', 'TypeScript', 'React', 'Node.js'];
    const foundKeywords = keywords.filter(keyword =>
      result.text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    console.log('Found keywords:', foundKeywords);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 10: Extract contact information
async function example10_ExtractContactInfo() {
  try {
    const resumeUrl = 'https://example.com/resume.pdf';
    const resumeData = await parseResume(resumeUrl);
    
    // Contact information is automatically extracted
    const contactInfo = {
      name: resumeData.name || 'Not found',
      email: resumeData.email || 'Not found',
      phone: resumeData.phone || 'Not found',
    };
    
    console.log('Contact Information:', contactInfo);
    
    // You can also extract from raw text using regex
    const emailPattern = /[\w.-]+@[\w.-]+\.\w+/g;
    const emails = resumeData.rawText.match(emailPattern);
    console.log('All emails found:', emails);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Export examples for testing
export {
  example1_BasicParsing,
  example2_ResumeParsingexample,
  example3_ParseFromBuffer,
  example4_CleanText,
  example5_ExtractSections,
  example6_ApiRouteUsage,
  example7_ErrorHandling,
  example8_BatchProcessing,
  example9_KeywordSearch,
  example10_ExtractContactInfo,
};
