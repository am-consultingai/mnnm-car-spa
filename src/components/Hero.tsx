import { motion } from 'motion/react';
import { Language, translations } from '../translations';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang].hero;

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-brand-navy">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 grid-bg opacity-10 pointer-events-none" />

      {/* Main Content Layout */}
      <div className="container mx-auto px-10 h-full flex flex-col md:flex-row relative z-10">
        {/* Left Column: Typography & Statement */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-end pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-blue text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
              Est. 2024 — Israel
            </span>
            <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] font-display font-black tracking-tighter uppercase mb-8">
              {lang === 'he' ? (
                <>מננם — <br/><span className="text-brand-blue">ספא רכב</span></>
              ) : (
                <>MNNM — <br/><span className="text-brand-blue">Car Spa</span></>
              )}
            </h1>
            <p className="max-w-md text-base md:text-lg leading-relaxed text-slate-400 italic font-serif mb-12">
              {t.sub}
            </p>

            <div className="flex items-center gap-10 border-t border-white/10 pt-10">
              <a
                href="#booking"
                className="group px-10 py-4 bg-brand-blue text-brand-navy font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-brand-blue/20"
              >
                {t.cta}
              </a>
              <div className="hidden sm:block">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Price</p>
                <p className="text-xl font-bold font-display">15 ₪</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Impact</p>
                <p className="text-xl font-bold font-display">10% Charity</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Abstract Visuals */}
        <div className="hidden md:block md:w-1/2 h-full relative">
          <div className="absolute top-32 right-0 w-[110%] h-[500px] bg-gradient-to-br from-brand-blue/20 to-slate-900/40 border-l border-y border-white/10 overflow-hidden transform rotate-2 origin-top-right">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80')] bg-cover opacity-40 mix-blend-overlay" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/30 rounded-full blur-[120px]" />
          </div>

          <div className="absolute bottom-24 right-0">
            <p className="text-[10px] uppercase tracking-[1em] text-white/20 whitespace-nowrap rotate-90 origin-right translate-x-12">
              Premium Automotive Restoration • Est. MMXXIV
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
