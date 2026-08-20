'use client';

import { useEffect, useState } from 'react';
import { describeInIstAndSgt } from '../lib/time';

/**
 * Real availability, not a freeform time entry: India evenings, Singapore evenings (two
 * separate windows — the team takes calls in the evening local to whichever region), and a
 * wider IST weekend window. Both zones are fixed-offset year-round (no DST), so the math
 * below never needs to account for it.
 *
 * Everything is generated and shown in the *visitor's own local time* — detected from the
 * browser (Intl), not IP geolocation. IP-based location needs a third-party lookup, costs
 * money at scale, and is routinely wrong behind a VPN or mobile carrier; the browser already
 * knows the visitor's real timezone for free and is generally more accurate for this exact
 * purpose.
 */
const TZ_IST = 'Asia/Kolkata';
const TZ_SGT = 'Asia/Singapore';
const IST_OFFSET_MIN = 5 * 60 + 30;
const SGT_OFFSET_MIN = 8 * 60;
const SOURCE_DAYS_AHEAD = 21; // generous window so grouping-by-visitor-day never runs dry
const MAX_VISIBLE_DAYS = 10;
const SLOT_STEP_MIN = 60;

type DayGroup = { key: string; weekdayShort: string; dayNum: number; monthShort: string; slots: Date[] };

/** Calendar Y/M/D of `date` as seen in `timeZone` — via formatToParts, not string parsing. */
function getZonedYMD(date: Date, timeZone: string): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { y: get('year'), m: get('month') - 1, d: get('day') };
}

/** The UTC instant for a wall-clock time in a fixed-offset zone — e.g. 18:30 on this date, IST. */
function zonedToUtc(y: number, m: number, d: number, hh: number, mm: number, offsetMin: number): Date {
  return new Date(Date.UTC(y, m, d, hh, mm) - offsetMin * 60000);
}

function buildRange(
  y: number, m: number, d: number,
  startH: number, startM: number, endH: number, endM: number,
  offsetMin: number
): Date[] {
  const out: Date[] = [];
  const end = endH * 60 + endM;
  for (let t = startH * 60 + startM; t + SLOT_STEP_MIN <= end; t += SLOT_STEP_MIN) {
    out.push(zonedToUtc(y, m, d, Math.floor(t / 60), t % 60, offsetMin));
  }
  return out;
}

/** All future bookable instants across both windows, as absolute UTC timestamps. */
function buildSourceSlots(): Date[] {
  const now = Date.now();
  const slots: Date[] = [];

  // India: weekday evenings 18:30-21:30 IST, weekend daytime 10:00-18:00 IST. Weekday-ness
  // is judged by IST's own calendar, not the visitor's — it's IST's work week that matters.
  const istToday = getZonedYMD(new Date(), TZ_IST);
  for (let i = 0; i < SOURCE_DAYS_AHEAD; i++) {
    const probe = new Date(Date.UTC(istToday.y, istToday.m, istToday.d + i));
    const y = probe.getUTCFullYear();
    const m = probe.getUTCMonth();
    const d = probe.getUTCDate();
    const dow = probe.getUTCDay();
    if (dow >= 1 && dow <= 5) slots.push(...buildRange(y, m, d, 18, 30, 21, 30, IST_OFFSET_MIN));
    else slots.push(...buildRange(y, m, d, 10, 0, 18, 0, IST_OFFSET_MIN));
  }

  // Singapore: weekday evenings 19:00-22:00 SGT, judged by SGT's own calendar.
  const sgtToday = getZonedYMD(new Date(), TZ_SGT);
  for (let i = 0; i < SOURCE_DAYS_AHEAD; i++) {
    const probe = new Date(Date.UTC(sgtToday.y, sgtToday.m, sgtToday.d + i));
    const dow = probe.getUTCDay();
    if (dow >= 1 && dow <= 5) {
      slots.push(
        ...buildRange(probe.getUTCFullYear(), probe.getUTCMonth(), probe.getUTCDate(), 19, 0, 22, 0, SGT_OFFSET_MIN)
      );
    }
  }

  return slots.filter((d) => d.getTime() > now).sort((a, b) => a.getTime() - b.getTime());
}

/**
 * Buckets by the *visitor's own* local calendar day. Deliberately uses plain Date getters
 * (getFullYear/getDate/...), not Intl with an explicit zone — this runs client-side in the
 * visitor's real browser, so those getters already report their real local time for free.
 */
function groupByLocalDay(slots: Date[]): DayGroup[] {
  const map = new Map<string, Date[]>();
  for (const s of slots) {
    const key = `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}`;
    const bucket = map.get(key);
    if (bucket) bucket.push(s);
    else map.set(key, [s]);
  }
  const groups = Array.from(map.values()).map((daySlots): DayGroup => {
    const ref = daySlots[0];
    return {
      key: `${ref.getFullYear()}-${ref.getMonth()}-${ref.getDate()}`,
      weekdayShort: ref.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: ref.getDate(),
      monthShort: ref.toLocaleDateString('en-US', { month: 'short' }),
      // India's and Singapore's windows are different real instants, but depending on the
      // visitor's own offset, two of them can occasionally format to the identical local
      // clock reading (e.g. IST 6:30pm and SGT 9pm both land on 9am US Eastern). Showing two
      // buttons that both say "9:00 AM" is confusing, not informative — keep one.
      slots: dedupeByLocalLabel(daySlots),
    };
  });
  groups.sort((a, b) => a.slots[0].getTime() - b.slots[0].getTime());
  return groups.slice(0, MAX_VISIBLE_DAYS);
}

function formatLocalTime(d: Date): string {
  const hh = d.getHours();
  const mm = d.getMinutes();
  const period = hh >= 12 ? 'PM' : 'AM';
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, '0')} ${period}`;
}

function dedupeByLocalLabel(slots: Date[]): Date[] {
  const seen = new Set<string>();
  const out: Date[] = [];
  for (const s of slots) {
    const label = formatLocalTime(s);
    if (seen.has(label)) continue;
    seen.add(label);
    out.push(s);
  }
  return out;
}

export default function SlotPicker() {
  // null = not yet computed. Everything here (which days exist, what "now" is, the visitor's
  // real timezone) depends on the browser it's running in, so it can only be computed after
  // mount — never during the render Next statically prerenders, and never during the client's
  // first hydration pass either, or the two would disagree and React would flag a mismatch.
  // The loading state below is what both of those render identically; real content replaces
  // it a moment after mount, once useEffect can safely run.
  const [days, setDays] = useState<DayGroup[] | null>(null);
  const [zoneLabel, setZoneLabel] = useState('');
  const [selectedDayKey, setSelectedDayKey] = useState('');
  const [selected, setSelected] = useState<Date | null>(null);

  useEffect(() => {
    const built = groupByLocalDay(buildSourceSlots());
    setDays(built);
    setSelectedDayKey(built[0]?.key ?? '');
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const abbr = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' })
        .formatToParts(new Date())
        .find((p) => p.type === 'timeZoneName')?.value;
      setZoneLabel(abbr ? `${tz} (${abbr})` : tz);
    } catch {
      setZoneLabel('');
    }
  }, []);

  if (days === null) {
    return <p className="micro" style={{ margin: 0 }}>Loading available times…</p>;
  }

  const selectedDay = days.find((d) => d.key === selectedDayKey) ?? days[0];

  if (!selectedDay) {
    return (
      <p className="micro" style={{ margin: 0 }}>
        No slots currently open — mention a time in your message below and we&apos;ll find one.
      </p>
    );
  }

  return (
    <div className="slot-picker">
      {zoneLabel && <p className="slot-tz-note">Shown in your local time — {zoneLabel}</p>}

      <div className="slot-days" role="group" aria-label="Choose a day">
        {days.map((d) => (
          <button
            type="button"
            key={d.key}
            className={`slot-day${d.key === selectedDayKey ? ' is-selected' : ''}`}
            aria-pressed={d.key === selectedDayKey}
            onClick={() => {
              setSelectedDayKey(d.key);
              setSelected(null);
            }}
          >
            <span className="slot-day-dow">{d.weekdayShort}</span>
            <span className="slot-day-num">{d.dayNum}</span>
            <span className="slot-day-mon">{d.monthShort}</span>
          </button>
        ))}
      </div>

      <div className="slot-times" role="group" aria-label="Available times">
        {selectedDay.slots.map((s) => {
          const isSelected = selected?.getTime() === s.getTime();
          return (
            <button
              type="button"
              key={s.toISOString()}
              className={`slot-time${isSelected ? ' is-selected' : ''}`}
              aria-pressed={isSelected}
              onClick={() => setSelected(s)}
            >
              {formatLocalTime(s)}
            </button>
          );
        })}
      </div>

      <div className="slot-summary">
        <span className="micro" style={{ margin: 0 }}>
          {selected
            ? `Selected: ${selectedDay.weekdayShort} ${selectedDay.dayNum} ${selectedDay.monthShort} — ${describeInIstAndSgt(selected)}`
            : "No time picked yet — that's fine. Mention one in your message if none of these work and we'll find a slot."}
        </span>
        {selected && (
          <button type="button" className="slot-clear" onClick={() => setSelected(null)}>
            Clear
          </button>
        )}
      </div>

      <input type="hidden" name="preferredTime" value={selected ? selected.toISOString() : ''} />
    </div>
  );
}
