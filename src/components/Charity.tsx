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
    <section id="charity" className="py-28 md:py-36 bg-brand-navy-deep relative overflow-hidden border-b border-white/5">
      {/* soft warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-yellow/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 md:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-14 h-14 bg-brand-yellow/15 rounded-full flex items-center justify-center mx-auto mb-10">
            <Heart className="text-brand-yellow fill-brand-yellow" size={22} />
          </div>

          {/* Sincere title — sentence case, not screaming uppercase */}
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-10">
            {t.title}
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-white/70 leading-[1.8] text-start md:text-center">
            <p>{t.body1}</p>
            <p className="text-brand-yellow font-semibold">{t.body2}</p>
            <p>{t.body3}</p>
          </div>

          <div className="mt-12">
            <a
              href="#"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-white/80 hover:text-brand-yellow transition-all border-b border-white/20 hover:border-brand-yellow pb-1"
            >
              {t.cta}
              <ArrowRight
                className={cn(
                  'transition-transform group-hover:translate-x-1',
                  lang === 'he' ? 'rotate-180' : ''
                )}
                strokeWidth={2.2}
                size={15}
              />
            </a>
          </div>

          <p className="mt-20 text-sm md:text-base text-white/50 italic font-serif tracking-wide">
            {t.tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
