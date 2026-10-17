'use client'

import Image from 'next/image'
import { Heart, Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading } from '@/components/section-heading'
import type { Product } from '@/lib/site-data'
import { useCart } from '@/lib/cart-context'

function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, favorites } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const isFav = favorites.includes(product.name)

  const handleAdd = () => {
    // Fiyatı sayıya dönüştür (ör: '189,50' -> 189.50)
    const numericPrice = parseFloat(product.price.replace(',', '.')) || 0
    addToCart({
      id: product.name,
      name: product.name,
      size: product.size,
      image: product.image,
      price: numericPrice,
      priceFormatted: product.price,
      oldPrice: product.oldPrice,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 280px, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => toggleFavorite(product.name)}
          className={`absolute right-2 top-2 flex size-8 items-center justify-center rounded-full backdrop-blur transition-colors ${
            isFav
              ? 'bg-destructive text-white shadow-sm'
              : 'bg-background/80 text-muted-foreground hover:text-destructive'
          }`}
        >
          <Heart className={`size-4 ${isFav ? 'fill-current' : ''}`} aria-hidden="true" />
          <span className="sr-only">{`${product.name} favorilere ekle`}</span>
        </button>
        {product.oldPrice && (
          <span className="absolute left-2 top-2 rounded-full bg-destructive px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
            İndirim
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 pt-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
          {product.name} <span className="text-muted-foreground">{product.size}</span>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">{`₺${product.oldPrice}`}</span>
            )}
            <span className="text-lg font-bold text-primary">{`₺${product.price}`}</span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className={`flex size-9 items-center justify-center rounded-full transition-all ${
              justAdded
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-primary text-primary-foreground hover:opacity-90 hover:scale-105'
            }`}
          >
            {justAdded ? <Check className="size-5" /> : <Plus className="size-5" />}
            <span className="sr-only">{`${product.name} sepete ekle`}</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export function ProductSection({ id, title, products }: { id: string; title: string; products: Product[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-7xl px-4 pt-12">
      <SectionHeading id={`${id}-title`} title={title} />
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.name}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}

