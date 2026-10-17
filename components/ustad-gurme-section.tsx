'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

const ustadProducts = [
  {
    name: 'Tam Yağlı Olgunlaştırılmış Beyaz Peynir',
    size: '500 G',
    image: '/images/p-peynir.png',
    price: 189.50,
    priceFormatted: '189,50',
  },
  {
    name: 'Dana Kangal Sucuk',
    size: '400 G',
    image: '/images/p-sucuk.png',
    price: 274.90,
    priceFormatted: '274,90',
  },
  {
    name: 'Kara Maya Tam Yağlı Ayran',
    size: '1 L',
    image: '/images/p-ayran.png',
    price: 39.75,
    priceFormatted: '39,75',
  },
  {
    name: 'Organik %100 Portakal Suyu',
    size: '1 L',
    image: '/images/p-portakal.png',
    price: 84.50,
    priceFormatted: '84,50',
  },
]

export function UstadGurmeSection() {
  const { addToCart } = useCart()

  return (
    <section id="gurme" className="mx-auto max-w-7xl px-4 pt-10">
      <div className="relative overflow-hidden rounded-3xl bg-[#172422] p-6 sm:p-10 text-white shadow-lg">
        {/* Header with Üstad Brand */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-emerald-900/60 pb-6">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-2xl font-bold tracking-wider text-amber-200">
              Üstad
            </span>
          </div>
          <div className="sm:border-l sm:border-emerald-800/60 sm:pl-4">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Özenle Seçilmiş Gurme Lezzetler
            </h3>
            <p className="text-xs sm:text-sm text-emerald-300">
              Sadece A101'lerde ve A101 Kapıda'da.
            </p>
          </div>
        </div>

        {/* Products Grid & Chef Persona */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
          {/* 4 Products */}
          {ustadProducts.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col justify-between rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-emerald-800/40 hover:bg-white/15 transition"
            >
              <div>
                <p className="text-xs font-semibold text-slate-100 line-clamp-2 leading-tight">
                  {p.name}
                </p>
                <span className="text-[10px] text-emerald-300 font-bold tracking-wider block mt-1">
                  {p.size}
                </span>
              </div>

              <div className="my-3 relative h-32 w-full flex items-center justify-center">
                <Image src={p.image} alt={p.name} fill className="object-contain transition-transform group-hover:scale-105" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-800/50">
                <span className="text-base font-extrabold text-amber-300">
                  ₺{p.priceFormatted}
                </span>
                <button
                  type="button"
                  onClick={() => addToCart({
                    id: p.name,
                    name: p.name,
                    size: p.size,
                    image: p.image,
                    price: p.price,
                    priceFormatted: p.priceFormatted,
                  })}
                  className="flex size-8 items-center justify-center rounded-full bg-[#00a0d6] text-white hover:bg-[#008dbd] transition"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Chef Badge element (Right side of screenshot 3) */}
          <div className="hidden lg:flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-emerald-950 to-[#0e1716] p-4 text-center border border-emerald-800/40">
            <div className="relative size-24 rounded-full overflow-hidden border-2 border-amber-300/60 shadow-md">
              <Image src="/placeholder-user.jpg" alt="Üstad Şef" fill className="object-cover" />
            </div>
            <p className="mt-3 font-serif italic text-base font-bold text-amber-200">
              Üstad Lezzetleri
            </p>
            <p className="mt-1 text-[11px] text-emerald-300/80">
              Usta ellerin geleneksel reçeteleri sofranızda.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
