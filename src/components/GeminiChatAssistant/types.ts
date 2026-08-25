import type { resources } from "@src/i18n/resources";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type AssistantNamespace = keyof (typeof resources)["en"];
