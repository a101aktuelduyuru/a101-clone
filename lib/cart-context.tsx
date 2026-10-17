'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number // numeric for calculations
  priceFormatted: string
  oldPrice?: string
  image: string
  size: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  favorites: string[]
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  toggleFavorite: (id: string) => void
  totalCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // LocalStorage senkronizasyonu
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('a101_cart')
      if (savedCart) setCart(JSON.parse(savedCart))
      const savedFavs = localStorage.getItem('a101_favs')
      if (savedFavs) setFavorites(JSON.parse(savedFavs))
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('a101_cart', JSON.stringify(cart))
    } catch (e) {
      console.error(e)
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('a101_favs', JSON.stringify(favorites))
    } catch (e) {
      console.error(e)
    }
  }, [favorites])

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta
            return newQ > 0 ? { ...item, quantity: newQ } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const clearCart = () => setCart([])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
