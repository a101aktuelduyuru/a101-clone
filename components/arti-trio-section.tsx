import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function ArtiTrioSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10">
      {/* Background container with subtle yellow/cyan gradient */}
      <div className="rounded-3xl bg-gradient-to-b from-[#fefce8] via-[#f0fdfa] to-white p-6 sm:p-10 border border-yellow-100/80 shadow-sm text-center">
        {/* Header A101 Artı */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 font-black text-slate-900">
            <span className="text-[#00a0d6] text-2xl font-black">A·101</span>
            <span className="text-2xl font-black tracking-wide">ARTI</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-500">
            A101 Dünyasında Artı Para Fırsatlarını Yakala.
          </p>
        </div>

        {/* 3 Interactive Service Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {/* Card 1: A101 Kapıda */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition text-left">
            <div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-black text-[#00a0d6]">A·101</span>
                <span className="text-base font-extrabold text-emerald-600">kapıda</span>
              </div>
              <p className="mt-4 text-xs text-slate-500 leading-snug">
                Sen listeni hazırla. <br />
                <span className="font-semibold text-slate-700">Gerisi A101 fiyatıyla kapıda.</span>
              </p>
            </div>
            <div className="my-4 relative h-28 w-full flex items-center justify-center">
              <Image src="/images/p-peynir.png" alt="Kapıda Sepet" fill className="object-contain" />
            </div>
            <a
              href="#kapida"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-2.5 px-4 text-xs font-bold text-white hover:bg-emerald-700 transition"
            >
              Alışverişe Başla
              <ArrowRight className="size-3.5" />
            </a>
          </div>

          {/* Card 2: A101 Ekstra */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition text-left">
            <div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-black text-[#00a0d6]">A·101</span>
                <span className="text-base font-black text-blue-700">EKSTRA</span>
              </div>
              <p className="mt-4 text-xs text-slate-500 leading-snug">
                A101’den beklediğin fiyat. <br />
                <span className="font-semibold text-slate-700">Beklemediğin ürünler.</span>
              </p>
            </div>
            <div className="my-4 relative h-28 w-full flex items-center justify-center">
              <Image src="/images/p-kettle.png" alt="Ekstra Ürünler" fill className="object-contain" />
            </div>
            <a
              href="#ekstra"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-900 py-2.5 px-4 text-xs font-bold text-white hover:bg-blue-950 transition"
            >
              Alışverişe Başla
              <ArrowRight className="size-3.5" />
            </a>
          </div>

          {/* Card 3: A101 Pati */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition text-left">
            <div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-black text-[#00a0d6]">A·101</span>
                <span className="text-base font-black text-purple-700">PATİ</span>
              </div>
              <p className="mt-4 text-xs text-slate-500 leading-snug">
                Patili dostuna iyi bakmak, <br />
                <span className="font-semibold text-slate-700">A101 fiyatıyla daha kolay.</span>
              </p>
            </div>
            <div className="my-4 relative h-28 w-full flex items-center justify-center">
              <Image src="/images/p-mama.png" alt="Pati Ürünler" fill className="object-contain" />
            </div>
            <a
              href="#pati"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-purple-700 py-2.5 px-4 text-xs font-bold text-white hover:bg-purple-800 transition"
            >
              Alışverişe Başla
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
