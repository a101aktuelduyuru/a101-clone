import { SiteHeader } from '@/components/site-header'
import { HeroBanner } from '@/components/hero-banner'
import { ExactFlyersSection } from '@/components/exact-flyers-section'
import { FourCampaignCards } from '@/components/four-campaign-cards'
import { ArtiTrioSection } from '@/components/arti-trio-section'
import { UstadGurmeSection } from '@/components/ustad-gurme-section'
import { KlarSection } from '@/components/klar-section'
import { ExactFooter } from '@/components/exact-footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* 1. Header with exact dual-bar navigation */}
      <SiteHeader />

      <main className="space-y-4 pb-12">
        {/* 2. 10 TL ve Üzeri Hero Promo Banner (Lipton Demlik Poşet Çay) */}
        <HeroBanner />

        {/* 3. Güncel A101 Afişleri (6 Booklet Broşür Vitrini) */}
        <ExactFlyersSection />

        {/* 4. Abone Ol Barı + 4 Kampanya Kartı (A101 Artı, Hediye Kartı, Okul Zili, Pati) */}
        <FourCampaignCards />

        {/* 5. A101 Artı Dünyası (A101 Kapıda, A101 Ekstra, A101 Pati 3'lü Vitrin) */}
        <ArtiTrioSection />

        {/* 6. Üstad - Özenle Seçilmiş Gurme Lezzetler (Koyu Yeşil Gurme Kartları) */}
        <UstadGurmeSection />

        {/* 7. KLAR - Her Şeyden Önce Sen (Kişisel Bakım & Kozmetik Bölümü) */}
        <KlarSection />
      </main>

      {/* 8. App İndirme Banner'ı + Kurumsal Footer + TR GO Damgası */}
      <ExactFooter />
    </div>
  )
}
