import { useState, useEffect } from 'react';
import { translations, Language } from './translations';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Why from './components/Why';
import Tech from './components/Tech';
import Pricing from './components/Pricing';
import Team from './components/Team';
import How from './components/How';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Booking from './components/Booking';
import Charity from './components/Charity';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'he' || saved === 'en') return saved;
    return window.location.pathname.startsWith('/en') ? 'en' : 'he';
  });

  useEffect(() => {
    const dir = translations[lang].dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.className = dir === 'rtl' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);

    // Update URL without reload
    const newPath = lang === 'en' ? '/en' : '/';
    if (window.location.pathname !== newPath) {
      window.history.pushState({ lang }, '', newPath);
    }
  }, [lang]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const isEn = window.location.pathname.startsWith('/en');
      setLang(isEn ? 'en' : 'he');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-brand-navy selection:bg-brand-blue/30 selection:text-white">
      <Navigation lang={lang} setLang={setLang} />
      
      <main>
        <Hero lang={lang} />
        <Why lang={lang} />
        <Tech lang={lang} />
        <Pricing lang={lang} />
        <Team lang={lang} />
        <How lang={lang} />
        <Testimonials lang={lang} />
        <FAQ lang={lang} />
        <Booking lang={lang} />
        <Charity lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}

