import { motion } from 'motion/react';
import { Language, translations } from '../translations';

interface TeamProps {
  lang: Language;
}

export default function Team({ lang }: TeamProps) {
  const t = translations[lang].team;

  return (
    <section id="team" className="section-padding bg-brand-navy border-b border-white/5">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-4xl mb-16 md:mb-20">
          <span className="eyebrow text-brand-yellow text-xs font-bold uppercase mb-6 inline-block">
            {lang === 'he' ? 'האחים' : 'The brothers'}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tight leading-[0.95] mb-8">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Group portrait */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative rounded-lg overflow-hidden bg-brand-navy-deep border border-white/10 group"
          >
            <img
              src="/brothers.jpg"
              alt={lang === 'he' ? 'מתן, נטע ונועם — האחים שמאחורי מננם' : 'Matan, Neta and Noam — the brothers behind MNNM'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center gap-2 bg-brand-yellow text-brand-navy text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm">
                {lang === 'he' ? 'הצוות המלא' : 'The full crew'}
              </span>
            </div>
          </motion.div>

          {/* Bio cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
            {t.members.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
                viewport={{ once: true }}
                className="group bg-white/[0.03] border border-white/10 rounded-lg p-7 md:p-8 hover:border-brand-yellow/30 hover:bg-white/[0.06] transition-all flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6"
              >
                <div className="flex-shrink-0 flex items-baseline gap-3">
                  <span className="text-brand-yellow/40 text-xs font-bold tracking-widest">
                    0{idx + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight leading-none group-hover:text-brand-yellow transition-colors">
                    {member.name}
                  </h3>
                </div>
                <p className="text-white/75 leading-relaxed text-base flex-1">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
