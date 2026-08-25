import { GeminiChatAssistantPanel } from "@src/components/GeminiChatAssistant/GeminiChatAssistantPanel";
import { GeminiChatAssistantTrigger } from "@src/components/GeminiChatAssistant/GeminiChatAssistantTrigger";
import { useGeminiChatAssistant } from "@src/components/GeminiChatAssistant/useGeminiChatAssistant";
import { useTheme } from "@src/context/useTheme";
import { useEffect, useRef } from "react";

export function GeminiChatAssistant() {
  const { isDark } = useTheme();
  const assistant = useGeminiChatAssistant();
  const {
    isOpen,
    messages,
    draft,
    isSending,
    promptMessage,
    textareaRef,
    messageBoardRef,
    openAssistant,
    closeAssistant,
    resetHistory,
    setDraft,
    submitQuestion,
  } = assistant;
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const panelElement = panelRef.current;
      const target = event.target;

      if (!(target instanceof Node) || !panelElement) {
        return;
      }

      if (panelElement.contains(target)) {
        return;
      }

      closeAssistant();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, closeAssistant]);

  if (!isOpen) {
    return (
      <GeminiChatAssistantTrigger isDark={isDark} onOpen={openAssistant} />
    );
  }

  return (
    <GeminiChatAssistantPanel
      messages={messages}
      draft={draft}
      isSending={isSending}
      promptMessage={promptMessage}
      textareaRef={textareaRef}
      messageBoardRef={messageBoardRef}
      panelRef={panelRef}
      onClear={resetHistory}
      onClose={closeAssistant}
      onDraftChange={setDraft}
      onSubmit={submitQuestion}
    />
  );
}
