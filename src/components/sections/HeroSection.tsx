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
        <div className="order-2 flex max-w-xl flex-col items-start lg:order-1 lg:col-span-5" data-hero-copy data-reveal>
          <p className="mb-7 text-[0.7rem] font-medium tracking-[0.24em] text-champagne/85">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(3.25rem,8vw,7.4rem)] font-light leading-[0.8] tracking-[-0.025em] text-ivory">
            <span className="block">{t.hero.titleLine1}</span>
            <span className="mt-4 block italic text-ivory/92">{t.hero.titleLine2}</span>
          </h1>
          <p className="mt-9 max-w-md text-base leading-7 text-ivory/68 md:text-lg md:leading-8">
            {t.hero.subtitle}
          </p>
          <button
            type="button"
            onClick={onDiscoverClick}
            className="mt-9 border border-champagne/45 bg-[#12100f]/75 px-6 py-4 text-[0.7rem] font-semibold tracking-[0.2em] text-ivory transition-colors hover:border-ivory/65 hover:bg-ivory hover:text-[#0b0a0a] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          >
            {t.hero.cta}
          </button>
        </div>

        <div className="order-1 flex min-h-[28vh] items-center justify-center lg:order-2 lg:col-span-7 lg:min-h-[76vh]">
          <div className="mobile-object-stage relative h-[30vh] w-[86vw] max-w-[430px] md:hidden">
            <img
              src="/images/peacock-object-transparent.png"
              alt={t.hero.imageAlt}
              fetchPriority="high"
              className="object-preview relative z-10 h-full w-full object-contain object-bottom"
            />
          </div>
          <div className="relative hidden h-[74vh] w-full md:block">
            <span className="sr-only">{t.hero.imageAlt}</span>
          </div>
        </div>
      </div>

      <div data-hero-meta className="absolute inset-x-5 bottom-6 z-20 hidden items-center justify-between border-t border-champagne/12 pt-4 text-[0.65rem] tracking-[0.2em] text-ivory/40 sm:flex md:inset-x-10">
        <span>PLUMAGE NOCTURNE</span>
        <span>{t.hero.metaEdition}</span>
        <span>{t.hero.metaPlace}</span>
      </div>
    </section>
  );
};
