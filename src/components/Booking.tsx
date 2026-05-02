import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Language, translations } from '../translations';
import { cn } from '../lib/utils';

interface BookingProps {
  lang: Language;
  price: number;
  currency: string;
  onOpen: () => void;
}

export default function Booking({ lang, price, currency, onOpen }: BookingProps) {
  const t = translations[lang].booking;

  return (
    <section id="booking" className="section-padding bg-brand-navy relative border-b border-white/5">
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-6xl mx-auto bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* Copy Side */}
            <div className="lg:col-span-3 p-8 md:p-12 lg:p-16">
              <span className="eyebrow text-brand-yellow text-xs font-bold uppercase mb-4 inline-block">
                {t.eyebrow}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight mb-6 leading-[0.95]">
                {t.title}
              </h2>
              <p className="text-white/65 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                {t.bannerCopy}
              </p>

              <button
                type="button"
                onClick={onOpen}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 md:py-5 bg-brand-yellow text-brand-navy font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-2xl shadow-brand-yellow/20 rounded-md"
              >
                {t.openCta} — {price} {currency}
                <ArrowRight
                  className={cn(
                    'transition-transform group-hover:translate-x-1',
                    lang === 'he' ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0' : ''
                  )}
                  size={16}
                  strokeWidth={2.5}
                />
              </button>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 pt-10 mt-10 border-t border-white/10">
                {[t.trust1, t.trust2, t.trust3].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white/55">
                    <CheckCircle2 className="text-brand-yellow" size={13} strokeWidth={2.5} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Side */}
            <div className="hidden lg:block lg:col-span-2 relative overflow-hidden bg-brand-navy-deep">
              <img
                src={`${import.meta.env.BASE_URL}clean.png`}
                alt={lang === 'he' ? 'רכב נקי לאחר הטיפול' : 'A car after the wash'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl md:text-7xl font-display font-black text-brand-yellow tracking-tighter leading-none">
                    {price}
                  </span>
                  <span className="text-2xl md:text-3xl font-display font-bold text-white/90">{currency}</span>
                </div>
                <p className="text-white/80 text-base leading-snug max-w-[260px]">
                  {lang === 'he'
                    ? 'רחיצה ידנית מלאה. כולל כל מה שכתוב למעלה.'
                    : 'Full hand wash. Everything in the list above.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
