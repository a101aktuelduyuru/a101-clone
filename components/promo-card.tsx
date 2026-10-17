import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function PromoCard({
  id,
  eyebrow,
  title,
  description,
  cta,
  image,
  imageAlt,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
  cta: string
  image: string
  imageAlt: string
}) {
  return (
    <article
      id={id}
      className="group relative flex min-h-64 overflow-hidden rounded-2xl border border-border bg-card"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover object-right transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
      <div className="relative flex max-w-sm flex-col justify-center gap-2 p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
        <h3 className="text-balance text-2xl font-extrabold text-foreground">{title}</h3>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{description}</p>
        <a
          href="#"
          className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-primary/50 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {cta}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
