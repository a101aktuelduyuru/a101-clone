import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function FourCampaignCards() {
  return (
    <div className="space-y-6">
      {/* Subscribe to flyers banner (from screenshot 2) */}
      <section className="mx-auto max-w-7xl px-4 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-28 shrink-0 overflow-hidden rounded-lg">
              <Image src="/images/flyer-1.png" alt="Afişler" fill className="object-cover" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800">
              Kampanyalardan haberdar olmak için afişlere abone ol.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#00a0d6] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#008dbd] transition"
          >
            Abone Ol
            <ArrowRight className="size-4" />
          </button>
        </div>
      </section>

      {/* 4 Rounded Promo Cards Grid */}
      <section id="kampanyalar" className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Card 1: A101 Artı ile Harcadıkça Kazan */}
          <div id="arti" className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#fefce8] p-6 sm:p-8 border border-yellow-100">
            <div className="max-w-[65%] space-y-2 z-10">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                A101 Artı ile Harcadıkça Kazan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kasada karekodunu okut, indirimleri ve Artı Paraları yakala! <span className="font-bold text-slate-800">1 Artı Para = 1 TL</span> değerinde.
              </p>
              <div className="pt-3">
                <a
                  href="#arti"
                  className="inline-flex items-center gap-1 rounded-full bg-[#fde047] px-4 py-2 text-xs font-bold text-slate-900 shadow-sm hover:bg-yellow-400 transition"
                >
                  Fırsatları Keşfet
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
            {/* Visual element right */}
            <div className="absolute right-4 bottom-2 size-36 sm:size-44">
              <Image src="/images/arti.png" alt="A101 Artı" fill className="object-contain" />
            </div>
          </div>

          {/* Card 2: A101 Hediye Kartı */}
          <div id="hediye-karti" className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#f0fdfa] p-6 sm:p-8 border border-teal-100">
            <div className="max-w-[65%] space-y-2 z-10">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                A101 Hediye Kartı
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A101 Hediye Kartı ile sevdiklerini ve ihtiyaç sahiplerini mutlu edebilirsin!
              </p>
              <div className="pt-3">
                <a
                  href="#hediye-karti"
                  className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-sm border border-slate-200 hover:bg-slate-50 transition"
                >
                  Hemen İncele
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
            {/* Red Gift Card Illustration */}
            <div className="absolute right-4 bottom-4 w-36 sm:w-44 h-24 sm:h-28 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 p-3 text-white shadow-lg flex flex-col justify-between">
              <span className="text-xs font-black tracking-widest">A·101</span>
              <span className="text-[10px] tracking-wider text-red-200">1412 6231 1753 1241</span>
            </div>
          </div>

          {/* Card 3: Okul Zili Çalmadan A101'e! */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#e0f7fa] p-6 sm:p-8 border border-cyan-100">
            <div className="max-w-[65%] space-y-2 z-10">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                Okul Zili Çalmadan A101’e!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Çeşit çeşit kırtasiye ürününü A101 fiyatıyla keşfet.
              </p>
              <div className="pt-3">
                <a
                  href="#okul"
                  className="inline-flex items-center gap-1 rounded-full bg-[#00a0d6] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#008dbd] transition"
                >
                  Ürünleri Keşfet
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
            <div className="absolute right-4 bottom-2 size-36 sm:size-44">
              <Image src="/images/school.png" alt="Okul Kırtasiye" fill className="object-contain" />
            </div>
          </div>

          {/* Card 4: Patili Dostuna İyi Bakmak Daha Kolay */}
          <div id="pati" className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#fdf4ff] p-6 sm:p-8 border border-purple-100">
            <div className="max-w-[65%] space-y-2 z-10">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                Patili Dostuna İyi Bakmak Daha Kolay
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mamasından bakımına, patili dostunun ihtiyaç duyduğu tüm güvenilir ürünler A101 Pati’de.
              </p>
              <div className="pt-3">
                <a
                  href="#pati"
                  className="inline-flex items-center gap-1 rounded-full bg-[#9333ea] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#7e22ce] transition"
                >
                  Ürünleri Keşfet
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
            <div className="absolute right-4 bottom-2 size-36 sm:size-44">
              <Image src="/images/pet.png" alt="A101 Pati" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
