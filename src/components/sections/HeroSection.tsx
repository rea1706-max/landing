import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  onDiscoverClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onDiscoverClick }) => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-5 pb-10 pt-36 md:px-10 md:pt-28">
      <div className="paper-texture absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 hidden w-[55%] bg-[linear-gradient(90deg,transparent,rgba(74,53,67,0.12))] lg:block" aria-hidden="true" />
      <div
        data-hero-veil
        className="absolute inset-x-0 bottom-0 h-[34vh] bg-gradient-to-b from-transparent via-[#100e0e]/35 to-[#100e0e]/95 opacity-0"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="order-2 flex max-w-xl flex-col items-start lg:order-1 lg:col-span-5" data-hero-copy>
          <p className="mb-7 text-[0.7rem] font-medium tracking-[0.24em] text-champagne/85">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(2.75rem,6.3vw,6.35rem)] font-normal leading-[1.12] tracking-[-0.045em] text-ivory">
            <span className="block">{t.hero.titleLine1}</span>
            <span className="mt-1 block text-ivory/92">{t.hero.titleLine2}</span>
          </h1>
          <p className="mt-8 max-w-md text-lg italic leading-8 text-ivory/88 md:text-xl">
            {t.hero.lead}
          </p>
          <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-ivory/68 md:text-base">
            {t.hero.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onDiscoverClick}
              className="border border-champagne/45 bg-[#12100f]/75 px-6 py-4 text-[0.7rem] font-semibold tracking-[0.12em] text-ivory transition-colors hover:border-ivory/65 hover:bg-ivory hover:text-[#0b0a0a] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-champagne"
            >
              {t.hero.exploreCta}
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('final')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-champagne/20 px-6 py-4 text-[0.7rem] font-semibold tracking-[0.12em] text-champagne transition-colors hover:border-ivory/65 hover:text-ivory focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-champagne"
            >
              {t.hero.availabilityCta}
            </button>
          </div>
          <p className="mt-6 text-[0.62rem] tracking-[0.14em] text-ivory/45 sm:hidden">{t.hero.meta}</p>
        </div>

        <div className="order-1 flex items-center justify-center lg:order-2 lg:col-span-7">
          <div
            data-model-interaction-zone
            className="relative h-[34svh] min-h-[250px] w-full touch-pan-y cursor-grab active:cursor-grabbing md:h-[42svh] md:max-h-[460px] md:min-h-[320px] lg:h-[76vh] lg:max-h-none lg:min-h-0"
          >
            <span className="sr-only">{t.hero.imageAlt}</span>
          </div>
        </div>
      </div>

      <div data-hero-meta className="absolute inset-x-5 bottom-6 z-20 hidden items-center justify-between border-t border-champagne/12 pt-4 text-[0.65rem] tracking-[0.2em] text-ivory/40 sm:flex md:inset-x-10">
        <span>PLUMAGE NOCTURNE</span>
        <span>{t.hero.meta}</span>
      </div>
    </section>
  );
};
