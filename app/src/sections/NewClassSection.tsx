import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export default function NewClassSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targetDate = new Date("2026-08-03T08:00:00+07:00");
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setHasStarted(true);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setHasStarted(false);
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const whatsappUrl = `https://wa.me/6285781124502?text=${encodeURIComponent("Halo Admin Minna No Gakkou, saya ingin bertanya mengenai pembukaan kelas baru yang dimulai pada 3 Agustus 2026. Apakah pendaftaran masih tersedia?")}`;

  return (
    <section
      ref={sectionRef}
      id="kelas-baru"
      className="section-pad bg-wash relative overflow-hidden"
    >
      {/* Decorative red circle (sun motif) */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-aka/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div
          className={`bg-white rounded-3xl border border-borderGray shadow-soft overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header with red accent */}
          <div className="bg-gradient-to-r from-aka to-deepRed px-8 py-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} />
              <span className="text-sm font-medium tracking-wide">PENGUMUMAN KELAS BARU</span>
            </div>
            <p className="font-jp text-white/70 text-sm" lang="ja">新しいクラスのご案内</p>
          </div>

          <div className="p-8 md:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left: Date display */}
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-serif text-7xl md:text-8xl font-bold text-aka leading-none">03</span>
                  <div>
                    <p className="text-lg font-semibold text-ink tracking-wider">AGUSTUS 2026</p>
                    <p className="text-warmGray text-sm">KELAS BARU DIMULAI</p>
                  </div>
                </div>
                
                <p className="text-sumiText leading-relaxed mb-6">
                  Kelas baru Minna No Gakkou akan dimulai pada 3 Agustus 2026. Pendaftaran telah dibuka 
                  bagi calon peserta yang ingin mulai belajar bahasa Jepang dari tingkat dasar, meningkatkan 
                  kemampuan komunikasi, serta memahami budaya dan kedisiplinan kerja Jepang.
                </p>

                {/* Info items */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-sumiText">
                    <CalendarDays size={16} className="text-aka" />
                    <span>Pendaftaran: Dibuka sekarang</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sumiText">
                    <MapPin size={16} className="text-aka" />
                    <span>Lokasi: Minna No Gakkou</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <Link
                    to="/daftar"
                    className="btn-primary w-full sm:w-auto justify-center whitespace-nowrap text-sm min-h-[56px]"
                  >
                    Daftar untuk Kelas Baru
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full sm:w-auto justify-center whitespace-nowrap text-sm min-h-[56px]"
                  >
                    <MessageCircle size={16} />
                    Tanyakan Ketersediaan Kelas
                  </a>
                </div>
              </div>

              {/* Right: Countdown or Status */}
              <div className="flex justify-center">
                {!hasStarted ? (
                  <div className="text-center">
                    <p className="jp-eyebrow mb-4" lang="ja">カウントダウン</p>
                    <p className="text-sm text-warmGray mb-6">Menuju Hari Pertama Kelas Baru</p>
                    
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { value: countdown.days, label: "Hari" },
                        { value: countdown.hours, label: "Jam" },
                        { value: countdown.minutes, label: "Menit" },
                        { value: countdown.seconds, label: "Detik" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-kinari rounded-2xl border border-borderGray p-4 min-w-[72px]"
                        >
                          <p className="font-serif text-3xl md:text-4xl text-aka font-bold">
                          {String(item.value).padStart(2, "0")}
                          </p>
                          <p className="text-warmGray text-xs mt-1">{item.label}</p>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-xs text-warmGray mt-4">
                      Waktu menunjukkan zona Asia/Jakarta (WIB)
                    </p>
                  </div>
                ) : (
                  <div className="text-center bg-kinari rounded-2xl border border-borderGray p-8">
                    <p className="font-serif text-2xl text-ink mb-2">
                      Kelas Agustus 2026 Telah Dimulai
                    </p>
                    <p className="text-sumiText text-sm mb-4">
                      Kelas baru telah dimulai pada 3 Agustus 2026.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <MessageCircle size={16} />
                      Tanyakan Kelas Berikutnya
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
