import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { translations, Language } from './translations';
import { cn } from './lib/utils';
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
import BookingDialog from './components/BookingDialog';
import { BookingConfig, fetchBookingConfig } from './lib/booking';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '') || '';
const HE_PATH = `${BASE}/`;
const EN_PATH = `${BASE}/en`;

const detectLang = (): Language => {
  const path = window.location.pathname;
  return path === EN_PATH || path.startsWith(`${EN_PATH}/`) ? 'en' : 'he';
};

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'he' || saved === 'en') return saved;
    return detectLang();
  });

  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingConfig, setBookingConfig] = useState<BookingConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(false);
  const [configError, setConfigError] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const fetchedOnce = useRef(false);

  const refreshConfig = useCallback(async () => {
    setConfigLoading(true);
    setConfigError(false);
    try {
      const cfg = await fetchBookingConfig();
      setBookingConfig(cfg);
    } catch {
      setConfigError(true);
    } finally {
      setConfigLoading(false);
    }
  }, []);

  // Fetch config on mount so the price across the page (Hero, Pricing, Booking banner, Nav)
  // reflects the live value. Failures fall back to defaults — page never looks broken.
  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;
    refreshConfig();
  }, [refreshConfig]);

  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  useEffect(() => {
    const dir = translations[lang].dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.className = dir === 'rtl' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);

    const newPath = lang === 'en' ? EN_PATH : HE_PATH;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ lang }, '', newPath);
    }
  }, [lang]);

  useEffect(() => {
    const handlePopState = () => setLang(detectLang());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Watch the hero so we only show the sticky mobile CTA after the user scrolls
  // past it — no point doubling up while the hero's own button is on screen.
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { rootMargin: '-20% 0px 0px 0px' }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // No fallback price: show nothing until the real value arrives so users
  // don't see a stale number that then jumps up.
  const price = bookingConfig?.price ?? null;
  const currency = bookingConfig?.currency ?? null;

  const tNav = translations[lang].nav;
  const priceLabel = price !== null && currency ? `${price} ${currency}` : '';
  const stickyVisible = !heroInView && !bookingOpen;

  return (
    <div className="min-h-dvh font-sans bg-brand-navy selection:bg-brand-blue/30 selection:text-white">
      <Navigation lang={lang} setLang={setLang} price={price} currency={currency} onBook={openBooking} />

      <main>
        <Hero lang={lang} price={price} currency={currency} onBook={openBooking} />
        <Why lang={lang} />
        <Tech lang={lang} />
        <Pricing lang={lang} price={price} currency={currency} onBook={openBooking} />
        <Team lang={lang} />
        <How lang={lang} />
        <Testimonials lang={lang} />
        <FAQ lang={lang} />
        <Booking lang={lang} price={price} currency={currency} onOpen={openBooking} />
        <Charity lang={lang} />
      </main>

      <Footer lang={lang} />

      <BookingDialog
        lang={lang}
        open={bookingOpen}
        onClose={closeBooking}
        config={bookingConfig}
        configError={configError}
        configLoading={configLoading}
        onConfigRefresh={refreshConfig}
      />

      <div
        className={cn(
          'lg:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3',
          'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
          'bg-gradient-to-t from-brand-navy-deep via-brand-navy-deep/95 to-brand-navy-deep/0',
          'transition-all duration-300',
          stickyVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        )}
        aria-hidden={!stickyVisible}
      >
        <button
          type="button"
          onClick={openBooking}
          tabIndex={stickyVisible ? 0 : -1}
          className="group w-full inline-flex items-center justify-center gap-3 py-4 bg-brand-yellow text-brand-navy font-bold text-sm uppercase tracking-wider rounded-md shadow-2xl shadow-brand-yellow/30"
        >
          {priceLabel ? `${tNav.ctaPrefix}${priceLabel}` : tNav.book}
          <ArrowRight
            className={lang === 'he' ? 'rotate-180' : ''}
            size={16}
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
}
