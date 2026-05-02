import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { CheckCircle2, Phone, User, Car, Calendar, Clock, MessageSquare, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';

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

  return (
    <section id="booking" className="section-padding bg-brand-navy relative border-b border-white/5">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 grid-bg opacity-5 pointer-events-none" />

      <div className="container mx-auto px-10 relative z-10">
        <div className="max-w-6xl mx-auto border border-white/10 bg-brand-navy/80 backdrop-blur-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Form Side */}
            <div className="flex-1 p-10 md:p-16 border-r border-white/10">
              <span className="text-brand-blue text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
                Reservation
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-12">
                {t.title}
              </h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-3">
                        <User size={12} className="text-brand-blue" /> {t.name}
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-brand-blue outline-none transition-all font-serif italic text-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-3">
                        <Phone size={12} className="text-brand-blue" /> {t.phone}
                      </label>
                      <input
                        required
                        type="tel"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-brand-blue outline-none transition-all font-serif italic text-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-3">
                      <Car size={12} className="text-brand-blue" /> {t.car}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-brand-blue outline-none transition-all font-serif italic text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-3">
                        <Calendar size={12} className="text-brand-blue" /> {t.date}
                      </label>
                      <input
                        required
                        type="date"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-brand-blue outline-none transition-all font-serif italic text-lg [color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-3">
                        <Clock size={12} className="text-brand-blue" /> {t.time}
                      </label>
                      <input
                        required
                        type="time"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:border-brand-blue outline-none transition-all font-serif italic text-lg [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div className="pt-10">
                    <button
                      type="submit"
                      className="group w-full py-6 bg-brand-blue text-brand-navy font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl shadow-brand-blue/10 flex items-center justify-center gap-4"
                    >
                      {t.submit}
                      <Send className={lang === 'he' ? 'rotate-180' : ''} size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-8 pt-8 border-t border-white/5">
                    {[t.trust1, t.trust2, t.trust3].map((text, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        <div className="w-1 h-1 bg-brand-blue rounded-full" />
                        {text}
                      </div>
                    ))}
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mb-10">
                    <CheckCircle2 className="text-brand-blue" size={40} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-tight">
                    {t.success.split('.')[0]}
                  </h3>
                  <p className="text-xl text-slate-400 leading-relaxed max-w-md font-serif italic">
                    {t.success.split('.').slice(1).join('.')}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-12 text-white border-b border-white/20 font-bold text-xs uppercase tracking-widest hover:border-brand-blue hover:text-brand-blue transition-all"
                  >
                    {lang === 'he' ? 'הזמן תור נוסף' : 'Book another session'}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Visual Side */}
            <div className="hidden lg:block lg:w-1/3 relative overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80"
                alt="Brothers at work"
                className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-brand-navy/40 mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-12 text-center border border-white/10 backdrop-blur-md bg-brand-navy/20">
                   <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] mb-4">Starting At</p>
                   <p className="text-7xl font-display font-black text-brand-blue italic tracking-tighter">15 ₪</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
