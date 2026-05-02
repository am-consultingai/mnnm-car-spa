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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="group flex flex-col bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden hover:border-brand-yellow/30 transition-all"
            >
              <div className="aspect-[4/5] overflow-hidden bg-brand-navy-deep relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* warm gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight leading-none">
                    {member.name}
                  </h3>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-white/75 leading-relaxed text-base">
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
