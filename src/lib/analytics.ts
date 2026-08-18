/**
 * Thin wrapper over GA4's gtag. Everything no-ops when NEXT_PUBLIC_GA_ID isn't set, so
 * local dev and preview deploys don't pollute the property and nothing throws if the
 * script is blocked by an ad blocker (which, for this audience, some of it will be).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

type Params = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}

/** Outbound contact attempts that aren't the form — worth counting as conversions in GA4. */
export const trackContactClick = (channel: 'phone' | 'whatsapp' | 'email') =>
  track('contact_click', { channel });

/** Which CTA moved someone toward the form, and from where on the page. */
export const trackCta = (label: string, location: string) =>
  track('cta_click', { cta_label: label, cta_location: location });
