import { useEffect, useMemo, useRef, useState, FormEvent, ReactNode } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, X, User, Phone, Calendar, Clock, Mail, Send, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, translations } from '../translations';
import { cn } from '../lib/utils';
import {
  BookingConfig,
  groupSlotsByDay,
  isBookingConfigured,
  joinSlot,
  submitBooking,
  SubmitResult,
} from '../lib/booking';

interface BookingDialogProps {
  lang: Language;
  open: boolean;
  onClose: () => void;
  config: BookingConfig | null;
  configError: boolean;
  configLoading: boolean;
  onConfigRefresh: () => Promise<void>;
}

type Step = 'form' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full bg-white/[0.04] border border-white/10 rounded-md px-4 py-1.5 text-white placeholder-white/30 focus:border-brand-yellow focus:bg-white/[0.07] outline-none transition-all text-base disabled:opacity-50';

export default function BookingDialog({
  lang,
  open,
  onClose,
  config,
  configError,
  configLoading,
  onConfigRefresh,
}: BookingDialogProps) {
  const t = translations[lang].booking;
  const ref = useRef<HTMLDialogElement>(null);

  const [step, setStep] = useState<Step>('form');
  const [errorCode, setErrorCode] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');

  const groupedDays = useMemo(() => (config ? groupSlotsByDay(config.slots) : []), [config]);
  const availableDaysSet = useMemo(() => new Set(groupedDays.map((g) => g.day)), [groupedDays]);
  const timesForDay = useMemo(() => groupedDays.find((g) => g.day === day)?.times ?? [], [groupedDays, day]);

  // Open / close the native dialog when the prop flips.
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
    } else if (!open && dlg.open) {
      dlg.close();
    }
  }, [open]);

  // Native dialog Escape / backdrop close → bubble up.
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const handler = () => onClose();
    dlg.addEventListener('close', handler);
    return () => dlg.removeEventListener('close', handler);
  }, [onClose]);

  // Reset form state every time the dialog opens, so a returning user sees a fresh form.
  useEffect(() => {
    if (open) {
      setStep('form');
      setErrorCode('');
      setName('');
      setPhone('');
      setEmail('');
      setDay('');
      setTime('');
    }
  }, [open]);

  // If the day list changes (config refreshed) and current selection no longer exists, drop it.
  useEffect(() => {
    if (day && !groupedDays.some((g) => g.day === day)) {
      setDay('');
      setTime('');
    }
  }, [groupedDays, day]);

  useEffect(() => {
    if (time && !timesForDay.includes(time)) setTime('');
  }, [timesForDay, time]);

  const price = config?.price ?? null;
  const currency = config?.currency ?? null;
  const priceLabel = price !== null && currency ? `${price} ${currency}` : '';
  const notConfigured = !isBookingConfigured();
  const hasSlots = groupedDays.length > 0;

  const errorMessage = (() => {
    if (notConfigured) return t.errorUnavailable;
    if (configError) return t.errorUnavailable;
    if (errorCode === 'slot_taken') return t.errorSlotTaken;
    if (errorCode === 'missing_fields') return t.errorMissing;
    if (errorCode) return t.errorGeneric;
    return '';
  })();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !day || !time) {
      setErrorCode('missing_fields');
      return;
    }
    setStep('submitting');
    setErrorCode('');
    const result: SubmitResult = await submitBooking({
      name: name.trim(),
      phone: phone.trim(),
      slot: joinSlot(day, time),
      email: email.trim() || undefined,
    }).catch((err: unknown): SubmitResult => ({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    }));

    if (result.ok) {
      setStep('success');
      // Refresh config so the booked slot disappears from the list for any later open.
      onConfigRefresh().catch(() => {});
      return;
    }
    const failed = result as { ok: false; error: string };
    const errCode = failed.error || 'unknown';
    setErrorCode(errCode);
    setStep('form');
    if (errCode === 'slot_taken') {
      // Pull fresh slots so the user can pick again.
      onConfigRefresh().catch(() => {});
    }
  };

  return (
    <dialog
      ref={ref}
      dir={translations[lang].dir}
      className={cn(
        'p-0 m-auto bg-transparent backdrop:bg-brand-navy-deep/85 backdrop:backdrop-blur-sm',
        'w-full max-w-2xl rounded-xl',
        'open:animate-[fadeIn_.18s_ease-out]'
      )}
      aria-labelledby="booking-dialog-title"
    >
      <div className="bg-brand-navy border border-white/10 rounded-xl text-white shadow-2xl">
        <div className="flex items-start justify-between px-6 md:px-8 pt-3 md:pt-5 pb-1">
          <div>
            <span className="eyebrow text-brand-yellow text-[11px] font-bold uppercase mb-0.5 inline-block">
              {t.eyebrow}
            </span>
            <h2 id="booking-dialog-title" className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight leading-tight">
              {t.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/5 transition"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-6 md:px-8 pb-3 md:pb-5">
          {step === 'success' ? (
            <SuccessPanel
              lang={lang}
              emailProvided={Boolean(email.trim())}
              onAgain={() => {
                setStep('form');
                setName(''); setPhone(''); setEmail(''); setDay(''); setTime('');
              }}
              onClose={onClose}
            />
          ) : configLoading && !config ? (
            <div className="py-12 flex flex-col items-center gap-3 text-white/60">
              <Loader2 className="animate-spin" size={20} />
              <p className="text-sm">{t.loading}</p>
            </div>
          ) : (notConfigured || configError) ? (
            <p className="py-8 text-center text-white/70 text-sm">{t.errorUnavailable}</p>
          ) : !hasSlots ? (
            <p className="py-8 text-center text-white/70 text-sm">{t.noSlots}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 items-center">
                <InlineLabel icon={<User size={13} className="text-brand-yellow" />}>{t.name}</InlineLabel>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  disabled={step === 'submitting'}
                  autoComplete="name"
                />

                <InlineLabel icon={<Phone size={13} className="text-brand-yellow" />}>{t.phone}</InlineLabel>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  dir="ltr"
                  disabled={step === 'submitting'}
                  autoComplete="tel"
                />
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
                <Field label={t.day} icon={<Calendar size={13} className="text-brand-yellow" />}>
                  <CalendarPicker
                    lang={lang}
                    availableDays={availableDaysSet}
                    selectedDay={day}
                    onSelect={(d) => { setDay(d); setTime(''); }}
                    disabled={step === 'submitting'}
                  />
                </Field>

                <Field label={t.time} icon={<Clock size={13} className="text-brand-yellow" />}>
                  {!day ? (
                    <p className="text-sm text-white/45 italic leading-snug">{t.pickDayFirst}</p>
                  ) : (
                    <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
                      {timesForDay.map((tm) => {
                        const active = tm === time;
                        return (
                          <button
                            key={tm}
                            type="button"
                            disabled={step === 'submitting'}
                            onClick={() => setTime(tm)}
                            className={cn(
                              'w-full px-4 py-1 rounded-md font-mono text-sm font-bold tracking-wide transition-all border text-center',
                              active
                                ? 'bg-brand-yellow text-brand-navy border-brand-yellow shadow-md shadow-brand-yellow/20'
                                : 'bg-white/[0.04] text-white border-white/15 hover:border-brand-yellow/60 hover:bg-white/[0.07]',
                              step === 'submitting' && 'opacity-50 cursor-not-allowed'
                            )}
                            dir="ltr"
                          >
                            {tm}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-3 items-center">
                <InlineLabel icon={<Mail size={13} className="text-brand-yellow" />}>{t.email}</InlineLabel>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    dir="ltr"
                    disabled={step === 'submitting'}
                    autoComplete="email"
                  />
                  <p className="text-[11px] text-white/45 leading-snug mt-0.5">{t.emailHint}</p>
                </div>
              </div>

              {errorMessage && step !== 'submitting' && (
                <p className="text-sm text-red-300/90 bg-red-500/10 border border-red-400/20 rounded-md px-3 py-2">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={step === 'submitting'}
                className={cn(
                  'group w-full py-2.5 md:py-3 bg-brand-yellow text-brand-navy font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-2xl shadow-brand-yellow/20 rounded-md flex items-center justify-center gap-3',
                  step === 'submitting' && 'opacity-80 cursor-wait'
                )}
              >
                {step === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin" size={16} strokeWidth={2.5} />
                    {t.submitting}
                  </>
                ) : (
                  <>
                    {priceLabel ? `${t.submitPrefix}${priceLabel}` : t.submitPrefix.replace(/[—-]\s*$/, '').trim()}
                    <Send className={lang === 'he' ? 'rotate-180' : ''} size={16} strokeWidth={2.5} />
                  </>
                )}
              </button>

              <div className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-5 pt-2 border-t border-white/10">
                {[t.trust1, t.trust2, t.trust3].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-white/55">
                    <CheckCircle2 className="text-brand-yellow" size={12} strokeWidth={2.5} />
                    {text}
                  </div>
                ))}
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}

function CalendarPicker({
  lang,
  availableDays,
  selectedDay,
  onSelect,
  disabled,
}: {
  lang: Language;
  availableDays: Set<string>;
  selectedDay: string;
  onSelect: (day: string) => void;
  disabled?: boolean;
}) {
  const t = translations[lang].booking;
  const locale = lang === 'he' ? 'he-IL' : 'en-IL';
  const todayIso = useMemo(() => isoDay(new Date()), []);

  // Initial month: month of earliest available day, or today if none.
  const initial = useMemo(() => {
    const sorted = Array.from(availableDays).sort();
    if (sorted.length > 0) {
      const [y, m] = sorted[0].split('-').map(Number);
      return { year: y, month: m - 1 };
    }
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }, [availableDays]);

  const [view, setView] = useState(initial);
  // If availability changes (e.g. config refresh) and the current view has no
  // slots and the selected month is not where the selection lives, drift forward.
  useEffect(() => { setView(initial); }, [initial]);

  const monthLabel = useMemo(() => {
    const d = new Date(view.year, view.month, 1);
    return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(d);
  }, [view.year, view.month, locale]);

  const weekdayLabels = useMemo(() => {
    // Sunday = 0, Saturday = 6 — Israeli/Hebrew week starts on Sunday.
    const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 0, 7 + i))); // Jan 7 2024 was a Sunday
  }, [locale]);

  const cells = useMemo(() => {
    const firstOffset = new Date(view.year, view.month, 1).getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const out: Array<{ iso: string; day: number } | null> = [];
    for (let i = 0; i < firstOffset; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${view.year}-${pad2(view.month + 1)}-${pad2(d)}`;
      out.push({ iso, day: d });
    }
    while (out.length < 42) out.push(null);
    return out;
  }, [view.year, view.month]);

  const goPrev = () => setView((v) => v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 });
  const goNext = () => setView((v) => v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 });

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-md p-2 inline-block">
      <div className="flex items-center justify-between mb-2 gap-2">
        <button
          type="button"
          onClick={goPrev}
          disabled={disabled}
          aria-label={t.prevMonth}
          className="p-1 rounded text-white/70 hover:text-white hover:bg-white/5 transition disabled:opacity-30"
        >
          <ChevronLeft size={16} className={lang === 'he' ? 'rotate-180' : ''} />
        </button>
        <span className="text-sm font-bold text-white tracking-wide whitespace-nowrap">{monthLabel}</span>
        <button
          type="button"
          onClick={goNext}
          disabled={disabled}
          aria-label={t.nextMonth}
          className="p-1 rounded text-white/70 hover:text-white hover:bg-white/5 transition disabled:opacity-30"
        >
          <ChevronRight size={16} className={lang === 'he' ? 'rotate-180' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1 text-center">
        {weekdayLabels.map((wd, i) => (
          <span key={i} className="text-[10px] font-bold text-white/40 uppercase w-7">{wd}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((cell, i) => {
          if (!cell) return <span key={i} aria-hidden className="w-7 h-7" />;
          const isAvailable = availableDays.has(cell.iso);
          const isSelected = cell.iso === selectedDay;
          const isToday = cell.iso === todayIso;
          return (
            <button
              key={i}
              type="button"
              onClick={() => isAvailable && onSelect(cell.iso)}
              disabled={!isAvailable || disabled}
              aria-pressed={isSelected}
              className={cn(
                'w-7 h-7 flex items-center justify-center rounded text-sm font-bold transition relative',
                isSelected && 'bg-brand-yellow text-brand-navy shadow-md shadow-brand-yellow/30',
                !isSelected && isAvailable && 'bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/40 hover:bg-brand-yellow/25 cursor-pointer',
                !isAvailable && 'text-white/25 cursor-not-allowed'
              )}
            >
              {cell.day}
              {isToday && !isSelected && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-brand-yellow" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function isoDay(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function Field({ label, icon, children }: { label: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="space-y-0.5">
      <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

function InlineLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2 whitespace-nowrap">
      {icon} {children}
    </span>
  );
}

function SuccessPanel({
  lang,
  emailProvided,
  onAgain,
  onClose,
}: {
  lang: Language;
  emailProvided: boolean;
  onAgain: () => void;
  onClose: () => void;
}) {
  const t = translations[lang].booking;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative -mx-6 md:-mx-8 -mb-6 md:-mb-8 overflow-hidden rounded-b-xl"
    >
      {/* Brothers backdrop */}
      <img
        src={`${import.meta.env.BASE_URL}brothers2.jpg`}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/55 via-brand-navy/40 to-brand-navy/75" />

      <div className="relative flex flex-col items-center justify-center text-center px-6 md:px-8 py-12">
        <div className="w-16 h-16 bg-brand-yellow/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
          <CheckCircle2 className="text-brand-yellow" size={32} strokeWidth={2} />
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">
          {t.successTitle}
        </h3>
        <p className="text-sm md:text-base text-white/85 leading-relaxed max-w-md mb-4">
          {t.successBody}
        </p>
        {emailProvided && (
          <p className="text-sm text-brand-yellow/90 leading-snug max-w-md mb-4 flex items-center gap-2 justify-center">
            <Mail size={14} className="text-brand-yellow" />
            {t.successEmailNote}
          </p>
        )}
        <p className="text-xs md:text-sm text-white/60 italic max-w-md">
          {t.successSignoff}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={onAgain}
            className="text-white/80 border-b border-white/30 pb-1 font-semibold text-xs uppercase tracking-wider hover:text-brand-yellow hover:border-brand-yellow transition-all"
          >
            {t.bookAnother}
          </button>
          <button
            onClick={onClose}
            className="text-white/50 text-xs uppercase tracking-wider hover:text-white transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
