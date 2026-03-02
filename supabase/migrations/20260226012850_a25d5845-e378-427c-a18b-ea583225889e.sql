
-- Create talepler (requests) table
CREATE TABLE public.talepler (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  talep_no TEXT NOT NULL,
  kategori TEXT NOT NULL,
  malzeme TEXT,
  miktar NUMERIC NOT NULL DEFAULT 0,
  birim TEXT NOT NULL DEFAULT 'Ton',
  teslimat_ili TEXT,
  teslimat_tarihi DATE,
  not_text TEXT,
  durum TEXT NOT NULL DEFAULT 'bekliyor',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.talepler ENABLE ROW LEVEL SECURITY;

-- Users can only see their own requests
CREATE POLICY "Users can view own talepler" ON public.talepler
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own requests
CREATE POLICY "Users can insert own talepler" ON public.talepler
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own requests
CREATE POLICY "Users can update own talepler" ON public.talepler
  FOR UPDATE USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE TRIGGER update_talepler_updated_at
  BEFORE UPDATE ON public.talepler
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create a sequence-like function for talep_no
CREATE OR REPLACE FUNCTION public.generate_talep_no()
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
  SELECT 'HMD-' || EXTRACT(YEAR FROM now())::TEXT || '-' || LPAD(
    (COALESCE((SELECT COUNT(*) FROM public.talepler), 0) + 1)::TEXT, 4, '0'
  )
$$;
