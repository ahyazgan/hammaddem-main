import { cleanup, render, screen } from "@testing-library/react";
import QuoteSummary from "@/components/quotes/QuoteSummary";
import { emptyQuoteTerms, quoteExpired, quoteTotal, readQuoteTerms } from "@/lib/quote-terms";
import { publishedCaseStudies, type CaseStudy } from "@/data/caseStudies";

afterEach(cleanup);
it("does not multiply a total project quote by the requested quantity", () => {
  const terms = { ...emptyQuoteTerms, priceBasis: "total" as const };
  expect(quoteTotal(15000, 100, terms)).toBe(15000);
  expect(quoteTotal(0.1, 3, emptyQuoteTerms)).toBe(0.3);
});
it("expires at the end of the stated day in Turkey", () => {
  const terms = { ...emptyQuoteTerms, validUntil: "2026-10-10" };
  expect(quoteExpired(terms, Date.parse("2026-10-10T20:59:59Z"))).toBe(false);
  expect(quoteExpired(terms, Date.parse("2026-10-10T21:00:00Z"))).toBe(true);
  expect(quoteExpired(emptyQuoteTerms)).toBe(false);
});
it("shows unknown terms for legacy quotes instead of inventing inclusions", () => {
  expect(readQuoteTerms(null).vat).toBe("unspecified");
  render(<QuoteSummary request={{ talep_no: "HMD-2026-0001", durum: "teklif", miktar: 2, birim: "Ton", teklif_fiyat: 1500 }} />);
  expect(screen.getByText(/KDV bilgisi belirtilmemiş/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "WhatsApp" }).getAttribute("href")).toContain("HMD-2026-0001");
});
it("renders an expired quote as requiring renewal and hides contact actions for cancelled jobs", () => {
  const request = { talep_no: "HMD-2026-0001", durum: "teklif", miktar: 2, birim: "Ton", teklif_fiyat: 1500, teklif_detaylari: { validUntil: "2000-01-01" } };
  const { rerender } = render(<QuoteSummary request={request} />);
  expect(screen.getByText(/geçerlilik süresi doldu/)).toBeInTheDocument();
  rerender(<QuoteSummary request={{ ...request, durum: "iptal" }} />);
  expect(screen.queryByRole("link", { name: "Teklifi görüş" })).not.toBeInTheDocument();
});
it("publishes only complete, approved real job content", () => {
  const job: CaseStudy = { id: "fixture", status: "published", title: "Test", service: "silobas", city: "İstanbul", completedMonth: "2026-10", work: "Test", outcome: "Test", publicationApproved: true, photo: { src: "/images/references/test.webp", alt: "Test", permissionConfirmed: true, isRealSitePhoto: true } };
  expect(publishedCaseStudies()).toEqual([]);
  expect(publishedCaseStudies([job])).toHaveLength(1);
  expect(publishedCaseStudies([{ ...job, status: "draft" }, { ...job, photo: { ...job.photo, isRealSitePhoto: false } }, { ...job, publicationApproved: false }])).toEqual([]);
});
