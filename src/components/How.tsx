import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { cn } from '../lib/utils';

interface HowProps {
  lang: Language;
}

export default function How({ lang }: HowProps) {
  const t = translations[lang].how;

  return (
    <section id="how" className="section-padding bg-brand-navy relative overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
          {t.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "p-12 transition-colors hover:bg-white/5",
                idx < t.steps.length - 1 ? "lg:border-r border-b lg:border-b-0 border-white/10" : ""
              )}
            >
              <span className="text-brand-blue text-[10px] font-bold tracking-widest mb-12 block">
                PHASE {(idx + 1).toString().padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-tight italic">
                {step.title}
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed font-serif">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
