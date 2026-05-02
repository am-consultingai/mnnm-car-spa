import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { ShieldCheck, Eye, Tag } from 'lucide-react';
import { cn } from '../lib/utils';

interface WhyProps {
  lang: Language;
}

export default function Why({ lang }: WhyProps) {
  const t = translations[lang].why;

  const cards = [
    { ...t.card1, number: '01', Icon: ShieldCheck },
    { ...t.card2, number: '02', Icon: Eye },
    { ...t.card3, number: '03', Icon: Tag },
  ];

  return (
    <section id="why" className="section-padding bg-brand-navy border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tight leading-[0.95]">
            {t.title}
          </h2>
          <span className="eyebrow text-brand-yellow text-xs font-bold uppercase mb-2">
            {lang === 'he' ? 'בידיים. כמו שצריך.' : 'By hand. Properly.'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.Icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className={cn(
                  'group p-10 flex flex-col h-full',
                  'bg-white/[0.03] border border-white/10 rounded-lg',
                  'hover:bg-white/[0.06] hover:border-brand-yellow/30 transition-all'
                )}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-md bg-brand-yellow/10 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-navy transition-all">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <span className="text-brand-yellow/60 text-xs font-bold tracking-widest">
                    {card.number}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 tracking-tight leading-tight">
                  {card.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-base">
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
