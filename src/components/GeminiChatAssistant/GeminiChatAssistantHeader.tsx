import { CloseIcon, PencilIcon } from "@src/assets/svg/icons";
import { useTranslation } from "react-i18next";

type GeminiChatAssistantHeaderProps = {
  onClear: () => void;
  onClose: () => void;
};

export function GeminiChatAssistantHeader({
  onClear,
  onClose,
}: GeminiChatAssistantHeaderProps) {
  const { t } = useTranslation("geminiChatAssistant");

  return (
    <header className="flex items-center justify-between border-b border-brand-black/10 px-4 py-3 dark:border-white/10">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-brand-black/55 dark:text-brand-white/55">
          {t(($) => $.title)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClear}
          aria-label={t(($) => $.clearHistoryAriaLabel)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-black/10 text-brand-black transition-all hover:border-brand-green hover:text-brand-green dark:border-white/10 dark:text-brand-white"
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label={t(($) => $.closeAssistantAriaLabel)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-black/10 text-brand-black transition-all hover:border-brand-green hover:text-brand-green dark:border-white/10 dark:text-brand-white"
        >
          <CloseIcon />
        </button>
      </div>
    </header>
  );
}
