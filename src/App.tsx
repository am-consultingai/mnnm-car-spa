import { useState, useEffect, useCallback, useRef } from 'react';
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

  const price = bookingConfig?.price ?? 15;
  const currency = bookingConfig?.currency ?? '₪';

  return (
    <div className="min-h-screen font-sans bg-brand-navy selection:bg-brand-blue/30 selection:text-white">
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
    </div>
  );
}
