import { useCallback, useEffect, useRef } from "react";
import { analyticsAllowed, type QuoteForm, trackConversion } from "@/lib/analytics";

export function useQuoteAnalytics(form: QuoteForm, step: number = 1) {
  const started = useRef(false);
  const seen = useRef(new Set<number>());
  const recordStep = useCallback((next: number) => {
    if (!analyticsAllowed() || ![1, 2, 3].includes(next) || seen.current.has(next)) return;
    seen.current.add(next);
    trackConversion("quote_form_step", { form, step: next as 1 | 2 | 3 });
  }, [form]);
  useEffect(() => { if (started.current) recordStep(step); }, [step, recordStep]);
  return {
    start: () => {
      if (started.current || !analyticsAllowed()) return;
      started.current = true;
      trackConversion("quote_form_start", { form });
      recordStep(step);
    },
    submit: () => trackConversion("quote_submit", { form }),
    success: () => trackConversion("quote_success", { form }),
    error: () => trackConversion("quote_error", { form }),
    reset: () => { started.current = false; seen.current.clear(); },
  };
}
