import { useEffect, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/react";
import { analyticsAllowed, analyticsUrl, CONSENT_EVENT, publicAnalyticsPath, trackConversion } from "@/lib/analytics";

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const subscribe = (callback: () => void) => {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener(CONSENT_EVENT, callback); window.removeEventListener("storage", callback); };
};
const filterVercel = (event: BeforeSendEvent) => {
  const url = analyticsUrl(event.url);
  return analyticsAllowed() && url ? { ...event, url } : null;
};

export default function SiteAnalytics() {
  const { pathname } = useLocation();
  const allowed = useSyncExternalStore(subscribe, analyticsAllowed, () => false);
  const publicPage = publicAnalyticsPath(pathname) !== null;

  useEffect(() => {
    if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId) || !import.meta.env.PROD) return;
    const enabled = allowed && publicPage;
    (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = !enabled;
    if (!enabled) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      return;
    }
    const page = analyticsUrl(window.location.href);
    const referrer = (() => { try { return new URL(document.referrer).origin; } catch { return ""; } })();
    const pageData = { page_location: page, page_referrer: referrer, page_title: "Hammaddem" };
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        // gtag expects an Arguments object, not an array.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      window.gtag("js", new Date());
      window.gtag("config", measurementId, { ...pageData, send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      script.id = "hammaddem-analytics";
      document.head.appendChild(script);
    }
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("set", pageData);
    window.gtag("event", "page_view", { ...pageData, send_to: measurementId });
  }, [allowed, pathname, publicPage]);

  useEffect(() => {
    if (!allowed || !publicPage) return;
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const placement = link.closest("nav") ? "header" : link.closest("footer") ? "footer" : "content";
      if (link.protocol === "tel:") trackConversion("contact_phone_click", { placement });
      else if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(link.hostname)) trackConversion("contact_whatsapp_click", { placement });
      else if (link.origin === window.location.origin && (link.pathname === "/teklif-al" || link.hash === "#siparis-formu" || link.hash === "#teklif-formu")) trackConversion("quote_cta_click", { placement });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [allowed, publicPage]);

  return allowed && publicPage ? <Analytics beforeSend={filterVercel} /> : null;
}
