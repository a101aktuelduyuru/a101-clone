import { Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { A101Logo } from '@/components/a101-logo'
import { footerColumns } from '@/lib/site-data'

const perks = [
  { icon: Truck, title: 'Hızlı Teslimat', desc: 'A101 Kapıda ile dakikalar içinde' },
  { icon: RotateCcw, title: 'Kolay İade', desc: 'Mağazadan veya kargo ile' },
  { icon: ShieldCheck, title: 'Güvenli Ödeme', desc: '256-bit SSL koruması' },
  { icon: Headphones, title: '0850 808 00 00', desc: 'Müşteri hizmetleri' },
]

const socials = ['Instagram', 'X', 'Facebook', 'YouTube', 'LinkedIn']

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="grid grid-cols-2 gap-6 border-b border-border py-8 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="grid gap-10 py-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-4">
            <A101Logo className="w-fit" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {"Kaliteli ürünleri uygun fiyatlarla, her gün herkese ulaştırıyoruz."}
            </p>
            <ul className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="inline-block rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-3 text-sm font-semibold text-foreground">{col.title}</h2>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
          <p>{'© 2026 A101 Yeni Mağazacılık A.Ş. Tüm hakları saklıdır.'}</p>
          <p>{'Bu sayfa koyu temalı bir tasarım klonudur.'}</p>
        </div>
      </div>
    </footer>
  )
}
