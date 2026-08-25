import { useTranslation } from "react-i18next";

type AudioConsentPopupProps = {
  onEnableSound: () => void;
};

export function AudioConsentPopup({ onEnableSound }: AudioConsentPopupProps) {
  const { t } = useTranslation("audioConsent");

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/75 px-4">
      <div className="w-full max-w-sm rounded-sm border border-white/20 bg-brand-darkGray p-6 text-center">
        <p className="brand-heading text-2xl text-white">{t(($) => $.title)}</p>
        <p className="mt-3 text-sm text-white/80">{t(($) => $.description)}</p>
        <button
          type="button"
          onClick={onEnableSound}
          className="mt-6 w-full rounded-sm bg-brand-green px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-black transition hover:bg-brand-green-hover"
        >
          {t(($) => $.button)}
        </button>
      </div>
    </div>
  );
}
