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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-brand-navy border-b border-white/5">
      <div className="container mx-auto px-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="w-full md:w-1/3">
            <span className="text-brand-blue text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
              Inquiry
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
              {t.title}
            </h2>
            <p className="text-white/40 font-serif italic text-lg leading-relaxed">
              Establishing clarity through precise communication.
            </p>
          </div>

          <div className="w-full md:w-2/3 border-t border-white/10">
            {t.items.map((item, idx) => (
              <div
                key={idx}
                className="border-b border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-10 text-right md:text-inherit group"
                >
                  <span className={cn(
                    "text-xl md:text-2xl font-display font-bold uppercase tracking-tight transition-colors",
                    openIndex === idx ? "text-brand-blue" : "text-white/80 group-hover:text-white"
                  )}>
                    {item.q}
                  </span>
                  <div className="flex-shrink-0 ml-4">
                    {openIndex === idx ? (
                      <Minus className="text-brand-blue" size={20} strokeWidth={3} />
                    ) : (
                      <Plus className="text-white/20" size={20} strokeWidth={3} />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 text-slate-400 text-lg leading-relaxed font-serif italic max-w-xl">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
