import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const Navigation: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const items = [
    ['hero', t.nav.home],
    ['composition', t.nav.fragrance],
    ['object', t.nav.object],
    ['final', t.nav.order],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-champagne/10 bg-[#0b0a0a]/95 backdrop-blur-md lg:border-b-0 lg:bg-transparent lg:backdrop-blur-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 pb-3 pt-4 md:px-10 md:py-5">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="group shrink-0 text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-champagne"
        >
          <span className="block font-serif text-lg tracking-[0.3em] text-ivory transition-colors group-hover:text-champagne md:text-xl">
            {t.nav.brand}
          </span>
          <span className="block text-[0.62rem] tracking-[0.36em] text-champagne/70">
            {t.nav.brandSub}
          </span>
        </button>

        <nav className="hidden items-center gap-7 text-[0.7rem] font-medium tracking-[0.2em] text-ivory/70 lg:flex" aria-label="Primary">
          {items.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className="py-2 transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-champagne"
            >
              {label}
            </button>
          ))}
        </nav>

        <div
          className="flex shrink-0 items-center border border-champagne/25 bg-black/20 p-1 text-[0.68rem] tracking-[0.16em]"
          role="group"
          aria-label={t.nav.languageLabel}
        >
          {(['ru', 'en'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              aria-pressed={language === lang}
              className={`px-2.5 py-1.5 transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-champagne ${
                language === lang ? 'bg-ivory text-[#0b0a0a]' : 'text-ivory/55 hover:text-ivory'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <nav
        className="no-scrollbar flex gap-6 overflow-x-auto px-5 pb-3 text-[0.62rem] tracking-[0.18em] text-ivory/60 lg:hidden"
        aria-label="Primary mobile"
      >
        {items.slice(1).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            className="shrink-0 py-1 transition-colors hover:text-ivory focus-visible:outline focus-visible:outline-1 focus-visible:outline-champagne"
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
};
