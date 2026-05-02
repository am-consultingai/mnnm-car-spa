import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeroProps {
  lang: Language;
  price: number | null;
  currency: string | null;
  onBook: () => void;
}

export default function Hero({ lang, price, currency, onBook }: HeroProps) {
  const t = translations[lang].hero;

  return (
    <section id="home" className="relative min-h-dvh flex items-center overflow-hidden bg-brand-navy">
      {/* Background video — let it actually be seen */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={`${import.meta.env.BASE_URL}founders_wash_poster.jpg`}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${import.meta.env.BASE_URL}founders_wash.mp4`} type="video/mp4" />
      </video>

      {/* Cinematic overlay: dark at top + bottom for legibility, video shows through the middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/85 via-brand-navy/30 to-brand-navy/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/70 via-transparent to-brand-navy/40" />
      <div className="absolute inset-0 grid-bg opacity-[0.05] pointer-events-none" />

      {/* Subtle live-video badge */}
      <div className="absolute top-24 right-6 md:top-28 md:right-10 z-10 flex items-center gap-2 bg-brand-navy/60 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
        <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
          {lang === 'he' ? 'בעבודה' : 'In the bay'}
        </span>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 sm:px-8 md:px-10 relative z-10 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-brand-yellow/15 border border-brand-yellow/40 rounded-full text-brand-yellow text-sm md:text-base font-bold backdrop-blur-sm shadow-lg shadow-brand-yellow/10">
            <Sparkles size={14} strokeWidth={2.5} />
            {t.foundersBadge}
          </span>

          <h1 className={cn(
            "font-display font-black text-white leading-[0.9] mb-8",
            "text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem]",
            lang === 'he' ? 'tracking-tight' : 'tracking-tighter'
          )}>
            {lang === 'he' ? (
              <>
                <span className="block">מננם</span>
                <span className="block text-brand-yellow">ספא רכב</span>
              </>
            ) : (
              <>
                <span className="block">MNNM</span>
                <span className="block text-brand-yellow">Car Spa</span>
              </>
            )}
          </h1>

          <p className="max-w-xl text-lg sm:text-xl md:text-2xl leading-relaxed text-white/80 mb-12 font-light">
            {price !== null && currency
              ? t.sub.replace('{price}', `${price} ${currency}`)
              : t.subNoPrice}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <button
              type="button"
              onClick={onBook}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-yellow text-brand-navy font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-2xl shadow-brand-yellow/20 rounded-sm"
            >
              {t.cta}
              <ArrowRight
                className={cn(
                  'transition-transform group-hover:translate-x-1',
                  lang === 'he' ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0' : ''
                )}
                size={18}
                strokeWidth={2.5}
              />
            </button>

            <a
              href="#how"
              className="text-sm font-medium text-white/70 hover:text-brand-yellow transition-colors underline-offset-4 hover:underline"
            >
              {lang === 'he' ? 'איך זה עובד? →' : 'How it works? →'}
            </a>
          </div>

          {/* Stat row */}
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 sm:flex sm:gap-16 gap-4 sm:gap-6 max-w-xl">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                {lang === 'he' ? 'מחיר' : 'Price'}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white min-h-[1em]">
                {price !== null && currency ? `${price} ${currency}` : ' '}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                {lang === 'he' ? 'תרומה' : 'Charity'}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white">
                10%
                <span className="text-brand-yellow"> ★</span>
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                {lang === 'he' ? 'משך הזמן' : 'Duration'}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white">
                20–30 <span className="text-base text-white/60">{lang === 'he' ? 'דק׳' : 'min'}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
