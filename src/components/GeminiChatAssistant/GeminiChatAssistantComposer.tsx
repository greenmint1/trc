import { ArrowUpIcon } from "@src/assets/svg/icons";
import { useTranslation } from "react-i18next";

type GeminiChatAssistantComposerProps = {
  draft: string;
  isSending: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onDraftChange: (nextValue: string) => void;
  onSubmit: () => void;
};

export function GeminiChatAssistantComposer({
  draft,
  isSending,
  textareaRef,
  onDraftChange,
  onSubmit,
}: GeminiChatAssistantComposerProps) {
  const { t } = useTranslation("geminiChatAssistant");

  return (
    <form
      className="border-t border-brand-black/10 p-4 dark:border-white/10"
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
    >
      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(event) => {
            onDraftChange(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void onSubmit();
            }
          }}
          rows={1}
          placeholder={t(($) => $.placeholder)}
          aria-label={t(($) => $.inputAriaLabel)}
          className="min-h-11 flex-1 resize-none rounded-2xl border border-brand-black/10 bg-white/80 px-4 py-3 text-sm leading-6 text-brand-black outline-none transition-all placeholder:text-brand-black/40 focus:border-brand-green dark:border-white/10 dark:bg-black/20 dark:text-brand-white dark:placeholder:text-brand-white/40"
        />

        <button
          type="submit"
          disabled={isSending || draft.trim().length === 0}
          aria-label={t(($) => $.sendAriaLabel)}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-green px-4 text-sm font-semibold text-brand-black transition-all hover:bg-brand-green-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowUpIcon />
        </button>
      </div>
    </form>
  );
}
