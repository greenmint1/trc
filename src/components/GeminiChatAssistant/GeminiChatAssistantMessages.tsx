import type { ChatMessage } from "@src/components/GeminiChatAssistant/types";
import { useTranslation } from "react-i18next";

type GeminiChatAssistantMessagesProps = {
  messages: ChatMessage[];
  isSending: boolean;
  promptMessage: string;
};

export function GeminiChatAssistantMessages({
  messages,
  isSending,
  promptMessage,
}: GeminiChatAssistantMessagesProps) {
  const { t } = useTranslation("geminiChatAssistant");

  return (
    <div className="space-y-3">
      {messages.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-brand-black/10 bg-white/70 px-4 py-3 text-sm leading-relaxed text-brand-black/70 dark:border-white/10 dark:bg-black/20 dark:text-brand-white/70">
          {promptMessage}
        </p>
      ) : null}

      {messages.map((message, index) => (
        <div
          key={`${message.role}-${index}`}
          data-chat-message-index={index}
          data-chat-message-role={message.role}
          className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "ml-auto bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black" : "bg-white/80 text-brand-black dark:bg-black/20 dark:text-brand-white"}`}
        >
          {message.content}
        </div>
      ))}

      {isSending ? (
        <div className="max-w-[85%] rounded-2xl bg-white/80 px-4 py-3 text-sm leading-relaxed text-brand-black/70 dark:bg-black/20 dark:text-brand-white/70">
          {t(($) => $.thinking)}
        </div>
      ) : null}
    </div>
  );
}
