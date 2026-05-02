import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavigationProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navigation({ lang, setLang }: NavigationProps) {
  const t = translations[lang].nav;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.home, href: '#home' },
    { label: t.why, href: '#why' },
    { label: t.tech, href: '#tech' },
    { label: t.pricing, href: '#pricing' },
    { label: t.team, href: '#team' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        isScrolled
          ? 'bg-brand-navy/90 backdrop-blur-md py-4 shadow-2xl border-b border-white/5'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex flex-col group">
          <h1 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight leading-none">
            MNNM <span className="text-brand-yellow">·</span>
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase font-medium mt-1">
            {lang === 'he' ? 'ספא רכב' : 'Car Spa'}
          </p>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold text-white/70 hover:text-brand-yellow transition-colors uppercase tracking-wider"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              className="text-[11px] font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest border border-white/15 hover:border-white/40 rounded-full px-3 py-1.5"
              aria-label="Toggle language"
            >
              {lang === 'he' ? 'EN' : 'עב'}
            </button>
            <a
              href="#booking"
              className="px-6 py-3 bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-white transition-all rounded-sm shadow-lg shadow-brand-yellow/20"
            >
              {t.cta}
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full w-full bg-brand-navy border-b border-white/10 py-6 px-6 shadow-2xl"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-white/80 hover:text-brand-yellow transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="h-px w-full bg-white/10 my-2" />
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setLang(lang === 'he' ? 'en' : 'he');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-md bg-white/5 border border-white/10 text-sm font-bold text-white text-center uppercase"
              >
                {lang === 'he' ? 'English' : 'עברית'}
              </button>
              <a
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 bg-brand-yellow text-brand-navy font-bold text-center rounded-md shadow-xl"
              >
                {t.cta}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
