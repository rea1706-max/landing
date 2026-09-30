import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SectionLabel } from '../ui/SectionLabel';

const images = [
  '/images/opening-citrus.jpg',
  '/images/heart-jasmine.jpg',
  '/images/base-wood.jpg',
];

export const CompositionSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="composition" className="section-anchor relative w-full border-b border-champagne/10 bg-[#100e0e]/78 px-5 py-24 md:px-10 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 -top-36 h-36 bg-gradient-to-b from-transparent to-[#100e0e]/80" aria-hidden="true" />
      <div className="paper-texture absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="z-20 flex flex-col items-start lg:col-span-4 lg:sticky lg:top-32 lg:self-start" data-composition-intro>
          <SectionLabel label={t.composition.label} />
          <h2 className="mt-8 font-serif text-5xl font-light leading-[0.9] tracking-[-0.02em] text-ivory sm:text-6xl lg:text-7xl">
            <span className="block">{t.composition.titleLine1}</span>
            <span className="mt-2 block italic">{t.composition.titleLine2}</span>
          </h2>
          <p className="mt-8 max-w-sm text-base leading-7 text-ivory/68">
            {t.composition.description}
          </p>
          <button
            type="button"
            onClick={() => document.getElementById('object')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 border-b border-champagne/55 pb-2 text-[0.7rem] font-semibold tracking-[0.2em] text-champagne transition-colors hover:border-ivory hover:text-ivory focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          >
            {t.composition.cta}
          </button>
          <p className="mt-12 border-t border-champagne/15 pt-5 text-[0.66rem] tracking-[0.17em] text-ivory/42">
            {t.composition.noteStructure}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-3 lg:col-span-8">
          {t.composition.arches.map((arch, index) => (
            <article key={arch.title} className="group" data-ingredient-card>
              <figure className="relative h-[520px] overflow-hidden rounded-t-[150px] border border-champagne/22 bg-black sm:h-[470px] lg:h-[560px]">
                <img
                  src={images[index]}
                  alt={arch.imageAlt}
                  loading="lazy"
                  decoding="async"
                  data-ingredient-media
                  className={`h-full w-full scale-[1.08] object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.12] ${index === 1 ? 'object-[42%_center]' : 'object-center'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#0b0a0a]/72" aria-hidden="true" />
              </figure>
              <div className="px-2 pt-6">
                <h3 className="text-[0.7rem] font-semibold tracking-[0.2em] text-champagne">{arch.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ivory/88">{arch.notes.join(' · ')}</p>
                <p className="mt-3 text-sm leading-6 text-ivory/52">{arch.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
