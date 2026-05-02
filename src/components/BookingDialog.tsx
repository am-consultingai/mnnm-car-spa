import { useEffect, useMemo, useRef, useState, FormEvent, ReactNode } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, X, User, Phone, Calendar, Clock, Mail, Send, Loader2 } from 'lucide-react';
import { Language, translations } from '../translations';
import { cn } from '../lib/utils';
import {
  BookingConfig,
  formatDayLabel,
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
  'w-full bg-white/[0.04] border border-white/10 rounded-md px-4 py-3 text-white placeholder-white/30 focus:border-brand-yellow focus:bg-white/[0.07] outline-none transition-all text-base disabled:opacity-50';

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

  const price = config?.price ?? 15;
  const currency = config?.currency ?? '₪';
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
        'w-full max-w-xl rounded-xl',
        'open:animate-[fadeIn_.18s_ease-out]'
      )}
      aria-labelledby="booking-dialog-title"
    >
      <div className="bg-brand-navy border border-white/10 rounded-xl text-white shadow-2xl">
        <div className="flex items-start justify-between px-6 md:px-8 pt-6 md:pt-8 pb-4">
          <div>
            <span className="eyebrow text-brand-yellow text-[11px] font-bold uppercase mb-2 inline-block">
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

        <div className="px-6 md:px-8 pb-6 md:pb-8">
          {step === 'success' ? (
            <SuccessPanel lang={lang} onAgain={() => {
              setStep('form');
              setName(''); setPhone(''); setEmail(''); setDay(''); setTime('');
            }} onClose={onClose} />
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label={t.name} icon={<User size={13} className="text-brand-yellow" />}>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  disabled={step === 'submitting'}
                  autoComplete="name"
                />
              </Field>

              <Field label={t.phone} icon={<Phone size={13} className="text-brand-yellow" />}>
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
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label={t.day} icon={<Calendar size={13} className="text-brand-yellow" />}>
                  <select
                    required
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className={cn(inputClass, '[color-scheme:dark]')}
                    disabled={step === 'submitting'}
                  >
                    <option value="">{t.dayPlaceholder}</option>
                    {groupedDays.map((g) => (
                      <option key={g.day} value={g.day}>
                        {formatDayLabel(g.day, lang)}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label={t.time} icon={<Clock size={13} className="text-brand-yellow" />}>
                  <select
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={cn(inputClass, '[color-scheme:dark]')}
                    disabled={step === 'submitting' || !day}
                  >
                    <option value="">{t.timePlaceholder}</option>
                    {timesForDay.map((tm) => (
                      <option key={tm} value={tm}>{tm}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label={t.email} icon={<Mail size={13} className="text-brand-yellow" />}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  dir="ltr"
                  disabled={step === 'submitting'}
                  autoComplete="email"
                />
                <p className="text-[11px] text-white/45 leading-snug">{t.emailHint}</p>
              </Field>

              {errorMessage && step !== 'submitting' && (
                <p className="text-sm text-red-300/90 bg-red-500/10 border border-red-400/20 rounded-md px-3 py-2">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={step === 'submitting'}
                className={cn(
                  'group w-full py-4 md:py-5 bg-brand-yellow text-brand-navy font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-2xl shadow-brand-yellow/20 rounded-md flex items-center justify-center gap-3',
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
                    {t.submitPrefix}{price} {currency}
                    <Send className={lang === 'he' ? 'rotate-180' : ''} size={16} strokeWidth={2.5} />
                  </>
                )}
              </button>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-5 pt-4 border-t border-white/10">
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

function Field({ label, icon, children }: { label: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

function SuccessPanel({ lang, onAgain, onClose }: { lang: Language; onAgain: () => void; onClose: () => void }) {
  const t = translations[lang].booking;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-8"
    >
      <div className="w-16 h-16 bg-brand-yellow/15 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="text-brand-yellow" size={32} strokeWidth={2} />
      </div>
      <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 tracking-tight">
        {t.success.split('.')[0]}
      </h3>
      <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md">
        {t.success.split('.').slice(1).join('.').trim()}
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
    </motion.div>
  );
}
