
CREATE OR REPLACE FUNCTION public.generate_talep_no()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT 'HMD-' || EXTRACT(YEAR FROM now())::TEXT || '-' || LPAD(
    (COALESCE((SELECT COUNT(*) FROM public.talepler), 0) + 1)::TEXT, 4, '0'
  )
$$;
