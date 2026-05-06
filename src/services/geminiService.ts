import { GoogleGenAI, Type } from "@google/genai";
import { PersonalityReport, MentalityAnswer, ReadinessQuestion, ReadinessResult, AptitudeQuestion, SupportedLanguage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeMentality(answers: MentalityAnswer[], lang: SupportedLanguage = 'en'): Promise<PersonalityReport> {
  const prompt = `Analyze the following psychological responses and provide a career personality report in language code: ${lang}.
  
  User Responses:
  ${answers.map(a => `Q: ${a.question}\nA: ${a.answer}`).join("\n\n")}
  
  The report must include:
  1. Psychological traits (e.g., Openness, Conscientiousness).
  2. A summary of their professional mentality.
  3. Strengths and areas for improvement.
  4. 3 specific career recommendations, including modern professions like "YouTube Creator", "AI Specialist", or "Remote Work Strategist".
  5. For each career, explicitly state the "mindset" (type of thinking) required.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          traits: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                value: { type: Type.NUMBER }
              },
              required: ["name", "value"]
            }
          },
          summary: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                whyFits: { type: Type.STRING },
                difficultyScale: { type: Type.NUMBER },
                growthPotential: { type: Type.STRING },
                mindset: { type: Type.STRING }
              },
              required: ["title", "description", "whyFits", "difficultyScale", "growthPotential", "mindset"]
            }
          }
        },
        required: ["traits", "summary", "strengths", "weaknesses", "recommendations"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function generateReadinessQuiz(career: string, lang: SupportedLanguage = 'en'): Promise<ReadinessQuestion[]> {
  const prompt = `Generate a 5-question professional readiness quiz for the role of ${career} in language code: ${lang}.
  
  CRITICAL GUIDELINES:
  - Use simple, easy-to-understand English (or target language).
  - DO NOT use short forms or abbreviations (e.g., use "Return on Investment" instead of "ROI").
  - Provide a practical example within each question.
  - Focus on logical decision-making rather than technical jargon.
  - Make it helpful for a beginner to understand the role.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            text: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.NUMBER },
            explanation: { type: Type.STRING }
          },
          required: ["id", "text", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
}

export async function generateAptitudeTest(lang: SupportedLanguage = 'en'): Promise<AptitudeQuestion[]> {
  const prompt = `Generate a 10-question Aptitude and IQ test in language code: ${lang}.
  Include:
  - Logic questions (pattern matching).
  - Verbal reasoning (simple logic statements).
  - Spatial awareness (imagining shapes).
  - Basic math logic.
  Use simple language and avoid any complex jargon.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            text: { type: Type.STRING },
            type: { type: Type.STRING, enum: ["logic", "verbal", "spatial", "math"] },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.NUMBER }
          },
          required: ["id", "text", "type", "options", "correctAnswer"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
}

export async function generateReadinessReport(career: string, score: number, total: number, lang: SupportedLanguage = 'en'): Promise<ReadinessResult> {
  const prompt = `Provide a career readiness overview for a user who scored ${score}/${total} on a ${career} trial in language code: ${lang}.
  Explain how to improve and provide a roadmap. Use simple language and clear examples.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          total: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                link: { type: Type.STRING }
              },
              required: ["title", "link"]
            }
          }
        },
        required: ["score", "total", "feedback", "nextSteps", "resources"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
