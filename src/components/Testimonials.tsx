import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { Star, Quote } from 'lucide-react';
import { cn } from '../lib/utils';

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const t = translations[lang].testimonials;

  return (
    <section id="love" className="section-padding bg-brand-navy relative overflow-hidden border-b border-white/5">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 grid-bg opacity-5 pointer-events-none" />

      <div className="container mx-auto px-10 relative z-10">
        <div className="max-w-5xl mb-24 text-center md:text-left">
          <span className="text-brand-blue text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
            The Reviews
          </span>
          <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-none mb-12">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10 bg-brand-navy/50 backdrop-blur-sm">
          {t.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "p-12 transition-colors hover:bg-white/5 min-h-[400px] flex flex-col justify-between",
                idx < t.items.length - 1 ? "lg:border-r border-b lg:border-b-0 border-white/10" : ""
              )}
            >
              <Quote className="text-brand-blue/20 w-16 h-16 mb-10" />
              <p className="text-2xl md:text-3xl text-white/90 font-serif italic mb-12 leading-tight">
                "{item.text}"
              </p>
              <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-white font-bold uppercase tracking-widest text-xs mb-1">
                    {item.author.split(',')[0]}
                  </span>
                  <span className="text-brand-blue text-[10px] font-bold uppercase tracking-widest opacity-60">
                    {item.author.split(',')[1] || 'Verified Customer'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
