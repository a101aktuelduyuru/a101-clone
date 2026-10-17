'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { flyers as defaultFlyers } from '@/lib/site-data'
import type { FlyerItem } from '@/lib/supabase/services'

export function FlyersSection({ flyers = defaultFlyers }: { flyers?: FlyerItem[] }) {
  const trackRef = useRef<HTMLUListElement>(null)

  const scroll = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section id="afisler" aria-labelledby="afisler-title" className="mx-auto max-w-7xl px-4 pt-12">
      <SectionHeading id="afisler-title" title="Afişler">
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="flex size-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            <span className="sr-only">Önceki afişler</span>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="flex size-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
            <span className="sr-only">Sonraki afişler</span>
          </button>
        </div>
      </SectionHeading>

      <ul
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
      >
        {flyers.map((flyer, i) => (
          <li key={`${flyer.date}-${i}`} className="w-[46%] shrink-0 snap-start sm:w-[30%] lg:w-[18.5%]">
            <a href="#" className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-card">
                <Image
                  src={flyer.image}
                  alt={`${flyer.date} ${flyer.title} afişi`}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 46vw"
                  className="object-cover brightness-90 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-100"
                />
                <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
                  {flyer.tag}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">{flyer.date}</p>
              <p className="text-xs text-muted-foreground">{flyer.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
