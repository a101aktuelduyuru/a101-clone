'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Lock, Mail, ShieldAlert } from 'lucide-react'
import { A101Logo } from '@/components/a101-logo'
import { supabase } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!supabase) {
      setErrorMsg('Supabase bağlantısı henüz yapılandırılmamış.')
      return
    }

    setLoading(true)

    try {
      if (isSignUp) {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error

        if (data.user && data.user.identities && data.user.identities.length === 0) {
          setErrorMsg('Bu e-posta adresi ile zaten bir hesap bulunuyor.')
        } else {
          setSuccessMsg('Kayıt başarılı! Giriş yapabilirsiniz.')
          setIsSignUp(false)
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error

        router.push('/')
        router.refresh()
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'İşlem sırasında bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-secondary/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <A101Logo />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-2xl font-extrabold text-foreground sm:text-3xl">
          {isSignUp ? 'A101 Hesabı Oluştur' : 'A101’e Giriş Yap'}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {isSignUp ? 'Zaten hesabınız var mı?' : 'Henüz hesabınız yok mu?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setErrorMsg(null)
              setSuccessMsg(null)
            }}
            className="font-semibold text-primary hover:underline focus:outline-none"
          >
            {isSignUp ? 'Giriş Yap' : 'Hemen Kayıt Ol'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {errorMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <ShieldAlert className="size-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-600">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleAuth}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                E-posta Adresi
              </label>
              <div className="relative mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@a101.com.tr"
                  className="block w-full rounded-xl border border-input bg-background px-3 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                <Mail className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Şifre
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-input bg-background px-3 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                <Lock className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Lütfen bekleyin...' : isSignUp ? 'Hesap Oluştur' : 'Giriş Yap'}
            </button>
          </form>

          <div className="mt-6 border-t border-border pt-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
