import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { CalendarCheck, MapPin, Sparkles, Smile } from 'lucide-react';

interface HowProps {
  lang: Language;
}

const ICONS = [CalendarCheck, MapPin, Sparkles, Smile];

export default function How({ lang }: HowProps) {
  const t = translations[lang].how;

  return (
    <section id="how" className="section-padding bg-brand-navy-deep relative overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-4xl mb-16 md:mb-20">
          <span className="eyebrow text-brand-yellow text-xs font-bold uppercase mb-6 inline-block">
            {lang === 'he' ? 'איך זה עובד' : 'How it works'}
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight leading-[0.95]">
            {lang === 'he' ? '4 צעדים. רכב מבריק.' : '4 steps. Shiny car.'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.steps.map((step, idx) => {
            const Icon = ICONS[idx] ?? CalendarCheck;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white/[0.03] border border-white/10 rounded-lg p-8 hover:border-brand-yellow/30 hover:bg-white/[0.06] transition-all"
              >
                <span className="absolute top-6 right-6 text-7xl font-display font-black text-brand-yellow/15 leading-none select-none">
                  {idx + 1}
                </span>
                <div className="relative">
                  <div className="w-12 h-12 rounded-md bg-brand-yellow/10 flex items-center justify-center text-brand-yellow mb-6">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/65 leading-relaxed text-sm md:text-base">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
