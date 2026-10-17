import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const flyerData = [
  {
    tag: '10 TL ve Üzeri',
    tagColor: 'bg-red-500',
    title: 'Haftanın Yıldızları',
    image: '/images/flyer-1.png',
  },
  {
    tag: 'HAFTANIN YILDIZLARI',
    tagColor: 'bg-red-600',
    title: 'Haftanın Yıldızları',
    image: '/images/flyer-2.png',
  },
  {
    tag: 'TAZENİN YILDIZLARI',
    tagColor: 'bg-emerald-600',
    title: 'Tazenin Yıldızları',
    image: '/images/flyer-3.png',
  },
  {
    tag: 'ALDIN ALDIN!',
    tagColor: 'bg-amber-400 text-slate-900',
    title: 'Aldın Aldın Perşembe',
    image: '/images/flyer-1.png',
  },
  {
    tag: 'ALDIN ALDIN!',
    tagColor: 'bg-amber-400 text-slate-900',
    title: 'Aldın Aldın Ekstra',
    image: '/images/flyer-2.png',
  },
  {
    tag: 'A·101 ARTI',
    tagColor: 'bg-slate-900 text-white',
    title: 'A101 Artı Yenilendi',
    image: '/images/flyer-3.png',
  },
]

export function ExactFlyersSection() {
  return (
    <section id="afisler" className="mx-auto max-w-7xl px-4 pt-10">
      {/* Title & View All */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Güncel A101 Afişleri
        </h2>
        <a
          href="#afisler"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#00a0d6] hover:underline"
        >
          Tümünü Gör
          <ChevronRight className="size-4" />
        </a>
      </div>

      {/* Grid of 6 brochure books with badges */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {flyerData.map((item, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-[#f9fafb] p-3 text-center transition-all hover:-translate-y-1 hover:shadow-md"
          >
            {/* Top Badge */}
            <div
              className={`w-full rounded-md py-1 text-[10px] font-black uppercase tracking-tight shadow-sm ${
                item.tagColor.includes('text-') ? item.tagColor : `${item.tagColor} text-white`
              }`}
            >
              {item.tag}
            </div>

            {/* Flyer Book Thumbnail */}
            <div className="relative mt-3 aspect-[3/4] w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
