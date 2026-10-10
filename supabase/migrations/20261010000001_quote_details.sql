BEGIN;

ALTER TABLE public.talepler ADD COLUMN IF NOT EXISTS teklif_detaylari jsonb;
ALTER TABLE public.misafir_talepler ADD COLUMN IF NOT EXISTS teklif_detaylari jsonb;

-- Existing RLS still controls row access. Customers cannot rewrite an admin quote
-- through their own-row UPDATE/INSERT policy.
CREATE OR REPLACE FUNCTION public.protect_quote_fields()
RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
  IF auth.role() = 'authenticated' AND NOT public.has_role(auth.uid(), 'admin') THEN
    IF TG_OP = 'INSERT' THEN
      IF NEW.teklif_fiyat IS NOT NULL OR NEW.teklif_detaylari IS NOT NULL OR NEW.durum <> 'bekliyor' THEN
        RAISE EXCEPTION 'Teklif alanlarını yalnızca yönetici değiştirebilir.' USING ERRCODE = '42501';
      END IF;
    ELSE
      IF NEW.teklif_fiyat IS DISTINCT FROM OLD.teklif_fiyat OR NEW.teklif_detaylari IS DISTINCT FROM OLD.teklif_detaylari THEN
        RAISE EXCEPTION 'Teklif alanlarını yalnızca yönetici değiştirebilir.' USING ERRCODE = '42501';
      END IF;
      IF NEW.durum IS DISTINCT FROM OLD.durum AND NOT (NEW.durum = 'iptal' AND OLD.durum IN ('bekliyor', 'teklif')) THEN
        RAISE EXCEPTION 'Bu durum değişikliği için yönetici gereklidir.' USING ERRCODE = '42501';
      END IF;
    END IF;
  END IF;
  IF NEW.teklif_detaylari IS NOT NULL AND (
    jsonb_typeof(NEW.teklif_detaylari) <> 'object' OR octet_length(NEW.teklif_detaylari::text) > 16000
  ) THEN RAISE EXCEPTION 'Geçersiz teklif koşulları.'; END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER protect_talepler_quote_fields BEFORE INSERT OR UPDATE ON public.talepler
FOR EACH ROW EXECUTE FUNCTION public.protect_quote_fields();
CREATE OR REPLACE TRIGGER protect_misafir_quote_fields BEFORE INSERT OR UPDATE ON public.misafir_talepler
FOR EACH ROW EXECUTE FUNCTION public.protect_quote_fields();

-- New optional data is exposed only for an exact phone + receipt match.
-- Preserve v1's return signature for already-open clients. Never return addresses,
-- customer notes, phone numbers or profile data from this public lookup.
CREATE OR REPLACE FUNCTION public.talep_sorgula_v2(p_telefon text, p_talep_no text)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(jsonb_agg(to_jsonb(q) || jsonb_build_object('teklif_detaylari',
    CASE WHEN q.tip = 'misafir' THEN m.teklif_detaylari ELSE t.teklif_detaylari END)), '[]'::jsonb)
  FROM public.talep_sorgula(p_telefon, upper(btrim(p_talep_no))) q
  LEFT JOIN public.misafir_talepler m ON q.tip = 'misafir' AND m.id = q.id
  LEFT JOIN public.talepler t ON q.tip <> 'misafir' AND t.id = q.id
  WHERE length(btrim(p_talep_no)) BETWEEN 1 AND 40
    AND q.talep_no = upper(btrim(p_talep_no));
$$;
REVOKE ALL ON FUNCTION public.talep_sorgula_v2(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.talep_sorgula_v2(text, text) TO anon, authenticated;

COMMIT;
