import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../app/lib/contentful";
import fetch from "node-fetch";
import PDFParser from "pdf2json";
import { InferenceClient } from "@huggingface/inference";
import { parseResumeTextToJSON } from "@/lib/parseResume";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Missing question" });
  }

  const entryId = process.env.NEXT_PUBLIC_CONTENTFUL_RESUME_ENTRY_ID as string;
  if (!entryId) {
    return res.status(500).json({ error: "Resume entry ID not configured" });
  }

  let resumeData: any = {}; // <-- ✅ Declare it here so it's in outer scope

  try {
    const entry = await client.getEntry(entryId);

    let fileUrl = null;
    if (
      entry.fields?.resume &&
      typeof entry.fields.resume === "object" &&
      "fields" in entry.fields.resume
    ) {
      // @ts-ignore
      fileUrl = entry.fields.resume.fields.file?.url;
    } else if (
      entry.fields?.file &&
      typeof entry.fields.file === "object" &&
      "url" in entry.fields.file
    ) {
      // @ts-ignore
      fileUrl = entry.fields.file.url;
    }

    if (!fileUrl) {
      console.error("Resume PDF URL not found in Contentful entry", { entry });
      return res
        .status(500)
        .json({ error: "Resume PDF URL not found in Contentful entry" });
    }

    const pdfUrl = fileUrl.startsWith("http") ? fileUrl : `https:${fileUrl}`;
    console.log("Resolved PDF URL:", pdfUrl);

    const pdfRes = await fetch(pdfUrl);
    if (!pdfRes.ok) {
      console.error("Failed to download resume PDF", {
        pdfUrl,
        status: pdfRes.status,
      });
      return res.status(500).json({ error: "Failed to download resume PDF" });
    }

    const pdfBuffer = await pdfRes.arrayBuffer();

    try {
      const pdfParser = new PDFParser();
      const pdfText = await new Promise<string>((resolve, reject) => {
        pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
          let text = "";
          try {
            pdfData.Pages?.forEach((page: any) => {
              page.Texts?.forEach((item: any) => {
                item.R?.forEach((r: any) => {
                  let decoded = "";
                  try {
                    decoded = decodeURIComponent(r.T || "");
                  } catch {
                    // fallback when URI decoding fails
                    decoded = r.T || "";
                  }
                  text += decoded + " ";
                });
              });
            });
          } catch (err) {
            console.error("PDF parsing error:", err);
          }
          resolve(text.trim());
        });

        pdfParser.on("pdfParser_dataError", reject);
        pdfParser.parseBuffer(Buffer.from(pdfBuffer));
      });

      const cleanedText = pdfText.replace(/\s+/g, " ").trim();

      // ✅ assign it to the outer variable
      resumeData = parseResumeTextToJSON(cleanedText);
      console.log("Parsed resume JSON:", JSON.stringify(resumeData, null, 2));
    } catch (parseErr) {
      console.error("Failed to parse PDF", { parseErr });
      return res.status(500).json({ error: "Failed to parse resume PDF" });
    }
  } catch (error) {
    console.error("Error fetching/parsing resume PDF", { error });
    return res
      .status(500)
      .json({ error: "Failed to fetch or parse resume PDF" });
  }

  // ✅ Now this will always work
  const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

  if (!HF_API_KEY) {
    return res
      .status(500)
      .json({ error: "Hugging Face API key not configured" });
  }

  const hf = new InferenceClient(HF_API_KEY);

  try {
    const hfResult = await hf.questionAnswering({
      model: "deepset/roberta-base-squad2",
      inputs: {
        question,
        context: JSON.stringify(resumeData),
      },
    });

    const answer = hfResult.answer?.trim() || "No answer generated.";
    return res.status(200).json({ answer, resumeData });
  } catch (error) {
    console.error("Hugging Face error:", error);
    return res.status(500).json({ error: "Failed to get Hugging Face answer" });
  }
}
