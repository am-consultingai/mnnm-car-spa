import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang].hero;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/clean.png"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/car_wash.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay so text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/90 via-brand-navy/70 to-brand-navy/95" />
      <div className="absolute inset-0 grid-bg opacity-[0.07] pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-10 relative z-10 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <span className="eyebrow text-brand-yellow text-xs font-bold uppercase mb-6 inline-block">
            {lang === 'he' ? 'שטיפת רכב ידנית · ישראל' : 'Hand-wash car spa · Israel'}
          </span>

          <h1 className={cn(
            "font-display font-black text-white leading-[0.9] mb-8",
            "text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem]",
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

          <p className="max-w-xl text-lg md:text-2xl leading-relaxed text-white/80 mb-12 font-light">
            {t.sub}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <a
              href="#booking"
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
            </a>

            <a
              href="#how"
              className="text-sm font-medium text-white/70 hover:text-brand-yellow transition-colors underline-offset-4 hover:underline"
            >
              {lang === 'he' ? 'איך זה עובד? →' : 'How it works? →'}
            </a>
          </div>

          {/* Stat row */}
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 sm:flex sm:gap-16 gap-6 max-w-xl">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                {lang === 'he' ? 'מחיר' : 'Price'}
              </p>
              <p className="text-2xl md:text-3xl font-bold font-display text-white">15 ₪</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                {lang === 'he' ? 'תרומה' : 'Charity'}
              </p>
              <p className="text-2xl md:text-3xl font-bold font-display text-white">
                10%
                <span className="text-brand-yellow"> ★</span>
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                {lang === 'he' ? 'משך הזמן' : 'Duration'}
              </p>
              <p className="text-2xl md:text-3xl font-bold font-display text-white">
                20–30 <span className="text-base text-white/60">{lang === 'he' ? 'דק׳' : 'min'}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
