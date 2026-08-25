import type {
  AssistantNamespace,
  ChatMessage,
} from "@src/components/GeminiChatAssistant/types";
import { useCallback } from "react";

function resolveGeminiChatApiUrl(baseUrl: string): string {
  const normalizedBaseUrl = baseUrl.trim().replace(/\/+$/, "");

  if (normalizedBaseUrl.endsWith("/gemini-chat")) {
    return normalizedBaseUrl;
  }

  return `${normalizedBaseUrl}/gemini-chat`;
}

function resolveApiBaseUrl(): string {
  const apiBaseUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

  if (typeof apiBaseUrl !== "string" || apiBaseUrl.trim().length === 0) {
    throw new Error(
      "API base URL is not configured for the current environment",
    );
  }

  return apiBaseUrl;
}

const GEMINI_CHAT_API_URL = resolveGeminiChatApiUrl(resolveApiBaseUrl());

export type GeminiChatRequest = {
  promptMessage: string;
  namespace: AssistantNamespace;
  messages: ChatMessage[];
  fullTranslationData: Record<string, unknown>;
  activePageTranslationData: Record<string, unknown>;
};

type GeminiChatResponse = {
  answer?: string;
  message?: string;
};

export class GeminiChatRequestError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GeminiChatRequestError";
    this.status = status;
  }
}

export function useGeminiChatApi() {
  const sendGeminiChatRequest = useCallback(
    async (request: GeminiChatRequest): Promise<string> => {
      const response = await fetch(GEMINI_CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        let message = "Service is unavailable";

        try {
          const errorBody = (await response.json()) as GeminiChatResponse;
          if (
            typeof errorBody.message === "string" &&
            errorBody.message.trim().length > 0
          ) {
            message = errorBody.message.trim();
          }
        } catch {
          // Fall back to the default service-unavailable message.
        }

        throw new GeminiChatRequestError(message, response.status);
      }

      const data = (await response.json()) as GeminiChatResponse;

      if (typeof data.answer !== "string" || data.answer.trim().length === 0) {
        throw new Error("Gemini chat request returned an empty answer");
      }

      return data.answer.trim();
    },
    [],
  );

  return { sendGeminiChatRequest };
}
