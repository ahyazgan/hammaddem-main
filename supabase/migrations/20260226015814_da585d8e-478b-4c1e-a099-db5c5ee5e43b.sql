
ALTER TABLE public.talepler 
  ADD COLUMN IF NOT EXISTS adres text,
  ADD COLUMN IF NOT EXISTS birim text NOT NULL DEFAULT 'Ton',
  ADD COLUMN IF NOT EXISTS aciliyet text NOT NULL DEFAULT 'normal',
  ADD COLUMN IF NOT EXISTS tekrarli boolean NOT NULL DEFAULT false;
