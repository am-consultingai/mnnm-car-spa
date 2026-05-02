import { Language, translations } from '../translations';
import { Sparkles, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang].footer;

  return (
    <footer className="pt-32 pb-16 bg-brand-navy border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-2 mb-10">
              <span className="text-3xl font-display font-black text-white tracking-tighter uppercase leading-none">MNNM</span>
              <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-medium">Car Spa Lab</span>
            </div>
            <p className="text-sm text-slate-500 font-serif italic leading-relaxed mb-10 max-w-[200px]">
              {t.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold text-white/20 mb-10 uppercase tracking-[0.4em]">
              {t.contact}
            </h4>
            <div className="flex flex-col gap-6">
              <a href="#" className="flex items-center gap-4 text-slate-500 hover:text-brand-blue transition-colors text-[11px] font-bold uppercase tracking-widest">
                <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center">
                  <Phone size={12} />
                </div>
                054-000-0000
              </a>
              <a href="#" className="flex items-center gap-4 text-slate-500 hover:text-brand-blue transition-colors text-[11px] font-bold uppercase tracking-widest">
                <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center">
                  <Mail size={12} />
                </div>
                hello@mnnm.co.il
              </a>
              <div className="flex items-center gap-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center">
                  <MapPin size={12} />
                </div>
                ראשון לציון, ישראל
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] font-bold text-white/20 mb-10 uppercase tracking-[0.4em]">
              {t.social}
            </h4>
            <div className="flex gap-4">
              {[Instagram, Facebook].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-12 h-12 border border-white/10 flex items-center justify-center text-slate-500 hover:border-brand-blue hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
              <a
                href="#"
                className="w-12 h-12 border border-white/10 flex items-center justify-center text-slate-500 hover:border-brand-blue hover:text-white transition-all transform hover:-translate-y-1 font-black text-lg italic lowercase"
              >
                d
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-bold text-white/20 mb-10 uppercase tracking-[0.4em]">
              Standards
            </h4>
            <div className="flex flex-col gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.terms}</a>
              <a href="#" className="hover:text-white transition-colors">{t.accessibility}</a>
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
            {t.copyright}
          </p>
          <div className="flex items-center gap-12">
            <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest italic">
              {lang === 'he' ? 'נוצר על ידי מעבדת מננם' : 'CRAFTED BY MNNM LAB'}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-brand-blue animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.5em]">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
