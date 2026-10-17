'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'

// 1'den 18'e kadar sıralı görseller
const photoSlides = [
  { id: 1, src: '/photo/birinci.webp', alt: 'A101 Kampanya Slayt 1' },
  { id: 2, src: '/photo/ikinci.webp', alt: 'A101 Kampanya Slayt 2' },
  { id: 3, src: '/photo/ucuncu.webp', alt: 'A101 Kampanya Slayt 3' },
  { id: 4, src: '/photo/dorduncu.webp', alt: 'A101 Kampanya Slayt 4' },
  { id: 5, src: '/photo/besinci.webp', alt: 'A101 Kampanya Slayt 5' },
  { id: 6, src: '/photo/altinci.webp', alt: 'A101 Kampanya Slayt 6' },
  { id: 7, src: '/photo/yedinci.webp', alt: 'A101 Kampanya Slayt 7' },
  { id: 8, src: '/photo/sekzinci.webp', alt: 'A101 Kampanya Slayt 8' },
  { id: 9, src: '/photo/dokuzuncu.webp', alt: 'A101 Kampanya Slayt 9' },
  { id: 10, src: '/photo/onuncu.webp', alt: 'A101 Kampanya Slayt 10' },
  { id: 11, src: '/photo/onbirinci.webp', alt: 'A101 Kampanya Slayt 11' },
  { id: 12, src: '/photo/onikinci.webp', alt: 'A101 Kampanya Slayt 12' },
  { id: 13, src: '/photo/onucuncu.webp', alt: 'A101 Kampanya Slayt 13' },
  { id: 14, src: '/photo/ondorduncu.webp', alt: 'A101 Kampanya Slayt 14' },
  { id: 15, src: '/photo/onbesinci.webp', alt: 'A101 Kampanya Slayt 15' },
  { id: 16, src: '/photo/onaltinci.webp', alt: 'A101 Kampanya Slayt 16' },
  { id: 17, src: '/photo/onyedinci.webp', alt: 'A101 Kampanya Slayt 17' },
  { id: 18, src: '/photo/onsekizinci.webp', alt: 'A101 Kampanya Slayt 18' },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const total = photoSlides.length

  // Otomatik geçiş ve durdurma mantığı
  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 5000)

    return () => clearInterval(timer)
  }, [isPlaying, total])

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total)
  }

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  return (
    <section aria-label="Ana Kampanya Afişleri" className="mx-auto max-w-7xl px-4 pt-3 sm:pt-5">
      <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        {/* Slider Görsel Alanı */}
        <div className="relative w-full aspect-[16/6] sm:aspect-[16/5.2] md:aspect-[16/4.8]">
          {photoSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === current ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover w-full h-full"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          ))}

          {/* Orijinal A101 Alt Kontrol Çubuğu (Görseldeki gibi: [ < ] [ 1/18 ] [ || / > ] [ > ]) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {/* Sol Ok Butonu (Daire) */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Önceki afiş"
              className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md border border-white/40 shadow-sm transition-all hover:bg-white/50 active:scale-95"
            >
              <ArrowLeft className="size-3.5 sm:size-4 stroke-[2.5]" />
            </button>

            {/* Sayfa Sayacı Rozeti: [ 1/18 ] */}
            <div className="flex h-7 sm:h-8 items-center justify-center rounded-full bg-white/30 px-3 text-xs sm:text-sm font-bold text-white backdrop-blur-md border border-white/40 shadow-sm select-none">
              <span>{current + 1}</span>
              <span className="mx-0.5 text-white/70">/</span>
              <span>{total}</span>
            </div>

            {/* Oynat / Durdur Butonu (Daire) */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Slaytı durdur' : 'Slaytı başlat'}
              className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md border border-white/40 shadow-sm transition-all hover:bg-white/50 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="size-3.5 sm:size-4 fill-white" />
              ) : (
                <Play className="size-3.5 sm:size-4 fill-white translate-x-0.5" />
              )}
            </button>

            {/* Sağ Ok Butonu (Daire) */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Sonraki afiş"
              className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md border border-white/40 shadow-sm transition-all hover:bg-white/50 active:scale-95"
            >
              <ArrowRight className="size-3.5 sm:size-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
