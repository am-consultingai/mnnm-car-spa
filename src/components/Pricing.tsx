import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface PricingProps {
  lang: Language;
  price: number;
  currency: string;
  onBook: () => void;
}

export default function Pricing({ lang, price, currency, onBook }: PricingProps) {
  const t = translations[lang].pricing;

  return (
    <section id="pricing" className="section-padding bg-brand-navy relative overflow-hidden border-b border-white/5">
      {/* Soft yellow halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: copy */}
          <div className={cn(lang === 'he' ? 'md:order-2 text-right' : 'md:order-1 text-left')}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight mb-6 leading-[0.95]">
              {t.eyebrow}
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              {t.notes}
            </p>
            <div className="flex items-center gap-3 text-brand-yellow text-sm font-semibold uppercase tracking-wider">
              <span className="block w-8 h-px bg-brand-yellow" />
              {lang === 'he' ? '15 ₪. נקודה.' : '15 ₪. Period.'}
            </div>
          </div>

          {/* Right: card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              'relative w-full bg-white/[0.04] border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-sm',
              lang === 'he' ? 'md:order-1' : 'md:order-2'
            )}
          >
            {/* yellow ribbon */}
            <span className="absolute -top-3 left-8 bg-brand-yellow text-brand-navy text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm">
              {lang === 'he' ? 'הכי משתלם' : 'Best value'}
            </span>

            <div className="mb-8 pb-8 border-b border-white/10">
              <p className="text-[11px] uppercase tracking-widest text-white/50 mb-3">{t.sub}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl md:text-8xl font-display font-black text-brand-yellow tracking-tighter leading-none">
                  {price}
                </span>
                <span className="text-3xl md:text-4xl font-display font-bold text-white/80">{currency}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {t.includes.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-white/85 text-base">{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={onBook}
              className="group flex items-center justify-center gap-3 w-full py-4 bg-brand-yellow text-brand-navy font-bold text-sm uppercase tracking-wider hover:bg-white transition-all rounded-md shadow-xl shadow-brand-yellow/20"
            >
              {t.cta}
              <ArrowRight
                className={cn(
                  'transition-transform group-hover:translate-x-1',
                  lang === 'he' ? 'rotate-180' : ''
                )}
                size={16}
                strokeWidth={2.5}
              />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
