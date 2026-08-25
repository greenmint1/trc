import { GeminiChatAssistantComposer } from "@src/components/GeminiChatAssistant/GeminiChatAssistantComposer";
import { GeminiChatAssistantHeader } from "@src/components/GeminiChatAssistant/GeminiChatAssistantHeader";
import { GeminiChatAssistantMessages } from "@src/components/GeminiChatAssistant/GeminiChatAssistantMessages";
import type { ChatMessage } from "@src/components/GeminiChatAssistant/types";
import { useTranslation } from "react-i18next";

type GeminiChatAssistantPanelProps = {
  messages: ChatMessage[];
  draft: string;
  isSending: boolean;
  promptMessage: string;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onClear: () => void;
  onClose: () => void;
  onDraftChange: (nextValue: string) => void;
  onSubmit: () => void;
  messageBoardRef: React.RefObject<HTMLDivElement | null>;
  panelRef: React.RefObject<HTMLElement | null>;
};

export function GeminiChatAssistantPanel({
  messages,
  draft,
  isSending,
  promptMessage,
  textareaRef,
  onClear,
  onClose,
  onDraftChange,
  onSubmit,
  messageBoardRef,
  panelRef,
}: GeminiChatAssistantPanelProps) {
  const { t } = useTranslation("geminiChatAssistant");

  return (
    <section
      ref={panelRef}
      aria-label={t(($) => $.panelAriaLabel)}
      role="dialog"
      className="fixed right-4 bottom-4 z-[1000] flex w-[min(92vw,24rem)] max-h-[min(32rem,calc(100dvh-2rem))] flex-col overflow-hidden rounded-2xl border border-brand-black/10 bg-brand-lightGray shadow-2xl shadow-black/20 dark:border-white/10 dark:bg-brand-darkGray md:right-6 md:bottom-6"
    >
      <GeminiChatAssistantHeader onClear={onClear} onClose={onClose} />

      <div
        ref={messageBoardRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        <GeminiChatAssistantMessages
          messages={messages}
          isSending={isSending}
          promptMessage={promptMessage}
        />
      </div>

      <GeminiChatAssistantComposer
        draft={draft}
        isSending={isSending}
        textareaRef={textareaRef}
        onDraftChange={onDraftChange}
        onSubmit={onSubmit}
      />
    </section>
  );
}
