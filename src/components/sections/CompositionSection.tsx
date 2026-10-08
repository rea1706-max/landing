import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const images = [
  '/images/arch-glow.png',
  '/images/arch-glass.png',
  '/images/arch-metal.png',
];

export const CompositionSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="composition" className="section-anchor relative w-full border-b border-champagne/10 bg-[#100e0e]/78 px-5 py-24 md:px-10 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 -top-36 h-36 bg-gradient-to-b from-transparent to-[#100e0e]/80" aria-hidden="true" />
      <div className="paper-texture absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-3">
        {t.composition.arches.map((arch, index) => (
          <article key={arch.number} className="group" data-ingredient-card>
            <figure className="relative h-[520px] overflow-hidden rounded-t-[150px] border border-champagne/22 bg-black sm:h-[470px] lg:h-[560px]">
              <img
                src={images[index]}
                alt={arch.imageAlt}
                loading="lazy"
                decoding="async"
                data-ingredient-media
                className="arch-photograph h-full w-full scale-[1.08] object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.12]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,15,17,0.12),rgba(20,15,17,0.06)_45%,rgba(11,10,10,0.76))]" aria-hidden="true" />
            </figure>
            <div className="px-2 pt-6">
              <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-champagne">{arch.number} / {arch.topic}</p>
              <h2 className="mt-3 font-serif text-[1.65rem] font-normal leading-[1.3] tracking-[-0.018em] text-ivory lg:text-[1.8rem]">{arch.title}</h2>
              <p className="mt-4 text-[0.95rem] leading-7 text-ivory/68">{arch.description}</p>
              <p className="mt-5 text-[0.68rem] tracking-[0.12em] text-champagne/75">{arch.spec}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
