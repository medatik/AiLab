import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAnCX2uQh8goWP0-CdLrwhXEH5KDNgmo-M";
const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

export const generateStory = async (prompt) => {
  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

// New chat-specific model and functions
const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const startNewChat = async () => {
  const chat = await chatModel.startChat({
    history: [],
    generationConfig: {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    },
  });
  return chat;
};

export const sendChatMessage = async (chat, message) => {
  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
};
