import { useTranslation } from "react-i18next";

type GeminiChatAssistantTriggerProps = {
  isDark: boolean;
  onOpen: () => void;
};

export function GeminiChatAssistantTrigger({
  isDark,
  onOpen,
}: GeminiChatAssistantTriggerProps) {
  const { t } = useTranslation("geminiChatAssistant");

  const triggerButtonClassName = isDark
    ? "fixed bottom-6 right-6 z-[1000] inline-flex h-14 items-center gap-2 rounded-full border border-white/10 bg-brand-white px-4 text-sm font-semibold text-brand-black shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-brand-lightGray"
    : "fixed bottom-6 right-6 z-[1000] inline-flex h-14 items-center gap-2 rounded-full border border-brand-black/10 bg-brand-black px-4 text-sm font-semibold text-brand-white shadow-lg shadow-brand-black/20 transition-all hover:-translate-y-0.5 hover:bg-brand-darkGray";

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={t(($) => $.openAssistantAriaLabel)}
      className={triggerButtonClassName}
    >
      <span className="text-xs uppercase tracking-[0.24em] text-brand-green">
        AI
      </span>
      <span>{t(($) => $.triggerLabel)}</span>
    </button>
  );
}
