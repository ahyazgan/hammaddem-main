
-- Create a sequence for talep numbering
CREATE SEQUENCE IF NOT EXISTS public.talep_no_seq START WITH 1;

-- Set sequence to current max count so existing numbers aren't reused
SELECT setval('public.talep_no_seq',
  GREATEST(
    (SELECT COUNT(*) FROM public.talepler) + (SELECT COUNT(*) FROM public.misafir_talepler) + 1,
    1
  )
);

-- Replace generate_talep_no to use sequence
CREATE OR REPLACE FUNCTION public.generate_talep_no()
 RETURNS text
 LANGUAGE sql
 VOLATILE
 SET search_path TO 'public'
AS $function$
  SELECT 'HMD-' || EXTRACT(YEAR FROM now())::TEXT || '-' || LPAD(nextval('public.talep_no_seq')::TEXT, 4, '0')
$function$;

-- Replace generate_misafir_talep_no to use same sequence
CREATE OR REPLACE FUNCTION public.generate_misafir_talep_no()
 RETURNS text
 LANGUAGE sql
 VOLATILE
 SET search_path TO 'public'
AS $function$
  SELECT 'HMD-' || EXTRACT(YEAR FROM now())::TEXT || '-' || LPAD(nextval('public.talep_no_seq')::TEXT, 4, '0')
$function$;
