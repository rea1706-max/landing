import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SectionLabel } from '../ui/SectionLabel';

export const ObjectSection: React.FC = () => {
  const { t } = useLanguage();
  const [firstDetail, ...otherDetails] = t.objectStory.details;

  return (
    <section id="object" className="section-anchor relative flex min-h-[128vh] w-full flex-col justify-between overflow-hidden bg-[#0b0a0a]/35 px-5 py-24 md:min-h-[170vh] md:px-10 md:py-32">
      <div className="paper-texture absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(82,71,66,0.14),transparent_42%)]" aria-hidden="true" />
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="flex flex-col items-start lg:col-span-4" data-reveal>
            <h2 className="font-serif text-[1.85rem] font-normal leading-[1.25] tracking-[-0.025em] text-ivory sm:text-4xl lg:text-[clamp(1.75rem,2.2vw,2.3rem)]">
              {t.objectStory.title}
            </h2>
            <p className="mt-8 max-w-sm text-base leading-7 text-ivory/72">{t.objectStory.dayBody}</p>
            <p className="mt-5 max-w-sm text-base leading-7 text-ivory/52">{t.objectStory.nightBody}</p>
          </div>

          <div
            data-object-stage
            data-model-interaction-zone
            className="min-h-[58svh] touch-pan-y cursor-grab active:cursor-grabbing md:min-h-[68vh] lg:col-span-5"
            aria-hidden="true"
          />

          <aside className="self-start border border-champagne/16 bg-[#11100f] p-7 lg:col-span-3 lg:bg-[#11100f]/80 lg:backdrop-blur-md" data-reveal>
            <SectionLabel label={t.objectStory.detailsLabel} hasLine={false} />
            <h3 className="mt-6 font-serif text-2xl font-normal leading-[1.35] text-ivory">{firstDetail.title}</h3>
            <p className="mt-5 text-[0.95rem] leading-7 text-ivory/62">{firstDetail.description}</p>
          </aside>
        </div>

        <div className="my-16 grid grid-cols-1 gap-px border border-champagne/12 bg-champagne/12 md:grid-cols-3" data-reveal>
          {otherDetails.map((detail) => (
            <div key={detail.title} className="bg-[#0d0c0c] p-6 md:bg-[#0d0c0c]/92 md:p-7">
              <h3 className="font-serif text-xl font-normal leading-snug text-champagne">{detail.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-7 text-ivory/55">{detail.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
