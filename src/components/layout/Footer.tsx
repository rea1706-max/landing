import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative z-30 border-t border-champagne/12 bg-[#090808] px-5 py-14 text-ivory/55 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-9 md:grid-cols-[1.4fr_auto_1fr] md:items-start">
          <div>
            <p className="font-serif text-lg tracking-[0.24em] text-ivory">{t.nav.brand}</p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-[0.66rem] tracking-[0.16em] text-champagne/72" aria-label="Footer">
            <button type="button" onClick={() => goTo('composition')} className="hover:text-ivory focus-visible:outline focus-visible:outline-1 focus-visible:outline-champagne">{t.footer.fragrance}</button>
            <button type="button" onClick={() => goTo('object')} className="hover:text-ivory focus-visible:outline focus-visible:outline-1 focus-visible:outline-champagne">{t.footer.object}</button>
            <button type="button" onClick={() => goTo('final')} className="hover:text-ivory focus-visible:outline focus-visible:outline-1 focus-visible:outline-champagne">{t.footer.order}</button>
          </nav>

          <div className="text-left text-[0.62rem] leading-5 tracking-[0.12em] text-ivory/36 md:text-right">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
