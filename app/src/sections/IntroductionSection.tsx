import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Award, ArrowRight } from "lucide-react";

export default function IntroductionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pad bg-wash relative overflow-hidden"
    >
      {/* Subtle seigaiha background */}
      <div className="absolute inset-0 pattern-seigaiha opacity-30 pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              {/* Main portrait */}
              <div className="rounded-3xl overflow-hidden shadow-soft aspect-[3/4] max-w-md mx-auto lg:mx-0">
                <img
                  src="/images/WhatsApp%20Image%202026-07-10%20at%2014.51.51.jpeg"
                  alt="Aji Pangestu Ramdani, Pimpinan dan Pengajar Utama Minna No Gakkou"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-2 lg:right-4 bg-white rounded-2xl shadow-elevated px-5 py-4 border border-borderGray">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-aka/10 rounded-full flex items-center justify-center">
                    <Award size={20} className="text-aka" />
                  </div>
                  <div>
                    <p className="text-ink font-semibold text-sm">5+ Tahun</p>
                    <p className="text-warmGray text-xs">Pengalaman di Jepang</p>
                  </div>
                </div>
              </div>

              {/* Decorative shoji line */}
              <div className="absolute top-8 -left-4 w-px h-32 bg-borderGray hidden lg:block" />
            </div>
          </div>

          {/* Text Column */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="jp-eyebrow mb-3" lang="ja">指導者紹介</p>
            <h2 className="heading-section mb-5 text-balance">
              Belajar Langsung Bersama Praktisi Berpengalaman di Jepang.
            </h2>
            <p className="body-lg mb-6">
              Minna No Gakkou hadir sebagai ruang belajar bahasa Jepang yang mengutamakan kedisiplinan, 
              pemahaman budaya, komunikasi, dan kesiapan peserta menghadapi lingkungan profesional Jepang. 
              Proses pembelajaran didampingi langsung oleh pengajar yang memiliki pengalaman bekerja dan hidup di Jepang.
            </p>

            {/* Credential cards */}
            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              {[
                { label: "Bahasa", desc: "Komunikasi Jepang" },
                { label: "Budaya", desc: "Pemahaman Mendalam" },
                { label: "Kesiapan", desc: "Menuju Profesional" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-kinari rounded-xl px-4 py-4 border border-borderGray/50"
                >
                  <p className="text-aka font-serif text-lg font-semibold mb-1">{item.label}</p>
                  <p className="text-warmGray text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href={`https://wa.me/6285781124502?text=${encodeURIComponent("Halo Admin Minna No Gakkou, saya ingin berkonsultasi dengan pengajar mengenai program pelatihan.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Konsultasi dengan Pengajar
                <ArrowRight size={16} />
              </a>
              <Link to="/daftar" className="btn-text">
                Lihat Program Pelatihan
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
