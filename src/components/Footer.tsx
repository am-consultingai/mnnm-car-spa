import { Language, translations } from '../translations';
import { Instagram, Facebook, MapPin, Music2 } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang].footer;

  return (
    <footer className="pt-24 pb-12 bg-brand-navy border-t border-white/5">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-display font-black text-white tracking-tight uppercase leading-none">
                MNNM
              </span>
              <span className="text-brand-yellow text-2xl font-black leading-none">·</span>
              <span className="text-xs tracking-[0.2em] text-white/50 uppercase font-medium">
                {lang === 'he' ? 'ספא רכב' : 'Car Spa'}
              </span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-[240px]">
              {t.tagline}
            </p>
          </div>

          {/* Find us */}
          <div>
            <h4 className="text-xs font-bold text-white/50 mb-6 uppercase tracking-widest">
              {lang === 'he' ? 'מצאו אותנו' : 'Find us'}
            </h4>
            <div className="flex items-start gap-3 text-white/75 text-sm leading-relaxed">
              <MapPin size={14} className="text-brand-yellow flex-shrink-0 mt-0.5" />
              <span>
                {lang === 'he' ? (
                  <>הדולב 4<br />חרב לאת</>
                ) : (
                  <>HaDolev 4<br />Harav L'at, Israel</>
                )}
              </span>
            </div>
            <p className="mt-4 text-xs text-white/45 leading-relaxed max-w-[220px]">
              {lang === 'he'
                ? 'הרכב מגיע אלינו. אנחנו לא מגיעים עד הבית.'
                : "Drive in to us — we don't do home pickups."}
            </p>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-bold text-white/50 mb-6 uppercase tracking-widest">
              {t.social}
            </h4>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Music2, label: 'TikTok', href: '#' },
                { Icon: Facebook, label: 'Facebook', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 border border-white/15 rounded-md flex items-center justify-center text-white/65 hover:border-brand-yellow hover:text-brand-yellow hover:bg-brand-yellow/5 transition-all"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold text-white/50 mb-6 uppercase tracking-widest">
              {lang === 'he' ? 'מידע' : 'Info'}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/75">
              <a href="#" className="hover:text-brand-yellow transition-colors">{t.privacy}</a>
              <a href="#" className="hover:text-brand-yellow transition-colors">{t.terms}</a>
              <a href="#" className="hover:text-brand-yellow transition-colors">{t.accessibility}</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            {t.copyright}
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
              {lang === 'he' ? 'פתוחים להזמנות' : 'Open for bookings'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
