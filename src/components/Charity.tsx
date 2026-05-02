import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { Heart, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface CharityProps {
  lang: Language;
}

export default function Charity({ lang }: CharityProps) {
  const t = translations[lang].charity;

  return (
    <section id="charity" className="section-padding bg-brand-navy relative overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-12"
          >
            <Heart className="text-brand-blue fill-brand-blue" size={24} />
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter mb-12 leading-none">
            {t.title}
          </h2>

          <div className="space-y-10 text-xl md:text-2xl text-white/40 leading-relaxed font-serif italic max-w-2xl mx-auto">
            <p>{t.body1}</p>
            <p className="text-brand-blue font-bold not-italic font-display uppercase tracking-widest text-lg md:text-xl">{t.body2}</p>
            <p className="opacity-60">{t.body3}</p>
          </div>

          <div className="mt-16">
            <a
              href="#"
              className="group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 hover:text-brand-blue transition-all"
            >
              {t.cta}
              <ArrowRight className={cn("transition-transform group-hover:translate-x-1", lang === 'he' ? 'rotate-180' : '')} strokeWidth={3} size={14} />
            </a>
          </div>

          <div className="mt-32 pt-16 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-[1.5em] text-white/10 font-black">
              {t.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

