export interface BookingConfig {
  price: number;
  currency: string;
  slots: string[];
}

export interface BookingPayload {
  name: string;
  phone: string;
  slot: string;
  email?: string;
}

export type SubmitResult = { ok: true } | { ok: false; error: string };

const SCRIPT_URL = (import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined)?.trim() || '';

export const isBookingConfigured = () => SCRIPT_URL.length > 0;

const FALLBACK_CONFIG: BookingConfig = { price: 15, currency: '₪', slots: [] };

export async function fetchBookingConfig(): Promise<BookingConfig> {
  if (!SCRIPT_URL) return FALLBACK_CONFIG;
  const url = `${SCRIPT_URL}?action=config&t=${Date.now()}`;
  const res = await fetch(url, { method: 'GET', redirect: 'follow' });
  if (!res.ok) throw new Error(`config_http_${res.status}`);
  const data = await res.json();
  if (!data || data.ok === false) throw new Error(data?.error || 'config_failed');
  return {
    price: typeof data.price === 'number' ? data.price : FALLBACK_CONFIG.price,
    currency: typeof data.currency === 'string' && data.currency ? data.currency : FALLBACK_CONFIG.currency,
    slots: Array.isArray(data.slots) ? data.slots.filter((s: unknown): s is string => typeof s === 'string') : [],
  };
}

export async function submitBooking(payload: BookingPayload): Promise<SubmitResult> {
  if (!SCRIPT_URL) return { ok: false, error: 'not_configured' };
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    redirect: 'follow',
    // text/plain avoids a CORS preflight; Apps Script reads e.postData.contents either way.
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return { ok: false, error: `http_${res.status}` };
  const data = await res.json().catch(() => null);
  if (!data) return { ok: false, error: 'bad_response' };
  if (data.ok) return { ok: true };
  return { ok: false, error: typeof data.error === 'string' ? data.error : 'unknown' };
}

/** Group flat ISO-like slot strings ("YYYY-MM-DDTHH:MM") by day. */
export function groupSlotsByDay(slots: string[]): { day: string; times: string[] }[] {
  const map = new Map<string, string[]>();
  for (const s of slots) {
    const m = s.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})$/);
    if (!m) continue;
    const [, day, time] = m;
    if (!map.has(day)) map.set(day, []);
    map.get(day)!.push(time);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, times]) => ({ day, times: times.sort() }));
}

/** "2026-05-03" + "10:00" → "2026-05-03T10:00" */
export function joinSlot(day: string, time: string): string {
  return `${day}T${time}`;
}

/** Friendly day label, RTL-aware. Falls back to ISO if Intl chokes. */
export function formatDayLabel(day: string, lang: 'he' | 'en'): string {
  try {
    const [y, m, d] = day.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const locale = lang === 'he' ? 'he-IL' : 'en-IL';
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    }).format(date);
  } catch {
    return day;
  }
}
