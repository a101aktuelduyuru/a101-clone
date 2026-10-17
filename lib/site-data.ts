export const mainNav = [
  { label: 'A101 Kapıda', href: '#kapida', badge: 'Hızlı' },
  { label: 'A101 Ekstra', href: '#ekstra' },
  { label: 'Aldın Aldın', href: '#aldin-aldin', badge: 'Yeni' },
  { label: 'Afişler', href: '#afisler' },
  { label: 'A101 Artı', href: '#arti' },
  { label: 'Hediye Kartı', href: '#hediye-karti' },
  { label: 'A101 Pati', href: '#pati' },
  { label: 'Gurme', href: '#gurme' },
]

export const topLinks = [
  { label: 'Kurumsal', href: '#' },
  { label: 'Mağazalarımız', href: '#' },
  { label: 'Kampanyalar', href: '#' },
  { label: 'Yardım', href: '#' },
]

export const heroSlides = [
  {
    image: '/images/hero-1.png',
    eyebrow: 'A101 Kapıda',
    title: 'Market alışverişin dakikalar içinde kapında',
    description: 'Taze meyve, sebze ve günlük ihtiyaçların en uygun fiyatlarla kapına gelsin.',
    cta: 'Hemen Alışverişe Başla',
  },
  {
    image: '/images/hero-2.png',
    eyebrow: 'A101 Ekstra',
    title: 'Ev aletlerinde kaçırılmayacak fırsatlar',
    description: 'Elektronikten mutfağa binlerce ürün, taksit seçenekleriyle A101 Ekstra’da.',
    cta: 'Fırsatları Keşfet',
  },
]

export const flyers = [
  { image: '/images/flyer-1.png', date: '15 Ekim', title: 'Haftanın Yıldızları', tag: 'Bu Hafta' },
  { image: '/images/flyer-2.png', date: '16 Ekim', title: 'Aldın Aldın', tag: 'Perşembe' },
  { image: '/images/flyer-3.png', date: '18 Ekim', title: 'Hafta Sonu Fırsatları', tag: 'Cumartesi' },
  { image: '/images/flyer-1.png', date: '22 Ekim', title: 'Market Fırsatları', tag: 'Gelecek Hafta' },
  { image: '/images/flyer-2.png', date: '23 Ekim', title: 'Aldın Aldın', tag: 'Perşembe' },
  { image: '/images/flyer-3.png', date: '25 Ekim', title: 'Taze Fırsatlar', tag: 'Cumartesi' },
]

export type Product = {
  name: string
  size: string
  image: string
  price: string
  oldPrice?: string
}

export const gurmeProducts: Product[] = [
  { name: 'Gurme Tam Yağlı Beyaz Peynir', size: '500 g', image: '/images/p-peynir.png', price: '189,50', oldPrice: '219,00' },
  { name: 'Gurme Kangal Dana Sucuk', size: '250 g', image: '/images/p-sucuk.png', price: '274,90' },
  { name: 'Gurme Ayran', size: '1 L', image: '/images/p-ayran.png', price: '39,75' },
  { name: 'Gurme Organik Portakal Suyu', size: '1 L', image: '/images/p-portakal.png', price: '84,50', oldPrice: '99,00' },
]

export const herSeydenOnceSenProducts: Product[] = [
  { name: 'Her Şeyden Önce Sen Vücut Spreyi', size: '160 ml', image: '/images/p-sprey.png', price: '79,90' },
  { name: 'Her Şeyden Önce Sen Oda Spreyi', size: '500 ml', image: '/images/p-oda.png', price: '64,50', oldPrice: '74,90' },
  { name: 'Her Şeyden Önce Sen El ve Vücut Kremi', size: '250 ml', image: '/images/p-krem.png', price: '69,90' },
  { name: 'Her Şeyden Önce Sen Sıvı Sabun', size: '385 ml', image: '/images/p-sabun.png', price: '44,90' },
]

export const footerColumns = [
  {
    title: 'Kurumsal',
    links: ['Hakkımızda', 'Yatırımcı İlişkileri', 'Kariyer', 'Basın Odası', 'Sürdürülebilirlik'],
  },
  {
    title: 'Müşteri Hizmetleri',
    links: ['Sıkça Sorulan Sorular', 'İade ve Değişim', 'Sipariş Takibi', 'İletişim', 'Kişisel Verilerin Korunması'],
  },
  {
    title: 'Alışveriş',
    links: ['A101 Kapıda', 'A101 Ekstra', 'Aldın Aldın', 'Haftanın Yıldızları', 'Hediye Kartı'],
  },
  {
    title: 'Keşfet',
    links: ['A101 Artı', 'A101 Pati', 'Gurme', 'Her Şeyden Önce Sen', 'Mağaza Bul'],
  },
]
