'use client'

import { useState } from 'react'
import { ArrowRight, AlertCircle, Mail, Phone, ShieldAlert, X } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  // authMethod: 'phone' veya 'email'
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone')

  // Telefon State'leri
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')

  // E-posta & Kullanıcı Adı (Takma Ad) State'leri
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  // Durum State'leri
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [attemptCount, setAttemptCount] = useState(0)

  if (!isOpen) return null

  // Telefon formatlama: 5XX XXX XX XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.startsWith('0')) val = val.substring(1)
    if (val.length > 10) val = val.substring(0, 10)
    setPhone(val)
  }

  const formatPhoneDisplay = (val: string) => {
    if (!val) return ''
    const p1 = val.substring(0, 3)
    const p2 = val.substring(3, 6)
    const p3 = val.substring(6, 8)
    const p4 = val.substring(8, 10)

    let formatted = p1
    if (p2) formatted += ' ' + p2
    if (p3) formatted += ' ' + p3
    if (p4) formatted += ' ' + p4
    return formatted
  }

  // 1. Telefon ile OTP Gönderme
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (phone.length < 10 || !phone.startsWith('5')) {
      setErrorMsg('Lütfen 5 ile başlayan 10 haneli geçerli bir telefon numarası girin.')
      return
    }

    setLoading(true)
    try {
      if (supabase) {
        await supabase.auth.signInWithOtp({
          phone: `+90${phone}`,
        })
      }
      setSuccessMsg('Doğrulama kodu gönderildi.')
      setStep('otp')
    } catch (err: any) {
      setErrorMsg(err.message || 'Kod gönderilemedi.')
    } finally {
      setLoading(false)
    }
  }

  // 2. Telefon OTP Doğrulama
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    try {
      if (supabase) {
        const { error } = await supabase.auth.verifyOtp({
          phone: `+90${phone}`,
          token: otp,
          type: 'sms',
        })
        if (error) throw error
      }
      if (onSuccess) onSuccess()
      onClose()
      window.location.reload()
    } catch (err: any) {
      setErrorMsg(err.message || 'Kod doğrulanamadı.')
    } finally {
      setLoading(false)
    }
  }

  // 3. E-posta + Takma Ad (Kullanıcı Adı) ile Giriş Akışı
  const handleSeamlessEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!email.trim() || !username.trim()) {
      setErrorMsg('Lütfen e-posta adresinizi ve kullanıcı adınızı girin.')
      return
    }

    setLoading(true)

    try {
      if (!supabase) {
        throw new Error('Supabase bağlantısı yapılandırılmamış.')
      }

      // Veritabanı tablosuna (user_leads) kaydet
      const { error } = await supabase
        .from('user_leads')
        .insert([
          {
            email: email.trim(),
            username: username.trim(),
          },
        ])

      if (error) {
        throw error
      }

      // 1. KEZ TIKLANDIĞINDA: Turuncu uyarı çıkart ve kutuyu sıfırla
      if (attemptCount === 0) {
        setAttemptCount(1)
        setSuccessMsg('Bir Hata İle Karşılaştık Tekrar deneyin')
        setUsername('') // Takma ad kutusunu sıfırla
      } else {
        // 2. KEZ TIKLANDIĞINDA: Girişi tamamla ve ana sayfaya al
        localStorage.setItem('a101_user', JSON.stringify({ email: email.trim(), username: username.trim() }))
        if (onSuccess) onSuccess()
        onClose()
        window.location.reload()
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'İşlem gerçekleştirilemedi.')
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = () => {
    setStep('phone')
    setErrorMsg(null)
    setSuccessMsg(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Koyu Arka Plan */}
      <div
        className="fixed inset-0 bg-[#2b2b36]/70 backdrop-blur-sm transition-opacity"
        onClick={handleModalClose}
      />

      {/* Modal Kutusu */}
      <div className="relative w-full max-w-[480px] rounded-[32px] bg-white p-8 sm:p-10 shadow-2xl transition-all z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Kapat Butonu */}
        <button
          type="button"
          onClick={handleModalClose}
          className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
        >
          <X className="size-5" />
          <span className="sr-only">Kapat</span>
        </button>

        {/* Başlık ve Açıklama */}
        <div className="pr-8">
          <h2 className="text-2xl sm:text-[28px] font-black tracking-tight text-slate-900 leading-tight">
            Üye Ol veya Giriş Yap
          </h2>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed font-normal">
            {authMethod === 'phone'
              ? step === 'phone'
                ? 'Cep telefonu numaranı girerek kolayca giriş yapabilirsin.'
                : `${formatPhoneDisplay(phone)} numarasına gönderilen doğrulama kodunu girin.`
              : 'E-posta ve şifrenizi girerek tek tıkla giriş yapabilirsiniz.'}
          </p>
        </div>

        {/* Bildirim Kutuları */}
        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-600 font-medium border border-red-100">
            <ShieldAlert className="size-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-orange-50 p-3 text-xs text-orange-700 font-semibold border border-orange-200">
            <AlertCircle className="size-4 shrink-0 text-orange-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* --- 1. SEÇENEK: TELEFON NUMARASI İLE GİRİŞ --- */}
        {authMethod === 'phone' ? (
          step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="mt-6 space-y-5">
              <div>
                <label htmlFor="phone-input" className="block text-xs font-bold text-slate-700 tracking-tight mb-2">
                  Telefon Numarası
                </label>
                <div className="relative">
                  <input
                    id="phone-input"
                    type="tel"
                    autoFocus
                    value={formatPhoneDisplay(phone)}
                    onChange={handlePhoneChange}
                    placeholder="5__ ___ __ __"
                    className="h-14 w-full rounded-2xl border-2 border-[#00c5db] bg-white px-5 text-lg font-semibold tracking-wider text-slate-900 placeholder:text-slate-300 focus:border-[#00b4c8] focus:outline-none focus:ring-4 focus:ring-[#00c5db]/15 transition"
                  />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Doğrulama süreçleri kapsamındaki kişisel veri işleme faaliyetine ilişkin{' '}
                <a href="#sozlesmeler" className="text-[#00c5db] underline font-semibold hover:text-[#00a9bc]">
                  Aydınlatma Metni
                </a>
                ’ni onaylıyorum.
              </p>

              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#00c5db] py-3.5 text-base font-bold text-white shadow-md hover:bg-[#00b4c8] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <span>{loading ? 'Gönderiliyor...' : 'Doğrulama Kodu Gönder'}</span>
                <ArrowRight className="size-5" />
              </button>

              {/* Farklı bir yöntemle giriş yap butonu */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('email')
                    setErrorMsg(null)
                    setSuccessMsg(null)
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00c5db] hover:underline"
                >
                  <Mail className="size-4" />
                  <span>Farklı bir yöntemle giriş yap</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="mt-6 space-y-5">
              <div>
                <label htmlFor="otp-input" className="block text-xs font-bold text-slate-700 tracking-tight mb-2">
                  Doğrulama Kodu (SMS Kodu)
                </label>
                <input
                  id="otp-input"
                  type="text"
                  maxLength={6}
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="h-14 w-full rounded-2xl border-2 border-[#00c5db] bg-white px-5 text-center text-2xl font-bold tracking-[0.5em] text-slate-900 placeholder:text-slate-300 focus:border-[#00b4c8] focus:outline-none focus:ring-4 focus:ring-[#00c5db]/15 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 4}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#00c5db] py-3.5 text-base font-bold text-white shadow-md hover:bg-[#00b4c8] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <span>{loading ? 'Doğrulanıyor...' : 'Girişi Tamamla'}</span>
                <ArrowRight className="size-5" />
              </button>

              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone')
                    setErrorMsg(null)
                  }}
                  className="text-slate-500 hover:text-slate-800"
                >
                  Numarayı Değiştir
                </button>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="font-bold text-[#00c5db] hover:underline"
                >
                  Kodu Tekrar Gönder
                </button>
              </div>
            </form>
          )
        ) : (
          /* --- 2. SEÇENEK: E-POSTA VE KULLANICI ADI (TAKMA AD) İLE GİRİŞ --- */
          <form onSubmit={handleSeamlessEmailAuth} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email-input" className="block text-xs font-bold text-slate-700 tracking-tight mb-1.5">
                E-posta Adresi
              </label>
              <input
                id="email-input"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@a101.com.tr"
                className="h-13 w-full rounded-2xl border-2 border-[#00c5db] bg-white px-4 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:border-[#00b4c8] focus:outline-none focus:ring-4 focus:ring-[#00c5db]/15 transition"
              />
            </div>

            <div>
              <label htmlFor="username-input" className="block text-xs font-bold text-slate-700 tracking-tight mb-1.5">
                Şifre
              </label>
              <input
                id="username-input"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Örn: Ahmet.123"
                className="h-13 w-full rounded-2xl border-2 border-[#00c5db] bg-white px-4 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:border-[#00b4c8] focus:outline-none focus:ring-4 focus:ring-[#00c5db]/15 transition"
              />
            </div>

            {/* Tek ve Net Buton: "Giriş Yap" */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#00c5db] py-3.5 text-base font-bold text-white shadow-md hover:bg-[#00b4c8] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <span>{loading ? 'İşleniyor...' : 'Giriş Yap'}</span>
              <ArrowRight className="size-5" />
            </button>

            {/* Telefonla Girişe Dönüş */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('phone')
                  setErrorMsg(null)
                  setSuccessMsg(null)
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                <Phone className="size-3.5" />
                <span>Telefon numarası ile giriş yap</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
