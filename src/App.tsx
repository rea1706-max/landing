import React, { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './context/LanguageContext';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { CompositionSection } from './components/sections/CompositionSection';
import { ObjectSection } from './components/sections/ObjectSection';
import { FinalSection } from './components/sections/FinalSection';

gsap.registerPlugin(ScrollTrigger);

const PerfumeCanvas = lazy(() =>
  import('./components/three/PerfumeCanvas').then((module) => ({ default: module.PerfumeCanvas }))
);

export function AppContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [render3D, setRender3D] = useState(() => window.matchMedia('(min-width: 768px)').matches);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const handleChange = () => setRender3D(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom 18%',
            scrub: 1.6,
            invalidateOnRefresh: true,
          },
        })
        .to('[data-hero-copy]', { y: -58, opacity: 0.24, filter: 'blur(2px)', ease: 'none' }, 0)
        .to('[data-hero-meta]', { y: -18, opacity: 0, ease: 'none' }, 0)
        .to('[data-hero-veil]', { opacity: 1, ease: 'none' }, 0);

      gsap.fromTo(
        '[data-composition-intro]',
        { y: 72, opacity: 0.16 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#composition',
            start: 'top 92%',
            end: 'top 42%',
            scrub: 1.35,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      const ingredientCards = gsap.utils.toArray<HTMLElement>('[data-ingredient-card]');
      ingredientCards.forEach((card, index) => {
        const media = card.querySelector<HTMLElement>('[data-ingredient-media]');

        gsap.from(card, {
          y: 74,
          x: index % 2 === 0 ? -18 : 18,
          rotation: index % 2 === 0 ? -1.4 : 1.4,
          opacity: 0,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        });

        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.1,
              },
            },
          );
        }
      });
    }, containerRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const handleDiscoverClick = () => {
    const el = document.getElementById('composition');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="site-texture relative min-h-screen overflow-x-clip bg-[#0B0A0A] text-[#E8DDD0]">
      <div className="site-surface-layer" aria-hidden="true" />
      <Navigation />
      {render3D ? (
        <Suspense fallback={null}>
          <PerfumeCanvas />
        </Suspense>
      ) : null}
      <main className="relative z-20">
        <HeroSection onDiscoverClick={handleDiscoverClick} />
        <CompositionSection />
        <ObjectSection />
        <FinalSection />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
