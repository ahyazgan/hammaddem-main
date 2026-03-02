
CREATE TABLE public.misafir_talepler (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  talep_no text NOT NULL,
  kategori text NOT NULL,
  malzeme text,
  miktar numeric NOT NULL DEFAULT 0,
  birim text NOT NULL DEFAULT 'Ton',
  teslimat_ili text,
  adres text,
  yuk_adres text,
  teslimat_tarihi date,
  aciliyet text NOT NULL DEFAULT 'normal',
  hizmet_tipi text NOT NULL DEFAULT 'satin_alma',
  not_text text,
  telefon text NOT NULL,
  durum text NOT NULL DEFAULT 'bekliyor',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.misafir_talepler ENABLE ROW LEVEL SECURITY;

-- Allow admins to view all guest orders
CREATE POLICY "Admins can view misafir_talepler"
  ON public.misafir_talepler FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update guest orders
CREATE POLICY "Admins can update misafir_talepler"
  ON public.misafir_talepler FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Generate talep_no for guest orders
CREATE OR REPLACE FUNCTION public.generate_misafir_talep_no()
RETURNS text
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $$
  SELECT 'HMD-' || EXTRACT(YEAR FROM now())::TEXT || '-' || LPAD(
    (COALESCE((SELECT COUNT(*) FROM public.talepler), 0) + COALESCE((SELECT COUNT(*) FROM public.misafir_talepler), 0) + 1)::TEXT, 4, '0'
  )
$$;
