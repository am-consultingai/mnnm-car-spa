import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { cn } from '../lib/utils';

interface TeamProps {
  lang: Language;
}

export default function Team({ lang }: TeamProps) {
  const t = translations[lang].team;

  return (
    <section id="team" className="section-padding bg-brand-navy border-b border-white/5">
      <div className="container mx-auto px-10">
        <div className="max-w-4xl mb-24">
          <span className="text-brand-blue text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
            The Founders
          </span>
          <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-none mb-10">
            {t.title}
          </h2>
          <p className="text-xl md:text-2xl text-white/40 leading-relaxed max-w-2xl font-serif italic">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-white/10 border">
          {t.members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={cn(
                "flex flex-col group transition-colors hover:bg-white/5",
                idx < t.members.length - 1 ? "lg:border-r border-b lg:border-b-0 border-white/10" : ""
              )}
            >
              <div className="aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border-b border-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-10">
                <span className="text-brand-blue text-[10px] font-bold tracking-widest mb-4 block">
                  PARTNER {(idx + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="text-3xl font-display font-bold text-white mb-4 uppercase tracking-tight">
                  {member.name}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-serif italic">
                  {member.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
