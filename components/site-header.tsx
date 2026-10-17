'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LogOut, MapPin, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { A101Logo } from '@/components/a101-logo'
import { supabase } from '@/lib/supabase/client'
import { useCart } from '@/lib/cart-context'
import { SearchModal } from '@/components/search-modal'
import { AuthModal } from '@/components/auth-modal'

function HeaderAuth({ onOpenAuth }: { onOpenAuth: () => void }) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // LocalStorage veya Supabase oturumunu kontrol et
    try {
      const localU = localStorage.getItem('a101_user')
      if (localU) {
        setUser(JSON.parse(localU))
      }
    } catch (e) {}

    if (!supabase) return

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUser(session.user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(session.user)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('a101_user')
    } catch (e) {}

    if (supabase) {
      await supabase.auth.signOut()
    }
    setUser(null)
  }

  if (user) {
    const displayName = user.username || user.phone || (user.email ? user.email.split('@')[0] : 'Hesabım')
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
          <User className="size-3.5 text-[#00a0d6]" />
          <span className="max-w-[120px] truncate">{displayName}</span>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          title="Çıkış Yap"
          className="flex size-9 items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
        >
          <LogOut className="size-4" />
          <span className="sr-only">Çıkış Yap</span>
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onOpenAuth}
      className="inline-flex h-10 items-center gap-2 rounded-full bg-[#f1f3f7] px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
    >
      <span>Giriş Yap</span>
      <User className="size-4 text-slate-500" />
    </button>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { totalCount, setIsCartOpen } = useCart()

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        {/* Row 1: Logo, Search, A101 Artı, Giriş Yap, Sepetim */}
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-5">
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link href="/" className="shrink-0" aria-label="A101 ana sayfa">
            <A101Logo />
          </Link>

          {/* Search Box */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSearchOpen(true)}
            onKeyDown={(e) => e.key === 'Enter' && setSearchOpen(true)}
            className="relative hidden flex-1 cursor-pointer md:block"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              readOnly
              placeholder="A101 İçerisinde Ara"
              className="h-11 w-full cursor-pointer rounded-full border border-slate-200 bg-[#f9fafb] pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#00a0d6] focus:outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-3 md:ml-0">
            {/* A101 Artı Logo Pill */}
            <a
              href="#arti"
              className="hidden lg:flex items-center gap-1.5 px-2 py-1 text-xs font-bold text-slate-800 hover:opacity-80"
            >
              <div className="flex flex-col text-right leading-none">
                <span className="text-[10px] text-[#00a0d6] font-black">A·101</span>
                <span className="text-xs font-black tracking-wide text-slate-900">ARTI</span>
              </div>
            </a>

            {/* Giriş Yap */}
            <HeaderAuth onOpenAuth={() => setAuthOpen(true)} />

            {/* Sepetim */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex h-10 items-center gap-2 rounded-full bg-[#f1f3f7] px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              <span>Sepetlerim</span>
              <ShoppingBag className="size-4 text-slate-500" />
              {totalCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-[#00a0d6] text-[10px] font-bold text-white">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="px-4 pb-2.5 md:hidden">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSearchOpen(true)}
            className="relative cursor-pointer"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              readOnly
              placeholder="A101 İçerisinde Ara"
              className="h-10 w-full cursor-pointer rounded-full border border-slate-200 bg-[#f9fafb] pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Row 2: Service Models (Kapıda, Ekstra, Pati) & Right quick tabs (Afişler, Kampanyalar, Hediye Kartı) */}
        <div className="border-t border-slate-100 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
            {/* Left 3 pill brands */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
              <a
                href="#kapida"
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition"
              >
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] font-black text-[#00a0d6]">A·101</span>
                  <span className="text-xs font-extrabold text-emerald-600 tracking-tight">kapıda</span>
                </div>
              </a>

              <a
                href="#ekstra"
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-blue-50 transition"
              >
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] font-black text-[#00a0d6]">A·101</span>
                  <span className="text-xs font-black text-blue-700 tracking-wider">EKSTRA</span>
                </div>
              </a>

              <a
                href="#pati"
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-purple-50 transition"
              >
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] font-black text-[#00a0d6]">A·101</span>
                  <span className="text-xs font-black text-purple-700 tracking-wider">PATİ</span>
                </div>
              </a>
            </div>

            {/* Right category pills */}
            <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-700">
              <a
                href="#afisler"
                className="rounded-full border border-[#00a0d6] bg-cyan-50/50 px-3.5 py-1 text-xs font-semibold text-[#00a0d6] hover:bg-[#00a0d6] hover:text-white transition"
              >
                Afişler
              </a>
              <a href="#kampanyalar" className="hover:text-[#00a0d6] transition">
                Kampanyalar
              </a>
              <a href="#hediye-karti" className="hover:text-[#00a0d6] transition">
                Hediye Kartı
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="border-t border-slate-100 bg-white md:hidden p-4">
            <ul className="flex flex-col gap-2 text-sm font-semibold text-slate-800">
              <li><a href="#afisler" onClick={() => setMenuOpen(false)} className="block py-2">Afişler</a></li>
              <li><a href="#kampanyalar" onClick={() => setMenuOpen(false)} className="block py-2">Kampanyalar</a></li>
              <li><a href="#hediye-karti" onClick={() => setMenuOpen(false)} className="block py-2">Hediye Kartı</a></li>
              <li><a href="#arti" onClick={() => setMenuOpen(false)} className="block py-2">A101 Artı</a></li>
              <li><a href="#gurme" onClick={() => setMenuOpen(false)} className="block py-2">Üstad Gurme Lezzetler</a></li>
              <li><a href="#hsos" onClick={() => setMenuOpen(false)} className="block py-2">Klar Kişisel Bakım</a></li>
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
