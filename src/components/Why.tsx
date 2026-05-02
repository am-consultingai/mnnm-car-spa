import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { ShieldCheck, Eye, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface WhyProps {
  lang: Language;
}

export default function Why({ lang }: WhyProps) {
  const t = translations[lang].why;

  const cards = [
    {
      ...t.card1,
      number: '01',
    },
    {
      ...t.card2,
      number: '02',
    },
    {
      ...t.card3,
      number: '03',
    },
  ];

  return (
    <section id="why" className="section-padding bg-brand-navy border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-24 border-b border-white/10 pb-12">
          <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
            {t.title}
          </h2>
          <span className="text-brand-blue text-xs font-bold tracking-[0.4em] uppercase">
            Human Precision
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-x border-white/10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={cn(
                'group p-12 flex flex-col border-white/10 h-full transition-colors hover:bg-white/5',
                index < cards.length - 1 ? 'md:border-r border-b md:border-b-0' : ''
              )}
            >
              <span className="text-brand-blue text-[10px] font-bold tracking-widest mb-10 flex items-center gap-4">
                <span className="w-8 h-px bg-brand-blue/30" />
                {card.number}
              </span>
              <h3 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-tight group-hover:text-brand-blue transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-400 leading-relaxed font-serif italic text-lg">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
