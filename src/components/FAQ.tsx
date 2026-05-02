import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../translations';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

interface FAQProps {
  lang: Language;
}

export default function FAQ({ lang }: FAQProps) {
  const t = translations[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-brand-navy-deep border-b border-white/5">
      <div className="container mx-auto px-6 sm:px-8 md:px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
          <div className="md:col-span-1">
            <span className="eyebrow text-brand-yellow text-xs font-bold uppercase mb-6 inline-block">
              {lang === 'he' ? 'שאלות' : 'Questions'}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight leading-[0.95] mb-6">
              {t.title}
            </h2>
            <p className="text-white/55 text-base leading-relaxed">
              {lang === 'he' ? 'משהו לא ברור? כתבו לנו.' : 'Anything unclear? Just message us.'}
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="border-t border-white/10">
              {t.items.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="border-b border-white/10">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between py-6 md:py-7 group gap-4 text-start"
                    >
                      <span
                        className={cn(
                          'text-lg md:text-xl font-display font-bold tracking-tight transition-colors leading-snug',
                          isOpen ? 'text-brand-yellow' : 'text-white/85 group-hover:text-white'
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          'flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all',
                          isOpen
                            ? 'bg-brand-yellow border-brand-yellow text-brand-navy'
                            : 'border-white/20 text-white/60 group-hover:border-white/50'
                        )}
                      >
                        {isOpen ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 md:pb-7 text-white/70 leading-relaxed text-base max-w-xl">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
