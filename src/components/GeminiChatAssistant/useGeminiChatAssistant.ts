import { getRandomPrompt } from "@src/components/GeminiChatAssistant/prompts";
import type {
  AssistantNamespace,
  ChatMessage,
} from "@src/components/GeminiChatAssistant/types";
import { useAnalytics } from "@src/hooks/useAnalytics";
import { resources } from "@src/i18n/resources";
import { useGeminiChatApi } from "@src/services/useGeminiChatApi";
import { AppRoute } from "@src/types/app";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function getAssistantNamespace(pathname: string): AssistantNamespace {
  switch (pathname) {
    case AppRoute.Home:
      return "home";
    case AppRoute.Plans:
      return "plans";
    case AppRoute.About:
      return "about";
    case AppRoute.Contact:
      return "contact";
    case AppRoute.Privacy:
      return "privacy";
    case AppRoute.Terms:
      return "terms";
    default:
      return "common";
  }
}

export function useGeminiChatAssistant() {
  const { trackButtonClick } = useAnalytics();
  const { t } = useTranslation("geminiChatAssistant");
  const { sendGeminiChatRequest } = useGeminiChatApi();
  const location = useLocation();
  const namespace = getAssistantNamespace(location.pathname);
  const fullTranslationData = resources.en;
  const activePageTranslationData = resources.en[namespace];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [promptMessage, setPromptMessage] = useState<string>(
    t(getRandomPrompt()),
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messageBoardRef = useRef<HTMLDivElement | null>(null);
  const pendingUserMessageIndexRef = useRef<number | null>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    const nextHeight = Math.min(textarea.scrollHeight, 160);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > 160 ? "auto" : "hidden";
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [draft, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    textareaRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const messageBoard = messageBoardRef.current;

    if (!messageBoard) {
      return;
    }

    const pendingUserMessageIndex = pendingUserMessageIndexRef.current;

    if (pendingUserMessageIndex !== null) {
      const frameId = window.requestAnimationFrame(() => {
        const selector = `[data-chat-message-index="${pendingUserMessageIndex}"][data-chat-message-role="user"]`;
        const targetMessage = messageBoard.querySelector<HTMLElement>(selector);

        if (!targetMessage) {
          pendingUserMessageIndexRef.current = null;
          return;
        }

        const messageBoardRect = messageBoard.getBoundingClientRect();
        const targetRect = targetMessage.getBoundingClientRect();
        const targetTop =
          messageBoard.scrollTop + (targetRect.top - messageBoardRect.top) - 8;

        messageBoard.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth",
        });
        pendingUserMessageIndexRef.current = null;
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    const lastMessage = messages.at(-1);

    if (lastMessage?.role === "assistant") {
      messageBoard.scrollTop = messageBoard.scrollHeight;
    }
  }, [messages]);

  const resetHistory = () => {
    setMessages([]);
    setDraft("");

    window.requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });

    trackButtonClick("clear_chat", "chat_assistant");
  };

  const closeAssistant = () => {
    setIsOpen(false);
    trackButtonClick("close_chat", "chat_assistant");
  };

  const openAssistant = () => {
    setPromptMessage(t(getRandomPrompt()));
    setIsOpen(true);
    trackButtonClick("open_chat", "chat_assistant");
  };

  const submitQuestion = async () => {
    const latestDraft = textareaRef.current?.value ?? draft;
    const question = latestDraft.trim();

    if (!question || isSending) {
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: question },
    ];
    pendingUserMessageIndexRef.current = nextMessages.length - 1;
    setMessages(nextMessages);
    setDraft("");
    setIsSending(true);
    trackButtonClick("send_chat", "chat_assistant");

    try {
      const answer = await sendGeminiChatRequest({
        promptMessage,
        namespace,
        messages: nextMessages,
        fullTranslationData,
        activePageTranslationData,
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: answer },
      ]);
    } catch (error) {
      console.error("Gemini chat assistant request failed", error);
      const fallbackMessage = t(($) => $.serviceUnavailable);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: fallbackMessage,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return {
    isDark: false,
    isOpen,
    messages,
    draft,
    isSending,
    promptMessage,
    namespace,
    textareaRef,
    messageBoardRef,
    openAssistant,
    closeAssistant,
    resetHistory,
    setDraft,
    submitQuestion,
  };
}
