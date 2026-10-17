import Image from 'next/image'
import { Smartphone } from 'lucide-react'

const stores = [
  { label: 'App Store', sub: "'dan indirin" },
  { label: 'Google Play', sub: "'den alın" },
  { label: 'AppGallery', sub: "'de keşfedin" },
]

export function AppDownload() {
  return (
    <section aria-labelledby="app-title" className="mx-auto max-w-7xl px-4 pt-12">
      <div className="relative grid overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-card to-card md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Smartphone className="size-5" aria-hidden="true" />
          </span>
          <h2 id="app-title" className="text-balance text-2xl font-extrabold text-foreground sm:text-3xl">
            {"A101 uygulamasını indir, fırsatları cebinde taşı"}
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {"Haftalık afişler, A101 Artı avantajları ve hızlı teslimat tek uygulamada."}
          </p>
          <ul className="flex flex-wrap gap-3 pt-2">
            {stores.map((store) => (
              <li key={store.label}>
                <a
                  href="#"
                  className="flex flex-col rounded-lg border border-border bg-background px-4 py-2 leading-tight transition-colors hover:border-primary/50"
                >
                  <span className="text-[10px] text-muted-foreground">{store.label + store.sub}</span>
                  <span className="text-sm font-semibold text-foreground">{store.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-64">
          <Image
            src="/images/app.png"
            alt="A101 mobil uygulama ekranları"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
