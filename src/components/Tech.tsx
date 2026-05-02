import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { Waves, Layers, Beaker, Eraser } from 'lucide-react';

interface TechProps {
  lang: Language;
}

export default function Tech({ lang }: TechProps) {
  const t = translations[lang].tech;

  return (
    <section id="tech" className="section-padding bg-brand-navy text-white relative border-b border-white/5">
      <div className="container mx-auto px-10">
        <div className="max-w-5xl mb-24">
          <span className="text-brand-blue text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
            The Lab
          </span>
          <h2 className="text-5xl md:text-[6rem] lg:text-[8rem] font-display font-black mb-12 uppercase tracking-tighter leading-none">
            {t.title}
          </h2>
          <p className="text-xl text-white/50 font-serif italic max-w-2xl leading-relaxed">
            {t.subtitle} {t.bottom}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
          {t.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group border-b border-white/10 pb-12 flex justify-between items-start gap-10 hover:border-brand-blue/40 transition-all cursor-default"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] text-brand-blue font-bold tracking-widest">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-light uppercase tracking-tight group-hover:text-brand-blue transition-colors italic leading-none">
                    {item.name}
                  </h3>
                </div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                  {item.spec}
                </p>
                <p className="text-slate-400 leading-relaxed mb-6 font-serif opacity-80 text-lg">
                  {item.desc}
                </p>
                <div className="text-[10px] font-bold text-white/20 italic tracking-widest uppercase">
                  {item.real}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-[1em] text-white/10">Refraction Engineering</p>
          <a href="#booking" className="text-[11px] font-bold tracking-widest uppercase text-white/50 hover:text-brand-blue transition-colors border-b border-white/10 hover:border-brand-blue">
            {lang === 'he' ? 'צפה בכל התהליכים' : 'VIEW ALL PROCESSES'} →
          </a>
        </div>
      </div>
    </section>
  );
}
