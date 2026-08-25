-- 2026-08-25: Sipariş akışı düzeltmeleri
--
-- 1) teklif_fiyat kolonu
--    types.ts, AdminTalepler, TalepTakip ve SiparislerimView bu kolonu kullanıyordu ama hiçbir
--    migration'da tanımlanmamıştı. Sonuç: admin panelden FİYATLI teklif gönderilince UPDATE
--    42703 ile sessizce düşüyor, talep "teklif" durumuna geçmiyordu.
ALTER TABLE public.talepler         ADD COLUMN IF NOT EXISTS teklif_fiyat numeric;
ALTER TABLE public.misafir_talepler ADD COLUMN IF NOT EXISTS teklif_fiyat numeric;

-- 2) Gereksiz anon INSERT policy'si
--    Misafir talepler yalnızca misafir-talep edge function'ı (service role) üzerinden yazılır.
--    Bu policy, botların rate limit ve doğrulamayı atlayıp tabloya doğrudan yazmasına izin veriyordu.
DROP POLICY IF EXISTS "Anyone can insert misafir_talepler" ON public.misafir_talepler;

-- 3) /talep-takip için güvenli sorgu
--    Anonim istemci talepler/misafir_talepler tablolarını RLS nedeniyle okuyamaz (doğru olan bu).
--    Bu SECURITY DEFINER fonksiyon yalnızca telefonu eşleşen kayıtların sınırlı alanlarını döner;
--    adres, not ve telefon gibi alanlar dışarı çıkmaz. Telefon karşılaştırması son 10 haneye göre
--    yapılır, böylece "0539…", "+90539…" ve "539…" biçimleri aynı kabul edilir.
CREATE OR REPLACE FUNCTION public.talep_sorgula(p_telefon text, p_talep_no text DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  talep_no text,
  tip text,
  kategori text,
  malzeme text,
  miktar numeric,
  birim text,
  teslimat_ili text,
  teslimat_tarihi date,
  durum text,
  teklif_fiyat numeric,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH girdi AS (
    SELECT
      right(regexp_replace(coalesce(p_telefon, ''), '\D', '', 'g'), 10) AS tel10,
      nullif(upper(trim(p_talep_no)), '')                                AS no
  )
  SELECT u.*
  FROM (
    SELECT m.id, m.talep_no, 'misafir'::text AS tip, m.kategori, m.malzeme, m.miktar, m.birim,
           m.teslimat_ili, m.teslimat_tarihi, m.durum, m.teklif_fiyat, m.created_at, m.updated_at
    FROM public.misafir_talepler m
    CROSS JOIN girdi g
    WHERE length(g.tel10) = 10
      AND right(regexp_replace(coalesce(m.telefon, ''), '\D', '', 'g'), 10) = g.tel10
      AND (g.no IS NULL OR m.talep_no = g.no)

    UNION ALL

    SELECT t.id, t.talep_no, 'kayitli'::text AS tip, t.kategori, t.malzeme, t.miktar, t.birim,
           t.teslimat_ili, t.teslimat_tarihi, t.durum, t.teklif_fiyat, t.created_at, t.updated_at
    FROM public.talepler t
    JOIN public.profiles p ON p.user_id = t.user_id
    CROSS JOIN girdi g
    WHERE length(g.tel10) = 10
      AND right(regexp_replace(coalesce(p.telefon, ''), '\D', '', 'g'), 10) = g.tel10
      AND (g.no IS NULL OR t.talep_no = g.no)
  ) u
  ORDER BY u.created_at DESC
  LIMIT 20
$$;

REVOKE ALL ON FUNCTION public.talep_sorgula(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.talep_sorgula(text, text) TO anon, authenticated;
