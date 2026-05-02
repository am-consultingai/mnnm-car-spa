import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { CheckCircle2, Phone, User, Car, Calendar, Clock, MessageSquare, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { cn } from '../lib/utils';

interface BookingProps {
  lang: Language;
}

export default function Booking({ lang }: BookingProps) {
  const t = translations[lang].booking;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const inputClass =
    'w-full bg-white/[0.04] border border-white/10 rounded-md px-4 py-3 text-white placeholder-white/30 focus:border-brand-yellow focus:bg-white/[0.07] outline-none transition-all text-base';

  return (
    <section id="booking" className="section-padding bg-brand-navy relative border-b border-white/5">
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-6xl mx-auto bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* Form Side */}
            <div className="lg:col-span-3 p-8 md:p-12 lg:p-16">
              <span className="eyebrow text-brand-yellow text-xs font-bold uppercase mb-4 inline-block">
                {lang === 'he' ? 'הזמנת תור' : 'Reservation'}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight mb-8 leading-[0.95]">
                {t.title}
              </h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                        <User size={13} className="text-brand-yellow" /> {t.name}
                      </label>
                      <input required type="text" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                        <Phone size={13} className="text-brand-yellow" /> {t.phone}
                      </label>
                      <input required type="tel" className={inputClass} dir="ltr" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                      <Car size={13} className="text-brand-yellow" /> {t.car}
                    </label>
                    <input type="text" className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                        <Calendar size={13} className="text-brand-yellow" /> {t.date}
                      </label>
                      <input
                        required
                        type="date"
                        className={cn(inputClass, '[color-scheme:dark]')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                        <Clock size={13} className="text-brand-yellow" /> {t.time}
                      </label>
                      <input
                        required
                        type="time"
                        className={cn(inputClass, '[color-scheme:dark]')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare size={13} className="text-brand-yellow" /> {t.notes}
                    </label>
                    <textarea
                      rows={3}
                      className={cn(inputClass, 'resize-none')}
                      placeholder={lang === 'he' ? 'משהו שכדאי שנדע?' : 'Anything we should know?'}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="group w-full py-4 md:py-5 bg-brand-yellow text-brand-navy font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-2xl shadow-brand-yellow/20 rounded-md flex items-center justify-center gap-3"
                    >
                      {t.submit}
                      <Send className={lang === 'he' ? 'rotate-180' : ''} size={16} strokeWidth={2.5} />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 pt-6 border-t border-white/10">
                    {[t.trust1, t.trust2, t.trust3].map((text, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/55">
                        <CheckCircle2 className="text-brand-yellow" size={13} strokeWidth={2.5} />
                        {text}
                      </div>
                    ))}
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-20 h-20 bg-brand-yellow/15 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 className="text-brand-yellow" size={40} strokeWidth={2} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight">
                    {t.success.split('.')[0]}
                  </h3>
                  <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-md">
                    {t.success.split('.').slice(1).join('.')}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-10 text-white/80 border-b border-white/30 pb-1 font-semibold text-sm uppercase tracking-wider hover:text-brand-yellow hover:border-brand-yellow transition-all"
                  >
                    {lang === 'he' ? 'הזמן תור נוסף' : 'Book another session'}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Visual Side */}
            <div className="hidden lg:block lg:col-span-2 relative overflow-hidden bg-brand-navy-deep">
              <img
                src={`${import.meta.env.BASE_URL}clean.png`}
                alt={lang === 'he' ? 'רכב נקי לאחר הטיפול' : 'A car after the wash'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl md:text-7xl font-display font-black text-brand-yellow tracking-tighter leading-none">
                    15
                  </span>
                  <span className="text-2xl md:text-3xl font-display font-bold text-white/90">₪</span>
                </div>
                <p className="text-white/80 text-base leading-snug max-w-[260px]">
                  {lang === 'he'
                    ? 'רחיצה ידנית מלאה. כולל כל מה שכתוב למעלה.'
                    : 'Full hand wash. Everything in the list above.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
