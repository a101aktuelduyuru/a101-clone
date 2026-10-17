-- Supabase SQL Schema for A101 Clone

-- 1. Ürünler Tablosu
CREATE TABLE IF NOT EXISTS public.products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    size TEXT NOT NULL,
    category TEXT NOT NULL, -- 'gurme' veya 'hsos'
    price TEXT NOT NULL,
    old_price TEXT,
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Afişler Tablosu
CREATE TABLE IF NOT EXISTS public.flyers (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    tag TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Açma ve Herkese Okuma İzni Verme
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flyers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access for products" 
ON public.products FOR SELECT USING (true);

CREATE POLICY "Allow public read-only access for flyers" 
ON public.flyers FOR SELECT USING (true);

-- Örnek Başlangıç Verileri (Seed Data)
INSERT INTO public.products (name, size, category, price, old_price, image) VALUES
('Gurme Tam Yağlı Beyaz Peynir', '500 g', 'gurme', '189,50', '219,00', '/images/p-peynir.png'),
('Gurme Kangal Dana Sucuk', '250 g', 'gurme', '274,90', NULL, '/images/p-sucuk.png'),
('Gurme Ayran', '1 L', 'gurme', '39,75', NULL, '/images/p-ayran.png'),
('Gurme Organik Portakal Suyu', '1 L', 'gurme', '84,50', '99,00', '/images/p-portakal.png'),
('Her Şeyden Önce Sen Vücut Spreyi', '160 ml', 'hsos', '79,90', NULL, '/images/p-sprey.png'),
('Her Şeyden Önce Sen Oda Spreyi', '500 ml', 'hsos', '64,50', '74,90', '/images/p-oda.png'),
('Her Şeyden Önce Sen El ve Vücut Kremi', '250 ml', 'hsos', '69,90', NULL, '/images/p-krem.png'),
('Her Şeyden Önce Sen Sıvı Sabun', '385 ml', 'hsos', '44,90', NULL, '/images/p-sabun.png');

INSERT INTO public.flyers (title, date, tag, image) VALUES
('Haftanın Yıldızları', '15 Ekim', 'Bu Hafta', '/images/flyer-1.png'),
('Aldın Aldın', '16 Ekim', 'Perşembe', '/images/flyer-2.png'),
('Hafta Sonu Fırsatları', '18 Ekim', 'Cumartesi', '/images/flyer-3.png'),
('Market Fırsatları', '22 Ekim', 'Gelecek Hafta', '/images/flyer-1.png'),
('Aldın Aldın', '23 Ekim', 'Perşembe', '/images/flyer-2.png'),
('Taze Fırsatlar', '25 Ekim', 'Cumartesi', '/images/flyer-3.png');

-- 3. Kullanıcı Kayıt / Leads Tablosu (Doğrudan tabloya kayıt için)
CREATE TABLE IF NOT EXISTS public.user_leads (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for user_leads" 
ON public.user_leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read for user_leads" 
ON public.user_leads FOR SELECT USING (true);

