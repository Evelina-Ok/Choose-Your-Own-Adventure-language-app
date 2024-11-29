import { ChatSession, GenerativeModel } from "@google/generative-ai";

export const sendPromptToAI = async (session: ChatSession, prompt: string) => {
  // TODO - add a try catch in case it fails
  session.model;
  const result = await session.sendMessage(prompt);
  const response = result.response;
  console.log("sendPromptToAi text", response.text());
  return response.text();
};

type AIResponse = {possibleOptions: string[], scenario: string}

export const generateContent = async (
  model: GenerativeModel,
  prompt: string
):Promise<AIResponse> => {
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  console.log("generated JSON is", JSON.parse(text));
  return JSON.parse(text);
};