import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-sumi overflow-hidden"
    >
      {/* Decorative red sun */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] rounded-full bg-aka/10 blur-3xl pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Japanese accent text */}
          <p className="font-jp text-wash/40 text-sm tracking-wider mb-4" lang="ja">
            始めの一歩を踏み出しましょう
          </p>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-wash font-normal leading-[1.15] mb-5 text-balance">
            Mulai Langkah Pertama Anda Hari Ini.
          </h2>
          
          <p className="text-wash/70 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            Konsultasikan kebutuhan belajar Anda dan temukan program yang paling sesuai. 
            Pendaftaran awal tidak dipungut biaya konsultasi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/daftar"
              className="inline-flex items-center gap-2 px-8 py-4 bg-aka text-white font-medium rounded-full hover:bg-deepRed transition-all hover:scale-[1.02] shadow-elevated"
            >
              Daftar Sekarang
              <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/6285781124502?text=${encodeURIComponent("Halo Admin Minna No Gakkou, saya ingin berkonsultasi mengenai program pelatihan bahasa Jepang.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-wash/30 text-wash font-medium rounded-full hover:bg-white/10 transition-all"
            >
              <MessageCircle size={18} />
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
