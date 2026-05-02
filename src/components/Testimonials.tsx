import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const t = translations[lang].testimonials;

  return (
    <section id="love" className="section-padding bg-brand-navy relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 md:px-10 relative z-10">
        <div className="max-w-4xl mb-16 md:mb-20">
          {/* Five-star anchor */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className="fill-brand-yellow text-brand-yellow"
                strokeWidth={0}
              />
            ))}
            <span className="ml-3 text-white/60 text-sm font-medium">
              {lang === 'he' ? '5.0 · לקוחות אמיתיים' : '5.0 · real customers'}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tight leading-[0.95]">
            {t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item, idx) => (
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/[0.04] border border-white/10 rounded-lg p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[240px] sm:min-h-[320px] hover:border-brand-yellow/30 transition-all"
            >
              <div>
                <Quote className="text-brand-yellow/40 w-10 h-10 mb-6" strokeWidth={1.5} />
                <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                  {item.text}
                </blockquote>
              </div>
              <figcaption className="flex items-center gap-3 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-brand-yellow/15 flex items-center justify-center text-brand-yellow font-bold text-sm">
                  {item.author.split(',')[0].trim()[0]}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">
                    {item.author.split(',')[0]}
                  </span>
                  <span className="text-white/50 text-xs">
                    {item.author.split(',')[1] || (lang === 'he' ? 'לקוח/ה מאומת/ת' : 'verified customer')}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
