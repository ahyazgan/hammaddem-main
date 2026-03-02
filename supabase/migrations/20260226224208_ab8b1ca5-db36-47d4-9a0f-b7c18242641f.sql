-- Allow admins to view all user_roles
CREATE POLICY "Admins can view all user_roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update user_roles
CREATE POLICY "Admins can update user_roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow anonymous inserts to misafir_talepler (for guest orders)
CREATE POLICY "Anyone can insert misafir_talepler"
ON public.misafir_talepler
FOR INSERT
TO anon, authenticated
WITH CHECK (true);