import {
  GoogleGenAI,
} from '@google/genai';

export async function sdf(prompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    config: {
      responseMimeType: "application/json",
    },
    contents: [{
      role: "user",
      parts: [{ text: prompt }],
    }],
  });

  // Collect streamed chunks
  let fullText = "";

  for await (const chunk of response) {
    fullText += chunk.text;
  }

  return JSON.parse(fullText);
}
