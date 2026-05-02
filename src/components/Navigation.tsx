import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { cn } from '../lib/utils';
import { Menu, X, Sparkles } from 'lucide-react';
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
        isScrolled ? 'bg-brand-navy/90 backdrop-blur-md py-6 shadow-2xl border-b border-white/5' : 'bg-transparent py-10'
      )}
    >
      <div className="container mx-auto px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex flex-col group">
          <h1 className="text-2xl font-display font-bold text-white uppercase tracking-tighter leading-none">MNNM</h1>
          <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-medium">Car Spa Lab</p>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          <div className="flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] font-bold text-white/60 hover:text-brand-blue transition-colors uppercase tracking-[0.2em]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 ml-4">
            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              className="text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
            >
              {lang === 'he' ? 'EN / עב' : 'HE / עב'}
            </button>
            <a
              href="#booking"
              className="px-8 py-3 bg-transparent border border-white/20 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all"
            >
              {t.cta}
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full w-full bg-brand-navy border-b border-white/5 py-6 px-6 shadow-2xl"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-white/80 hover:text-brand-yellow"
              >
                {item.label}
              </a>
            ))}
            <div className="h-px w-full bg-white/5 my-2" />
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setLang(lang === 'he' ? 'en' : 'he');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-sm font-bold text-white text-center uppercase"
              >
                {lang === 'he' ? 'English (EN)' : 'עברית (HE)'}
              </button>
              <a
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 bg-brand-yellow text-brand-navy font-bold text-center rounded-lg shadow-xl"
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
