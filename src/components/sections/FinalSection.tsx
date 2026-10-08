import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const FinalSection: React.FC = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <section id="final" className="section-anchor relative flex min-h-[118vh] w-full flex-col items-center overflow-hidden bg-[#0a0909]/45 px-5 py-24 text-center md:px-10 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(113,96,82,0.13),transparent_36%)]" aria-hidden="true" />
      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-between" data-reveal>
        <header>
          <p className="text-[0.66rem] tracking-[0.2em] text-champagne/60">{t.final.label}</p>
          <h2 className="mt-6 font-serif text-5xl font-light tracking-[0.03em] text-ivory sm:text-7xl lg:text-8xl">{t.final.brand}</h2>
          <p className="mt-5 text-xs tracking-[0.22em] text-champagne/78">{t.final.type} · {t.final.volume}</p>
        </header>

        <div
          data-model-interaction-zone
          className="my-10 h-[420px] w-full touch-pan-y cursor-grab active:cursor-grabbing sm:h-[500px]"
          aria-hidden="true"
        />

        <div className="flex flex-col items-center">
          <div className="space-y-2 text-sm leading-6 tracking-[0.1em] text-ivory/72">
            <p>{t.final.summaryLine1}</p>
            <p>{t.final.summaryLine2}</p>
            <p>{t.final.summaryLine3}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setOpen(true);
            }}
            className="mt-8 border border-champagne/45 bg-[#11100f]/90 px-8 py-4 text-[0.7rem] font-semibold tracking-[0.2em] text-ivory transition-colors hover:border-ivory/65 hover:bg-ivory hover:text-[#0b0a0a] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          >
            {t.final.cta}
          </button>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[0.65rem] tracking-[0.14em] text-ivory/42">
            <span>{t.final.specs.origin}</span><span aria-hidden="true">·</span>
            <span>{t.final.specs.concentration}</span><span aria-hidden="true">·</span>
            <span>{t.final.specs.flacon}</span>
          </div>
          <p className="mt-6 text-[0.62rem] tracking-[0.18em] text-champagne/44">{t.final.editionNote}</p>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        className="w-[min(92vw,540px)] border border-champagne/24 bg-[#11100f] p-0 text-ivory shadow-2xl backdrop:bg-black/80"
      >
        <div className="p-7 text-left sm:p-9">
          <div className="flex items-start justify-between gap-6 border-b border-champagne/14 pb-5">
            <div>
              <p className="text-[0.63rem] tracking-[0.2em] text-champagne/62">PLUMAGE NOCTURNE</p>
              <h3 className="mt-2 font-serif text-3xl text-ivory">{submitted ? t.final.successTitle : t.final.inquiryTitle}</h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[0.62rem] tracking-[0.16em] text-ivory/55 transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-1 focus-visible:outline-champagne"
            >
              {t.final.closeLabel}
            </button>
          </div>

          {submitted ? (
            <p className="py-9 text-base leading-7 text-ivory/68">{t.final.successBody}</p>
          ) : (
            <form
              className="pt-7"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <label className="block text-[0.66rem] tracking-[0.15em] text-champagne/75">
                {t.final.nameLabel}
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-3 w-full border border-champagne/20 bg-black/25 px-4 py-3 text-base text-ivory outline-none transition-colors focus:border-champagne/65"
                />
              </label>
              <label className="mt-6 block text-[0.66rem] tracking-[0.15em] text-champagne/75">
                {t.final.contactLabel}
                <input
                  name="contact"
                  required
                  autoComplete="email"
                  className="mt-3 w-full border border-champagne/20 bg-black/25 px-4 py-3 text-base text-ivory outline-none transition-colors focus:border-champagne/65"
                />
              </label>
              <p className="mt-4 text-xs leading-5 text-ivory/42">{t.final.privacyNote}</p>
              <button
                type="submit"
                className="mt-7 w-full border border-champagne/45 bg-ivory px-6 py-4 text-[0.68rem] font-semibold tracking-[0.2em] text-[#0b0a0a] transition-colors hover:bg-champagne focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-champagne"
              >
                {t.final.submitLabel}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </section>
  );
};
