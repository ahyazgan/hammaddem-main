
-- Create bildirimler (notifications) table
CREATE TABLE public.bildirimler (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  baslik TEXT NOT NULL,
  mesaj TEXT NOT NULL,
  tip TEXT NOT NULL DEFAULT 'bilgi',
  okundu BOOLEAN NOT NULL DEFAULT false,
  talep_id UUID REFERENCES public.talepler(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bildirimler ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bildirimler" ON public.bildirimler
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own bildirimler" ON public.bildirimler
  FOR UPDATE USING (auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.bildirimler;

-- Trigger: auto-create notification when talep is created
CREATE OR REPLACE FUNCTION public.notify_talep_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.bildirimler (user_id, baslik, mesaj, tip, talep_id)
  VALUES (
    NEW.user_id,
    'Talep Oluşturuldu',
    'Talebiniz #' || NEW.talep_no || ' başarıyla alındı. 48 saat içinde teklif hazırlanacak.',
    'talep',
    NEW.id
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_talep_created
  AFTER INSERT ON public.talepler
  FOR EACH ROW EXECUTE FUNCTION public.notify_talep_created();

-- Trigger: auto-create notification when talep status changes
CREATE OR REPLACE FUNCTION public.notify_talep_durum_degisti()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  durum_mesaj TEXT;
BEGIN
  IF OLD.durum = NEW.durum THEN
    RETURN NEW;
  END IF;

  CASE NEW.durum
    WHEN 'teklif' THEN durum_mesaj := 'Talebiniz #' || NEW.talep_no || ' için teklif hazırlandı.';
    WHEN 'onaylandi' THEN durum_mesaj := '#' || NEW.talep_no || ' numaralı siparişiniz onaylandı.';
    WHEN 'yolda' THEN durum_mesaj := '#' || NEW.talep_no || ' numaralı siparişiniz yola çıktı.';
    WHEN 'teslim' THEN durum_mesaj := '#' || NEW.talep_no || ' numaralı siparişiniz teslim edildi.';
    ELSE durum_mesaj := '#' || NEW.talep_no || ' durumu güncellendi: ' || NEW.durum;
  END CASE;

  INSERT INTO public.bildirimler (user_id, baslik, mesaj, tip, talep_id)
  VALUES (
    NEW.user_id,
    CASE NEW.durum
      WHEN 'teklif' THEN 'Yeni Teklif'
      WHEN 'onaylandi' THEN 'Sipariş Onaylandı'
      WHEN 'yolda' THEN 'Sipariş Yolda'
      WHEN 'teslim' THEN 'Teslim Edildi'
      ELSE 'Durum Güncellendi'
    END,
    durum_mesaj,
    CASE NEW.durum
      WHEN 'teklif' THEN 'teklif'
      WHEN 'teslim' THEN 'teslim'
      ELSE 'durum'
    END,
    NEW.id
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_talep_durum_change
  AFTER UPDATE ON public.talepler
  FOR EACH ROW EXECUTE FUNCTION public.notify_talep_durum_degisti();
