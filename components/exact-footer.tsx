import Image from 'next/image'
import { A101Logo } from '@/components/a101-logo'

export function ExactFooter() {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200">
      {/* App Download Banner (Cyan Banner from Screenshot 4/5) */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00a0d6] via-[#00b4f0] to-[#0092c2] p-6 sm:p-8 text-white shadow-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-1">
                <span className="text-3xl font-black italic">A<span className="not-italic">·101</span></span>
              </div>
              <p className="text-base sm:text-lg font-bold">
                Her Şeyi A101 Fiyatıyla Alabileceğin Tek Uygulama’yı İndir
              </p>
            </div>

            {/* Badges: App Store & Google Play */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#"
                className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-white hover:bg-slate-900 shadow-sm"
              >
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 uppercase leading-none">Hemen İndirin</p>
                  <p className="text-xs font-bold leading-none mt-0.5">App Store</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-white hover:bg-slate-900 shadow-sm"
              >
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 uppercase leading-none">Hemen İndirin</p>
                  <p className="text-xs font-bold leading-none mt-0.5">Google Play</p>
                </div>
              </a>

              {/* QR Code */}
              <div className="flex size-11 items-center justify-center rounded-xl bg-white p-1 shadow-sm">
                <div className="size-full rounded bg-slate-900" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Navigation Columns + Right Socials from Screenshot 5 */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 text-xs text-slate-600">
          {/* Col 1 */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3">A101 Kurumsal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#00a0d6]">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Medya</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Bilgi Toplumu Hizmetleri</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Kariyer</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Site Haritası</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">İletişim</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Kurumsal Satış Formu</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Tedarikçi Olmak İstiyorum</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Kiralık Yerin mi Var?</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Sürdürülebilirlik</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Arabuluculuk Formu</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3">Mağazacılık</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#00a0d6]">Bölge Müdürlükleri</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">En Yakın Mağazalar</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Sözleşmeler</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Sıkça Sorulan Sorular</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Bize Ulaşın</a></li>
            </ul>

            <h4 className="text-sm font-bold text-slate-900 mt-6 mb-3">A101 Artı</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#00a0d6]">İade İşlemleri</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Müşteri İade Politikası</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Sıkça Sorulan Sorular</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3">Sözleşmeler</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#00a0d6]">Üyelik Sözleşmesi</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Mesafeli Satış Sözleşmesi</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Ön Bilgilendirme Formu</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Açık Rıza Metni</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Kişisel Verilerin Korunması</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Aydınlatma Metni</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">İş Sağlığı ve Güvenliği Politikası</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Kalite Politikası</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">Çevre Politikası</a></li>
              <li><a href="#" className="hover:text-[#00a0d6]">İptal-İade Koşulları</a></li>
            </ul>
          </div>

          {/* Col 4 & 5: Brand Logo, Socials, App Downloads and TR GO badge */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <A101Logo />
              <p className="text-[11px] font-semibold text-slate-500 mt-1">Yeni Mağazacılık A.Ş</p>
            </div>

            {/* Social Icons (fb, ig, x, tiktok, yt, linkedin) */}
            <div className="flex items-center gap-2 pt-2">
              {['f', 'ig', 'x', 'tt', 'yt', 'in'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex size-7 items-center justify-center rounded-full bg-[#00a0d6] text-white text-[10px] font-bold hover:bg-[#008dbd]"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* TR GO & Trust stamp */}
            <div className="pt-2 flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-[#00a0d6] text-[#00a0d6] font-black text-xs text-center leading-none">
                TR<br />GO
              </div>
              <p className="text-[10px] text-slate-400 max-w-[140px]">
                Güvenli e-ticaret tescilli platformu.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-6 text-center text-xs text-slate-400">
          © 2026 A101 Ekstra - Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  )
}
