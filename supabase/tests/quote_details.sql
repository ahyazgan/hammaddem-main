-- Run in the SQL editor after 20261010000001_quote_details.sql.
-- Uses the explicitly marked integration-test request only; rolls all writes back.
BEGIN;
DO $$
DECLARE found jsonb;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.misafir_talepler WHERE talep_no = 'HMD-2026-0007' AND not_text LIKE 'TEST%') THEN
    RAISE EXCEPTION 'Marked test request missing; stop without touching real requests.';
  END IF;
  UPDATE public.misafir_talepler SET teklif_fiyat = 1250,
    teklif_detaylari = '{"priceBasis":"total","vat":"excluded","scope":"TEST","delivery":"TEST","payment":"TEST","validUntil":"2099-12-31"}'::jsonb
  WHERE talep_no = 'HMD-2026-0007' AND not_text LIKE 'TEST%';
  found := public.talep_sorgula_v2('05393308617', 'HMD-2026-0007');
  IF jsonb_array_length(found) <> 1 OR found->0->'teklif_detaylari'->>'scope' <> 'TEST' THEN
    RAISE EXCEPTION 'Quote detail lookup failed';
  END IF;
  IF (found->0) ?| ARRAY['adres','not_text','telefon','user_id'] THEN RAISE EXCEPTION 'Private fields exposed'; END IF;
  IF public.talep_sorgula_v2('05393308617', '') <> '[]'::jsonb
    OR public.talep_sorgula_v2('05393308617', NULL) <> '[]'::jsonb
    OR public.talep_sorgula_v2('05000000000', 'HMD-2026-0007') <> '[]'::jsonb
    OR public.talep_sorgula_v2('05393308617', 'HMD-NOT-FOUND') <> '[]'::jsonb
  THEN RAISE EXCEPTION 'Lookup must require both matching fields'; END IF;
  PERFORM set_config('request.jwt.claim.role', 'authenticated', true);
  PERFORM set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000001', true);
  BEGIN
    UPDATE public.misafir_talepler SET teklif_fiyat = 1 WHERE talep_no = 'HMD-2026-0007' AND not_text LIKE 'TEST%';
    RAISE EXCEPTION 'Non-admin changed quote price';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END;
$$;
ROLLBACK;
SELECT 'PASS: terms lookup, exact match, private field exclusion, non-admin protection; test writes rolled back' AS result;
