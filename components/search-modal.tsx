'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search, X } from 'lucide-react'
import { gurmeProducts, herSeydenOnceSenProducts, flyers, type Product } from '@/lib/site-data'
import { useCart } from '@/lib/cart-context'

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const { addToCart } = useCart()

  const allProducts: Product[] = useMemo(() => {
    return [...gurmeProducts, ...herSeydenOnceSenProducts]
  }, [])

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allProducts.filter((p) => p.name.toLowerCase().includes(q))
  }, [query, allProducts])

  const filteredFlyers = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return flyers.filter((f) => f.title.toLowerCase().includes(q) || f.tag.toLowerCase().includes(q))
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:pt-24">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="size-5 text-muted-foreground mr-3" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="A101'de ara (örn: peynir, sucuk, sprey, aktüel)..."
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Aramak istediğiniz ürün veya kampanya adını yazın.
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Peynir', 'Sucuk', 'Sprey', 'Portakal Suyu', 'Sabun'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs hover:border-primary text-foreground"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 && filteredFlyers.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              "{query}" ile ilgili sonuç bulunamadı.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Ürünler</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {filteredProducts.map((p) => {
                      const numPrice = parseFloat(p.price.replace(',', '.')) || 0
                      return (
                        <div
                          key={p.name}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border p-2.5 hover:bg-secondary/40 transition"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                              <Image src={p.image} alt={p.name} fill className="object-cover" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                              <p className="text-xs font-bold text-primary">₺{p.price}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              addToCart({
                                id: p.name,
                                name: p.name,
                                size: p.size,
                                image: p.image,
                                price: numPrice,
                                priceFormatted: p.price,
                                oldPrice: p.oldPrice,
                              })
                              onClose()
                            }}
                            className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:opacity-90"
                          >
                            Ekle
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {filteredFlyers.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Afişler & Kampanyalar</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {filteredFlyers.map((f, i) => (
                      <div
                        key={`${f.title}-${i}`}
                        className="flex items-center gap-3 rounded-xl border border-border p-2 hover:bg-secondary/40"
                      >
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <Image src={f.image} alt={f.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{f.title}</p>
                          <p className="text-xs text-muted-foreground">{f.date} • {f.tag}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
