import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CookieConsent from "@/components/CookieConsent";
import SiteAnalytics from "@/components/SiteAnalytics";
import { analyticsAllowed, analyticsUrl, CONSENT_KEY, PREFERENCES_EVENT, saveConsent, trackConversion } from "@/lib/analytics";
import { useQuoteAnalytics } from "@/hooks/use-quote-analytics";

vi.mock("@vercel/analytics/react", () => ({ Analytics: () => <span data-testid="vercel-analytics" /> }));

beforeEach(() => {
  localStorage.clear();
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-TEST123");
  window.gtag = vi.fn();
  window.history.replaceState({}, "", "/");
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("optional measurement", () => {
  it("does not record a conversion before acceptance or after rejection", () => {
    trackConversion("contact_phone_click");
    saveConsent("rejected");
    trackConversion("quote_success", { form: "order" });
    expect(window.gtag).not.toHaveBeenCalled();
    saveConsent("accepted");
    trackConversion("quote_success", { form: "order" });
    expect(window.gtag).toHaveBeenCalledTimes(1);
  });

  it("strips contact details and receipt numbers from URLs and excludes private screens", () => {
    expect(analyticsUrl("https://hammaddem.co/teklif-al?telefon=05393308617#HMD-2026-0006")).toBe("https://hammaddem.co/teklif-al");
    for (const path of ["admin", "dashboard", "giris", "kayit", "sifre-sifirla", "talep-takip", "x/05393308617"]) {
      expect(analyticsUrl(`https://hammaddem.co/${path}`)).toBeNull();
    }
    expect(analyticsUrl("invalid")).toBeNull();
  });

  it("drops unexpected event properties even if a caller passes customer data", () => {
    saveConsent("accepted");
    trackConversion("quote_success", { form: "order", phone: "05393308617", address: "private address", note: "private note" } as Parameters<typeof trackConversion>[1]);
    expect(window.gtag).toHaveBeenCalledWith("event", "quote_success", { form_name: "order", page_location: window.location.origin + "/", page_title: "Hammaddem" });
  });

  it("does not let unavailable storage or an analytics error break the site", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    expect(analyticsAllowed()).toBe(false);
    expect(() => trackConversion("quote_submit")).not.toThrow();
    vi.restoreAllMocks();
    saveConsent("accepted");
    window.gtag = () => { throw new Error("offline"); };
    expect(() => trackConversion("quote_success")).not.toThrow();
  });

  it("lets the visitor reopen preferences and stops analytics immediately on rejection", () => {
    saveConsent("accepted");
    render(<MemoryRouter><CookieConsent /><SiteAnalytics /></MemoryRouter>);
    expect(screen.getByTestId("vercel-analytics")).toBeInTheDocument();
    fireEvent(window, new Event(PREFERENCES_EVENT));
    fireEvent.click(screen.getByRole("button", { name: "Yalnızca Gerekli" }));
    expect(localStorage.getItem(CONSENT_KEY)).toBe("rejected");
    expect(screen.queryByTestId("vercel-analytics")).not.toBeInTheDocument();
  });

  it("counts an interested visitor once across repeated field changes", () => {
    function Form() {
      const analytics = useQuoteAnalytics("hafriyat");
      return <input aria-label="Address" onChange={analytics.start} />;
    }
    saveConsent("accepted");
    render(<Form />);
    fireEvent.change(screen.getByLabelText("Address"), { target: { value: "first" } });
    fireEvent.change(screen.getByLabelText("Address"), { target: { value: "second" } });
    const names = vi.mocked(window.gtag).mock.calls.map(call => call[1]);
    expect(names.filter(name => name === "quote_form_start")).toHaveLength(1);
    expect(names.filter(name => name === "quote_form_step")).toHaveLength(1);
    expect(names).not.toContain("quote_success");
  });
});
