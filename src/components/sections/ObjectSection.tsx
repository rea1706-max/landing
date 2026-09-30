import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SectionLabel } from '../ui/SectionLabel';

export const ObjectSection: React.FC = () => {
  const { t } = useLanguage();
  const labels = Object.values(t.objectStory.labels);

  return (
    <section id="object" className="section-anchor relative flex min-h-[128vh] w-full flex-col justify-between overflow-hidden bg-[#0b0a0a]/35 px-5 py-24 md:min-h-[170vh] md:px-10 md:py-32">
      <div className="paper-texture absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(82,71,66,0.14),transparent_42%)]" aria-hidden="true" />
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="flex flex-col items-start lg:col-span-4" data-reveal>
            <SectionLabel label={t.objectStory.label} />
            <h2 className="mt-8 font-serif text-5xl font-light leading-[0.88] tracking-[-0.02em] text-ivory sm:text-6xl lg:text-7xl">
              <span className="block">{t.objectStory.titleLine1}</span>
              <span className="mt-2 block italic">{t.objectStory.titleLine2}</span>
              <span className="mt-2 block">{t.objectStory.titleLine3}</span>
            </h2>
            <p className="mt-8 max-w-sm text-base leading-7 text-ivory/72">{t.objectStory.body1}</p>
            <p className="mt-5 max-w-sm text-base leading-7 text-ivory/52">{t.objectStory.body2}</p>
          </div>

          <div className="min-h-[56vh] lg:col-span-5" aria-hidden="true">
            <img src="/images/peacock-object-glb-neutral.png" alt="" className="object-preview h-full w-full object-contain md:hidden" loading="lazy" />
          </div>

          <aside className="self-start border border-champagne/16 bg-[#11100f]/80 p-7 backdrop-blur-md lg:col-span-3" data-reveal>
            <SectionLabel label={t.objectStory.storyLabel} hasLine={false} />
            <h3 className="mt-6 font-serif text-3xl leading-tight text-ivory">{t.objectStory.storyTitle}</h3>
            <p className="mt-5 text-sm leading-7 text-ivory/62">{t.objectStory.storyBody}</p>
          </aside>
        </div>

        <div className="my-16 grid grid-cols-1 gap-px border border-champagne/12 bg-champagne/12 md:grid-cols-3" data-reveal>
          {[0, 2, 4].map((index) => (
            <div key={labels[index]} className="bg-[#0d0c0c]/92 p-6 md:p-7">
              <h3 className="text-xs font-semibold tracking-[0.18em] text-champagne">{labels[index]}</h3>
              <p className="mt-3 text-sm leading-6 text-ivory/55">{labels[index + 1]}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
