import { Gift, PawPrint, Percent, ShoppingBasket, Sparkles, Truck } from 'lucide-react'

const services = [
  { id: 'kapida', label: 'A101 Kapıda', desc: 'Market kapında', icon: Truck },
  { id: 'ekstra', label: 'A101 Ekstra', desc: 'Binlerce ürün', icon: ShoppingBasket },
  { id: 'aldin-aldin', label: 'Aldın Aldın', desc: 'Haftalık fırsatlar', icon: Percent },
  { id: 'arti-tile', label: 'A101 Artı', desc: 'Kazandıran üyelik', icon: Sparkles },
  { id: 'hediye-tile', label: 'Hediye Kartı', desc: 'Sevdiklerine', icon: Gift },
  { id: 'pati-tile', label: 'A101 Pati', desc: 'Dostlarımız için', icon: PawPrint },
]

export function ServiceTiles() {
  return (
    <section aria-label="Hizmetler" className="mx-auto max-w-7xl px-4 pt-6">
      <ul className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {services.map(({ id, label, desc, icon: Icon }) => (
          <li key={id} id={id}>
            <a
              href="#"
              className="group flex h-full flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-primary/50 hover:bg-secondary"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-foreground">{label}</span>
              <span className="hidden text-xs text-muted-foreground sm:block">{desc}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
