export type QuoteTerms = {
  priceBasis: "unit" | "total";
  vat: "included" | "excluded" | "unspecified";
  scope: string;
  exclusions: string;
  delivery: string;
  payment: string;
  validUntil: string;
};

export const emptyQuoteTerms: QuoteTerms = {
  priceBasis: "unit", vat: "unspecified", scope: "", exclusions: "", delivery: "", payment: "", validUntil: "",
};

// Older requests have no terms. Do not infer tax, delivery promises or validity.
export function readQuoteTerms(value: unknown): QuoteTerms {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { ...emptyQuoteTerms };
  const data = value as Record<string, unknown>;
  const text = (key: string) => typeof data[key] === "string" ? data[key] as string : "";
  return {
    priceBasis: data.priceBasis === "total" ? "total" : "unit",
    vat: data.vat === "included" || data.vat === "excluded" ? data.vat : "unspecified",
    scope: text("scope"), exclusions: text("exclusions"), delivery: text("delivery"),
    payment: text("payment"), validUntil: /^\d{4}-\d{2}-\d{2}$/.test(text("validUntil")) ? text("validUntil") : "",
  };
}

export function quoteExpired(terms: QuoteTerms, now = Date.now()) {
  return Boolean(terms.validUntil) && now > new Date(`${terms.validUntil}T23:59:59.999+03:00`).getTime();
}

export function quoteTermsError(terms: QuoteTerms): string | null {
  if (!terms.scope.trim() || !terms.delivery.trim() || !terms.payment.trim()) return "Kapsam, teslimat koşulları ve ödeme koşullarını doldurun.";
  if (terms.vat === "unspecified") return "KDV dahil veya hariç seçimini yapın.";
  if (!terms.validUntil || !Number.isFinite(Date.parse(`${terms.validUntil}T00:00:00+03:00`)) || quoteExpired(terms)) return "Teklif için bugün veya sonraki bir geçerlilik tarihi seçin.";
  return null;
}

export function quoteTotal(price: number, quantity: number, terms: QuoteTerms) {
  return terms.priceBasis === "total" ? price : Math.round(price * quantity * 100) / 100;
}
