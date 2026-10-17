'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function HeroCarousel() {
  const [active, setActive] = useState(0)
  const count = heroSlides.length

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % count), 6000)
    return () => clearInterval(id)
  }, [count])

  const go = (dir: number) => setActive((i) => (i + dir + count) % count)

  return (
    <section aria-roledescription="carousel" aria-label="Kampanyalar" className="mx-auto max-w-7xl px-4 pt-6">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative aspect-[16/10] sm:aspect-[16/7] lg:aspect-[16/6]">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={i !== active}
              className={cn(
                'absolute inset-0 transition-opacity duration-700',
                i === active ? 'opacity-100' : 'pointer-events-none opacity-0',
              )}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                sizes="(min-width: 1280px) 1248px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
              <div className="relative flex h-full max-w-xl flex-col justify-center gap-3 p-6 sm:p-10 lg:p-14">
                <span className="w-fit rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {slide.eyebrow}
                </span>
                <h1 className="text-balance text-2xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                <p className="hidden text-pretty text-sm leading-relaxed text-muted-foreground sm:block sm:text-base">
                  {slide.description}
                </p>
                <a
                  href="#"
                  tabIndex={i === active ? 0 : -1}
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {slide.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur hover:bg-background"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            <span className="sr-only">Önceki</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur hover:bg-background"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
            <span className="sr-only">Sonraki</span>
          </button>
        </div>

        <div className="absolute bottom-6 left-6 flex gap-2 sm:left-10 lg:left-14">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === active ? 'w-8 bg-primary' : 'w-3 bg-foreground/30 hover:bg-foreground/50',
              )}
            >
              <span className="sr-only">{`${i + 1}. slayta git`}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
