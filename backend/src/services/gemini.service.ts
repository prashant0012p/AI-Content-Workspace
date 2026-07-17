import { GoogleGenAI } from "@google/genai";

export interface GeminiGenerateParams {
  contentType?: string;
  topic?: string;
  audience?: string;
  tone?: string;
  instructions?: string;
  model?: string;
}

export interface GeminiAssistantParams {
  content?: string;
  action?: string;
  model?: string;
}

const apiKey = process.env.GOOGLE_API_KEY ?? process.env.GENAI_API_KEY;

const createClient = () =>
  new GoogleGenAI({
    apiKey,
  });

const parseGeneratedText = (response: any) => {
  if (!response) return "";
  if (typeof response === "string") return response;
  if (typeof response.text === "string") return response.text;
  if (typeof response.output_text === "string") return response.output_text;
  const firstCandidate = response?.candidates?.[0];
  if (firstCandidate?.text) return firstCandidate.text;
  const firstContent = firstCandidate?.content?.[0];
  return firstContent?.text ?? "";
};

export const generateFromGemini = async (params: GeminiGenerateParams) => {
  const {
    contentType = "content",
    topic = "topic",
    audience = "audience",
    tone = "tone",
    instructions = "",
    model = "gemini-2.5-flash",
  } = params;

  const prompt = `Create ${contentType} about ${topic} for ${audience} in a ${tone} tone.${
    instructions ? `\n\nInstructions: ${instructions}` : ""
  }`;

  if (!apiKey) {
    return `Generated ${contentType} about ${topic} for ${audience} with a ${tone} tone.${
      instructions ? `\n\n${instructions}` : ""
    }`;
  }

  const client = createClient();
  const response = await client.models.generateContent({
    model,
    contents: prompt,
  });
  return parseGeneratedText(response);
};

export const assistantFromGemini = async (params: GeminiAssistantParams) => {
  const { content = "", action = "Refined", model = "gemini-2.5-flash" } = params;
  const prompt = `${action} the following text:\n\n${content}`;

  if (!apiKey) {
    return `${action}: ${content}`;
  }

  const client = createClient();
  const response = await client.models.generateContent({
    model,
    contents: prompt,
  });
  return parseGeneratedText(response);
};
