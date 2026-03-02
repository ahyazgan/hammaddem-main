
-- Admins can view ALL talepler
CREATE POLICY "Admins can view all talepler"
ON public.talepler
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update ALL talepler (durum changes etc.)
CREATE POLICY "Admins can update all talepler"
ON public.talepler
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can view ALL bildirimler
CREATE POLICY "Admins can view all bildirimler"
ON public.bildirimler
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert bildirimler (for sending offers/notifications)
CREATE POLICY "Admins can insert bildirimler"
ON public.bildirimler
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can view all profiles (to see firma names)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
