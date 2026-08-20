/**
 * FusionX operates across IST and SGT (see site.config's `timezone` field). A visitor
 * picking a preferred call time only ever enters it in their own local wall-clock time —
 * there's no timezone selector, nothing for them to get wrong — so this is what turns that
 * into the two zones that actually matter for scheduling, on both the live form preview and
 * the email the team reads.
 */
export const TZ_IST = 'Asia/Kolkata';
export const TZ_SGT = 'Asia/Singapore';

function formatInZone(date: Date, timeZone: string): string {
  return date.toLocaleString('en-US', {
    timeZone,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** e.g. "Tue, 6 Jan, 3:00 PM IST  ·  Tue, 6 Jan, 5:30 PM SGT". '' for an invalid/empty date. */
export function describeInIstAndSgt(date: Date): string {
  if (Number.isNaN(date.getTime())) return '';
  return `${formatInZone(date, TZ_IST)} IST  ·  ${formatInZone(date, TZ_SGT)} SGT`;
}
