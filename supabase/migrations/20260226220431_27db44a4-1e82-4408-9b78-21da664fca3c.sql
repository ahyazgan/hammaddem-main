
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  label text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read site settings (public landing page)
CREATE POLICY "Anyone can read site_settings"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only admins can update
CREATE POLICY "Admins can update site_settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can insert
CREATE POLICY "Admins can insert site_settings"
  ON public.site_settings FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed default values
INSERT INTO public.site_settings (key, value, label) VALUES
  ('stat_teslimat', '1.240+', 'Tamamlanan Teslimat'),
  ('stat_teklif_suresi', '15dk', 'Ort. Teklif Süresi'),
  ('stat_il_sayisi', '11 İl', 'Aktif Teslimat Bölgesi'),
  ('stat_zamaninda', '%96', 'Zamanında Teslimat');
