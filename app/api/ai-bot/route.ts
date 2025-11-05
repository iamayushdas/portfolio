import client from "../../lib/contentful";
import { parseResumeTextToJSON } from "@/lib/parseResume";
import { parseResume, parsePDF } from "@/lib/pdfParser";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

export async function POST(req: Request) {
    const body = await req.json();
    const { question } = body;

    if (!question) {
        return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    const entryId = process.env.NEXT_PUBLIC_CONTENTFUL_RESUME_ENTRY_ID as string;
    if (!entryId) {
        return NextResponse.json(
            { error: "Resume entry ID not configured" },
            { status: 500 }
        );
    }

    try {
        // Fetch resume from Contentful
        const entry = await client.getEntry(entryId);
        let fileUrl = null;

        if (
            entry.fields?.resume &&
            typeof entry.fields.resume === "object" &&
            "fields" in entry.fields.resume &&
            entry.fields.resume.fields &&
            typeof entry.fields.resume.fields === "object" &&
            "file" in entry.fields.resume.fields &&
            entry.fields.resume.fields.file &&
            typeof entry.fields.resume.fields.file === "object" &&
            "url" in entry.fields.resume.fields.file
        ) {
            // @ts-ignore
            fileUrl = entry.fields.resume.fields.file.url;
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
            return NextResponse.json(
                { error: "Resume PDF URL not found" },
                { status: 500 }
            );
        }

        console.log("Parsing resume from URL:", fileUrl);

        // Ensure fileUrl is a string
        const urlString = typeof fileUrl === "string" ? fileUrl : String(fileUrl);

        // Parse the PDF using the new parser
        const resumeData = await parseResume(urlString);

        console.log(
            `Successfully extracted ${resumeData.rawText.length} characters from resume`
        );

        // Convert to structured JSON format
        const structuredResume = parseResumeTextToJSON(resumeData.rawText);

        // Handle conversational questions and greetings first
        const lowerQuestion = question.toLowerCase().trim();
        const firstName = structuredResume.name?.split(" ")[0] || "Ayush";

        // Greetings and casual conversation
        if (
            /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)$/i.test(
                lowerQuestion
            )
        ) {
            return NextResponse.json(
                {
                    success: true,
                    answer: `Hello! 👋 I'm here to help you learn about ${firstName}. Feel free to ask me anything about their skills, experience, projects, or education!`,
                    resumeData: structuredResume,
                },
                { status: 200 }
            );
        }

        if (/how are you|what's up|wassup|sup/i.test(lowerQuestion)) {
            return NextResponse.json(
                {
                    success: true,
                    answer: `I'm doing great, thanks for asking! 😊 I'm excited to tell you about ${firstName}. What would you like to know?`,
                    resumeData: structuredResume,
                },
                { status: 200 }
            );
        }

        if (/thank(s| you)|appreciate/i.test(lowerQuestion)) {
            return NextResponse.json(
                {
                    success: true,
                    answer: `You're very welcome! 😊 Feel free to ask if you have any other questions about ${firstName}!`,
                    resumeData: structuredResume,
                },
                { status: 200 }
            );
        }

        if (/bye|goodbye|see you|later/i.test(lowerQuestion)) {
            return NextResponse.json(
                {
                    success: true,
                    answer: `Goodbye! It was great chatting with you. Feel free to come back anytime if you have more questions about ${firstName}! 👋`,
                    resumeData: structuredResume,
                },
                { status: 200 }
            );
        }

        // Use HuggingFace API to answer the question based on resume data
        const huggingFaceToken = process.env.HUGGINGFACE_API_TOKEN;

        if (!huggingFaceToken) {
            // Return basic resume data without AI enhancement
            console.log(
                "⚠️  HUGGINGFACE_API_TOKEN not configured - AI features disabled"
            );
            console.log(
                "   Add HUGGINGFACE_API_TOKEN to .env to enable AI responses"
            );

            // Generate a helpful response based on the question and resume data
            let answer = "I can share information from the resume. ";

            // Provide relevant data based on the question
            if (question.toLowerCase().includes("skill")) {
                const skills = Object.values(structuredResume.skills || {}).flat();
                answer += `Skills include: ${skills.slice(0, 10).join(", ")}${skills.length > 10 ? "..." : ""
                    }.`;
            } else if (
                question.toLowerCase().includes("experience") ||
                question.toLowerCase().includes("work")
            ) {
                const exp = structuredResume.experience?.[0];
                answer += exp
                    ? `Most recent role: ${exp.title} at ${exp.company} (${exp.date_range}).`
                    : "Experience information available in resume.";
            } else if (question.toLowerCase().includes("education")) {
                const edu = structuredResume.education;
                answer += edu
                    ? `Education: ${edu.degree} from ${edu.institution}.`
                    : "Education information available in resume.";
            } else if (
                question.toLowerCase().includes("contact") ||
                question.toLowerCase().includes("email")
            ) {
                answer += `Contact: ${structuredResume.email || "See resume"}`;
            } else {
                answer +=
                    "For AI-powered answers, configure HUGGINGFACE_API_TOKEN in your environment.";
            }

            return NextResponse.json(
                {
                    success: true,
                    resumeData: structuredResume,
                    answer,
                    note: "AI features not configured. Add HUGGINGFACE_API_TOKEN to enable intelligent responses.",
                },
                { status: 200 }
            );
        }

        try {
            const hf = new HfInference(huggingFaceToken);

            // Handle "who are you" and introduction questions differently
            if (
                /who are you|introduce yourself|tell me about yourself|who is this|about you/i.test(
                    lowerQuestion
                )
            ) {
                const firstName = structuredResume.name?.split(" ")[0] || "This person";
                const intro = `I'm a chatbot representing ${structuredResume.name || firstName
                    }! ${structuredResume.summary
                        ? `${firstName} is ${structuredResume.summary.toLowerCase()}`
                        : `${firstName} is a talented professional`
                    }. 

I can help you learn about:
• 💻 Technical skills and expertise
• 🏢 Work experience and achievements  
• 🎓 Educational background
• 🚀 Projects and portfolio

What would you like to know more about?`;

                return NextResponse.json(
                    {
                        success: true,
                        answer: intro,
                        resumeData: structuredResume,
                    },
                    { status: 200 }
                );
            }

            // Create context from resume
            const context = `
Resume Information:
Name: ${structuredResume.name || "N/A"}
Email: ${structuredResume.email || "N/A"}
Phone: ${structuredResume.phone || "N/A"}
LinkedIn: ${structuredResume.linkedin || "N/A"}
GitHub: ${structuredResume.github || "N/A"}

Summary: ${structuredResume.summary || "N/A"}

Skills: ${JSON.stringify(structuredResume.skills, null, 2)}

Experience: ${JSON.stringify(structuredResume.experience, null, 2)}

Education: ${JSON.stringify(structuredResume.education, null, 2)}

Raw Resume Text:
${resumeData.rawText}
`;

            // Generate answer using HuggingFace - using text generation with a reliable model
            const prompt = `You are answering questions about a resume. Question: "${question}"

Resume Information:
Name: ${structuredResume.name || "N/A"}
Email: ${structuredResume.email || "N/A"}
Phone: ${structuredResume.phone || "N/A"}
LinkedIn: ${structuredResume.linkedin || "N/A"}
GitHub: ${structuredResume.github || "N/A"}

Summary: ${structuredResume.summary || "N/A"}

Skills: ${JSON.stringify(structuredResume.skills, null, 2)}

Experience: ${JSON.stringify(structuredResume.experience, null, 2)}

Education: ${JSON.stringify(structuredResume.education, null, 2)}

Answer concisely based only on the resume:`;

            // Generate answer using HuggingFace - using question answering which is more reliable
            try {
                // Try question answering first
                const qaResponse = await hf.questionAnswering({
                    model: "deepset/roberta-base-squad2",
                    inputs: {
                        question: question,
                        context: `Name: ${structuredResume.name}. ${structuredResume.summary || ""
                            }. Skills: ${Object.values(structuredResume.skills || {})
                                .flat()
                                .join(", ")}. Experience: ${structuredResume.experience
                                ?.map((e) => `${e.title} at ${e.company} (${e.date_range})`)
                                .join(". ") || ""
                            }. Education: ${structuredResume.education?.degree} from ${structuredResume.education?.institution
                            }.`,
                    },
                });

                // Make the response more human and conversational
                let rawAnswer = qaResponse.answer || "Information not found in resume.";
                let humanResponse = "";

                // Add context-aware conversational prefix
                if (
                    question.toLowerCase().includes("what") ||
                    question.toLowerCase().includes("which")
                ) {
                    humanResponse = `Great question! ${rawAnswer}`;
                } else if (
                    question.toLowerCase().includes("can") ||
                    question.toLowerCase().includes("do")
                ) {
                    humanResponse = `Yes! ${rawAnswer}`;
                } else if (question.toLowerCase().includes("tell me")) {
                    humanResponse = `I'd be happy to share! ${rawAnswer}`;
                } else {
                    humanResponse = rawAnswer;
                }

                // Add friendly closing based on context
                if (
                    question.toLowerCase().includes("skill") ||
                    question.toLowerCase().includes("experience")
                ) {
                    humanResponse += " Feel free to ask if you'd like more details!";
                }

                return NextResponse.json(
                    {
                        success: true,
                        answer: humanResponse,
                        resumeData: structuredResume,
                    },
                    { status: 200 }
                );
            } catch (qaError) {
                console.log("Question answering failed, using fallback:", qaError);

                // Fallback to contextual response with human-like language
                let aiMessage = "";

                if (
                    question.toLowerCase().includes("language") ||
                    question.toLowerCase().includes("programming")
                ) {
                    const languages = Object.values(structuredResume.skills || {})
                        .flat()
                        .filter((s) =>
                            [
                                "javascript",
                                "typescript",
                                "python",
                                "java",
                                "c++",
                                "c#",
                                "go",
                                "rust",
                                "php",
                                "ruby",
                                "swift",
                                "kotlin",
                                "html",
                                "css",
                                "sql",
                            ].some((lang) => s.toLowerCase().includes(lang))
                        );
                    if (languages.length > 0) {
                        aiMessage = `${structuredResume.name?.split(" ")[0] || "They"} ${languages.length === 1 ? "knows" : "know"
                            } ${languages.join(", ")}! ${languages.length > 3 ? "Quite versatile, right?" : ""
                            }`;
                    } else {
                        const allSkills = Object.values(
                            structuredResume.skills || {}
                        ).flat();
                        aiMessage = `The resume lists several technical skills including ${allSkills
                            .slice(0, 5)
                            .join(
                                ", "
                            )}. These cover various programming languages and technologies!`;
                    }
                } else if (question.toLowerCase().includes("skill")) {
                    const allSkills = Object.values(structuredResume.skills || {}).flat();
                    const firstName =
                        structuredResume.name?.split(" ")[0] || "This candidate";
                    aiMessage = `${firstName} has a strong skill set! Some key areas include ${allSkills
                        .slice(0, 8)
                        .join(", ")}${allSkills.length > 8 ? ", among others" : ""
                        }. Pretty impressive range!`;
                } else if (question.toLowerCase().includes("experience")) {
                    const exp = structuredResume.experience?.[0];
                    const firstName = structuredResume.name?.split(" ")[0] || "They";
                    if (exp) {
                        aiMessage = `Most recently, ${firstName} worked as a ${exp.title
                            } at ${exp.company} (${exp.date_range}). ${structuredResume.experience &&
                                structuredResume.experience.length > 1
                                ? `There are ${structuredResume.experience.length} positions total - quite an experienced professional!`
                                : ""
                            }`;
                    } else {
                        aiMessage =
                            "The resume includes detailed work experience. Feel free to ask about specific roles or companies!";
                    }
                } else if (question.toLowerCase().includes("education")) {
                    const edu = structuredResume.education;
                    const firstName = structuredResume.name?.split(" ")[0] || "They";
                    aiMessage = edu
                        ? `${firstName} holds a ${edu.degree} from ${edu.institution}. Strong educational background!`
                        : "Education information is available in the resume.";
                } else if (
                    question.toLowerCase().includes("who") ||
                    question.toLowerCase().includes("about")
                ) {
                    const firstName =
                        structuredResume.name?.split(" ")[0] || "This candidate";
                    aiMessage = `${firstName} is ${structuredResume.summary ||
                        "a skilled professional with diverse experience"
                        }. What would you like to know more about - skills, experience, or projects?`;
                } else {
                    aiMessage = `${structuredResume.summary ||
                        "The resume showcases a talented professional with diverse skills and experiences."
                        }. Feel free to ask about specific areas like technical skills, work experience, or education!`;
                }

                return NextResponse.json(
                    {
                        success: true,
                        answer: aiMessage,
                        resumeData: structuredResume,
                    },
                    { status: 200 }
                );
            }
        } catch (aiError) {
            console.error("AI generation error:", aiError);
            // Return resume data even if AI fails
            return NextResponse.json(
                {
                    success: true,
                    resumeData: structuredResume,
                    rawText: resumeData.rawText,
                    answer: "AI service unavailable. Resume data retrieved successfully.",
                },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error in ai-bot API:", error);
        return NextResponse.json(
            {
                error: "Internal server error",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
