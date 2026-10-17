'use client'

import Image from 'next/image'
import { Plus, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

const klarProducts = [
  {
    brand: 'KLAR',
    name: 'Vücut Spreyi',
    size: '160 ml',
    image: '/images/p-sprey.png',
    price: 79.90,
    priceFormatted: '79,90',
  },
  {
    brand: 'KLAR',
    name: 'Oda Spreyi',
    size: '500 ml',
    image: '/images/p-oda.png',
    price: 64.50,
    priceFormatted: '64,50',
  },
  {
    brand: 'KLAR',
    name: 'El ve Vücut Kremi',
    size: '250 ml',
    image: '/images/p-krem.png',
    price: 69.90,
    priceFormatted: '69,90',
  },
  {
    brand: 'KLAR',
    name: 'Sıvı Sabun',
    size: '385 ml',
    image: '/images/p-sabun.png',
    price: 44.90,
    priceFormatted: '44,90',
  },
]

export function KlarSection() {
  const { addToCart } = useCart()

  return (
    <section id="hsos" className="mx-auto max-w-7xl px-4 pt-10">
      <div className="relative overflow-hidden rounded-3xl bg-[#4a475a] p-6 sm:p-10 text-white shadow-lg">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-extrabold tracking-widest text-white">
              KLAR
            </span>
            <div className="border-l border-white/20 pl-4">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Her Şeyden Önce Sen.
              </h3>
              <p className="text-xs sm:text-sm text-purple-200">
                Sadece A101'lerde ve A101 Kapıda'da.
              </p>
            </div>
          </div>
          <a
            href="#hsos"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition w-fit"
          >
            Ürünleri İncele
            <ArrowRight className="size-3.5" />
          </a>
        </div>

        {/* Products Grid & Model Persona from screenshot 4 */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
          {/* 4 Products */}
          {klarProducts.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col justify-between rounded-2xl bg-white p-4 text-slate-800 shadow-sm transition hover:shadow-md"
            >
              <div className="text-center">
                <span className="text-xs font-black tracking-widest text-slate-400 block">
                  {p.brand}
                </span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">
                  {p.name}
                </p>
              </div>

              <div className="my-3 relative h-32 w-full flex items-center justify-center">
                <Image src={p.image} alt={p.name} fill className="object-contain transition-transform group-hover:scale-105" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">{p.size}</span>
                  <span className="text-sm font-extrabold text-slate-900">₺{p.priceFormatted}</span>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart({
                    id: p.name,
                    name: `KLAR ${p.name}`,
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

          {/* Persona Model element (Right side of screenshot 4) */}
          <div className="hidden lg:flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#5c5870] to-[#3a3746] p-4 text-center border border-white/10">
            <div className="relative size-24 rounded-full overflow-hidden border-2 border-purple-200 shadow-md">
              <Image src="/placeholder-user.jpg" alt="KLAR Model" fill className="object-cover" />
            </div>
            <p className="mt-3 text-sm font-bold text-white">
              Doğal Bakım
            </p>
            <p className="mt-1 text-[11px] text-purple-200/80">
              Cildinize hak ettiği tazeliği ve ferahlığı sunun.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
