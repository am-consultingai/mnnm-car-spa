import { motion } from 'motion/react';
import { Language, translations } from '../translations';

interface TeamProps {
  lang: Language;
}

export default function Team({ lang }: TeamProps) {
  const t = translations[lang].team;

  // Reorder to match the photo: left=Noam, middle=Matan, right=Neta.
  const visualOrder = [t.members[1], t.members[0], t.members[2]];

  return (
    <section id="team" className="section-padding bg-brand-navy border-b border-white/5">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-4xl mb-12 md:mb-16">
          <span className="eyebrow text-brand-yellow text-xs font-bold uppercase mb-6 inline-block">
            {lang === 'he' ? 'הצוות' : 'The crew'}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tight leading-[0.95] mb-8">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Group photo with bio overlay */}
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto rounded-xl overflow-hidden bg-brand-navy-deep border border-white/10"
        >
          <img
            src={`${import.meta.env.BASE_URL}brothers.jpg`}
            alt={lang === 'he' ? 'מתן, נעם ונטע — הצוות שמאחורי מננם' : 'Matan, Noam and Neta — the team behind MNNM'}
            className="w-full h-auto block"
          />

          {/* Soft gradient top — fades the photo into the bio panel */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-brand-navy/70 via-brand-navy/40 to-transparent" />

          {/* Bio overlay strip — pinned to the top */}
          <figcaption className="absolute inset-x-0 top-0 px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
              {visualOrder.map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: -12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.12 }}
                  viewport={{ once: true }}
                  className="bg-brand-navy/35 backdrop-blur-sm border border-white/15 rounded-lg p-5 md:p-6"
                >
                  <h3 className="text-3xl md:text-4xl font-display font-black text-brand-yellow tracking-tight leading-none mb-3">
                    {member.name}
                  </h3>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed">
                    {member.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
