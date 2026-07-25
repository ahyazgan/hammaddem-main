-- İletişim mesajları tablosu
create table if not exists public.iletisim_mesajlari (
  id uuid primary key default gen_random_uuid(),
  ad_soyad text not null,
  email text not null,
  mesaj text not null,
  okundu boolean default false,
  created_at timestamptz default now()
);

alter table public.iletisim_mesajlari enable row level security;

-- Herkes insert yapabilir (public form)
create policy "Herkes mesaj gonderebilir"
  on public.iletisim_mesajlari for insert
  with check (true);

-- Sadece admin okuyabilir
create policy "Sadece admin okuyabilir"
  on public.iletisim_mesajlari for select
  using (public.has_role(auth.uid(), 'admin'));

-- Admin okundu bilgisini güncelleyebilir
create policy "Admin mesaj guncelleyebilir"
  on public.iletisim_mesajlari for update
  using (public.has_role(auth.uid(), 'admin'));

-- Taşıyıcı başvuruları tablosu
create table if not exists public.tasiyici_basvurulari (
  id uuid primary key default gen_random_uuid(),
  ad_soyad text not null,
  telefon text not null,
  arac_tipi text not null,
  plaka text not null,
  durum text default 'beklemede',
  created_at timestamptz default now()
);

alter table public.tasiyici_basvurulari enable row level security;

-- Herkes başvuru yapabilir
create policy "Herkes basvuru yapabilir"
  on public.tasiyici_basvurulari for insert
  with check (true);

-- Sadece admin okuyabilir
create policy "Sadece admin basvurulari gorebilir"
  on public.tasiyici_basvurulari for select
  using (public.has_role(auth.uid(), 'admin'));

-- Admin başvuru durumunu güncelleyebilir
create policy "Admin basvuru guncelleyebilir"
  on public.tasiyici_basvurulari for update
  using (public.has_role(auth.uid(), 'admin'));
