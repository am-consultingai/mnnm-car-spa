import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { Check, Sparkles } from 'lucide-react';

interface PricingProps {
  lang: Language;
}

export default function Pricing({ lang }: PricingProps) {
  const t = translations[lang].pricing;

  return (
    <section id="pricing" className="section-padding bg-brand-navy relative overflow-hidden border-b border-white/5">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-10 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-20">
          {/* Typographic side */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-brand-blue text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
              Transparent Pricing
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-8 leading-tight">
              {t.eyebrow}
            </h2>
            <p className="text-white/40 font-serif italic text-lg leading-relaxed mb-10 max-w-sm">
              {t.notes}
            </p>
          </div>

          {/* Card side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full bg-white/5 border border-white/10 p-12 md:p-16 relative overflow-hidden"
          >
            <div className="mb-8 border-b border-white/10 pb-8">
              <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-2">{t.sub}</span>
              <div className="text-8xl md:text-9xl font-display font-black text-brand-blue tracking-tighter leading-none mb-4">
                {t.price}
              </div>
            </div>

            <div className="space-y-6 mb-12">
              {t.includes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="#booking"
              className="group block w-full py-5 bg-brand-blue text-brand-navy font-bold text-xs uppercase tracking-widest text-center hover:bg-white transition-all shadow-2xl shadow-brand-blue/10"
            >
              {t.cta}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
