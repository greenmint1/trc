import type { resources } from "@src/i18n/resources";

type GeminiChatAssistantLocale =
  (typeof resources)["en"]["geminiChatAssistant"];

export const CHAT_PROMPTS = [
  ($: GeminiChatAssistantLocale) => $.prompts[0],
  ($: GeminiChatAssistantLocale) => $.prompts[1],
  ($: GeminiChatAssistantLocale) => $.prompts[2],
  ($: GeminiChatAssistantLocale) => $.prompts[3],
  ($: GeminiChatAssistantLocale) => $.prompts[4],
  ($: GeminiChatAssistantLocale) => $.prompts[5],
  ($: GeminiChatAssistantLocale) => $.prompts[6],
  ($: GeminiChatAssistantLocale) => $.prompts[7],
  ($: GeminiChatAssistantLocale) => $.prompts[8],
  ($: GeminiChatAssistantLocale) => $.prompts[9],
  ($: GeminiChatAssistantLocale) => $.prompts[10],
  ($: GeminiChatAssistantLocale) => $.prompts[11],
  ($: GeminiChatAssistantLocale) => $.prompts[12],
] as const;

export function getRandomPrompt() {
  return CHAT_PROMPTS[Math.floor(Math.random() * CHAT_PROMPTS.length)];
}
