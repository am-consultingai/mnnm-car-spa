import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { Droplets, Layers, FlaskConical, Wind } from 'lucide-react';

interface TechProps {
  lang: Language;
}

const ICONS = [Droplets, Layers, FlaskConical, Wind];

export default function Tech({ lang }: TechProps) {
  const t = translations[lang].tech;

  return (
    <section id="tech" className="section-padding bg-brand-navy-deep text-white relative border-y border-white/5 overflow-hidden">
      {/* subtle radial accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-yellow/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 md:px-10 relative z-10">
        <div className="max-w-4xl mb-16 md:mb-24">
          <span className="eyebrow text-brand-yellow text-xs font-bold uppercase mb-6 inline-block">
            {lang === 'he' ? 'מפרט הציוד' : 'Equipment spec sheet'}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black mb-8 uppercase tracking-tight leading-[0.95]">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {t.items.map((item, index) => {
            const Icon = ICONS[index] ?? Droplets;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/[0.03] border border-white/10 rounded-lg p-6 sm:p-8 md:p-10 hover:border-brand-yellow/30 hover:bg-white/[0.05] transition-all"
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 rounded-md bg-brand-yellow/10 flex items-center justify-center text-brand-yellow flex-shrink-0">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wider">
                      {item.spec}
                    </p>
                  </div>
                  <span className="text-brand-yellow/40 text-xs font-bold tracking-widest">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                <p className="text-white/70 leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* The punchline — make it land */}
                <div className="border-t border-dashed border-brand-yellow/30 pt-5">
                  <p className="text-brand-yellow font-semibold text-base md:text-lg leading-snug">
                    {item.real}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing line — the heart of the brand voice */}
        <div className="mt-16 md:mt-20 max-w-3xl">
          <p className="text-xl md:text-2xl text-white/85 leading-relaxed font-serif italic">
            {t.bottom}
          </p>
        </div>
      </div>
    </section>
  );
}
