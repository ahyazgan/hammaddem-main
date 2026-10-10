export const CONSENT_KEY = "hammaddem_cookie_consent";
export const CONSENT_EVENT = "hammaddem:consent-change";
export const PREFERENCES_EVENT = "hammaddem:open-preferences";

export function analyticsAllowed() {
  try { return window.localStorage.getItem(CONSENT_KEY) === "accepted"; }
  catch { return false; }
}

export function saveConsent(value: "accepted" | "rejected") {
  try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* Stay opted out if storage is unavailable. */ }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function publicAnalyticsPath(path: string) {
  return /^\/(?:admin|dashboard|giris|kayit|sifre-sifirla|talep-takip)(?:\/|$)/.test(path)
    || /@|%40|\d{6}/i.test(path) ? null : path;
}

export function analyticsUrl(raw: string) {
  try {
    const url = new URL(raw);
    const path = publicAnalyticsPath(url.pathname);
    return path === null ? null : `${url.origin}${path}`;
  } catch { return null; }
}

export type ConversionEvent = "contact_phone_click" | "contact_whatsapp_click" | "quote_cta_click"
  | "quote_form_start" | "quote_form_step" | "quote_submit" | "quote_success" | "quote_error";
export type QuoteForm = "order" | "hafriyat";
type EventDetails = { form?: QuoteForm; step?: 1 | 2 | 3; placement?: "header" | "footer" | "content" };

// Only fixed event names and small enums enter analytics. Never pass form values, URLs or error messages.
export function trackConversion(name: ConversionEvent, details: EventDetails = {}) {
  if (!analyticsAllowed() || !window.gtag || !import.meta.env.VITE_GA_MEASUREMENT_ID) return;
  const page = analyticsUrl(window.location.href);
  if (!page) return;
  const properties: Record<string, string | number> = { page_location: page, page_title: "Hammaddem" };
  if (details.form === "order" || details.form === "hafriyat") properties.form_name = details.form;
  if ([1, 2, 3].includes(details.step ?? 0)) properties.form_step = details.step!;
  if (["header", "footer", "content"].includes(details.placement ?? "")) properties.placement = details.placement!;
  try { window.gtag("event", name, properties); } catch { /* Measurement must never block a request. */ }
}
