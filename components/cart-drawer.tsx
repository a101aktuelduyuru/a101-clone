'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalCount } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-border bg-card shadow-2xl">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Sepetim ({totalCount})</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-5" />
                <span className="sr-only">Kapat</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                    <ShoppingBag className="size-8" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">Sepetiniz Boş</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A101 fırsatlarını keşfedip sepete hemen ürün ekleyebilirsiniz.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Alışverişe Devam Et
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-4 py-4">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium text-foreground line-clamp-2">{item.name}</h4>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                              <span className="sr-only">Kaldır</span>
                            </button>
                          </div>
                          <span className="text-xs text-muted-foreground">{item.size}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-bold text-primary">₺{item.priceFormatted}</span>
                          <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-2 py-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="text-xs font-semibold text-foreground min-w-[1.25rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-border bg-secondary/40 p-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Ara Toplam</span>
                    <span>₺{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-emerald-600 font-medium">
                    <span>Kargo / Teslimat</span>
                    <span>Bedava</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                    <span>Toplam Tutar</span>
                    <span className="text-primary text-xl">₺{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  href="/login"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 shadow-md transition"
                >
                  Siparişi Tamamla
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
