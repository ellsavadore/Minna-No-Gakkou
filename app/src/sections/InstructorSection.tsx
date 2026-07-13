import { useEffect, useRef, useState } from "react";
import { Award, Heart, Stethoscope, Globe, MessageCircle, ArrowRight } from "lucide-react";

const CREDENTIALS = [
  { icon: <Award size={18} />, text: "Pengalaman lima tahun di Jepang" },
  { icon: <Heart size={18} />, text: "Pengalaman bidang Kaigo" },
  { icon: <Stethoscope size={18} />, text: "Latar belakang keperawatan" },
  { icon: <Globe size={18} />, text: "Pemahaman budaya kerja Jepang" },
];

export default function InstructorSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instructor"
      className="section-pad bg-kinari"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div
            className={`order-2 lg:order-1 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="jp-eyebrow mb-3" lang="ja">指導者紹介</p>
            <h2 className="heading-section mb-5 text-balance">
              Belajar Langsung Bersama Praktisi Berpengalaman di Jepang.
            </h2>
            
            <div className="mb-6">
              <h3 className="font-serif text-xl text-ink mb-1">Aji Pangestu Ramdani</h3>
              <p className="text-aka text-sm font-medium">Pimpinan dan Pengajar Utama Minna No Gakkou</p>
            </div>

            <div className="space-y-4 mb-8">
              <p className="body-md">
                Aji Pangestu Ramdani memiliki pengalaman bekerja selama kurang lebih lima tahun di Jepang 
                dalam bidang Kaigo. Dengan latar belakang keperawatan dan pengalaman langsung di lingkungan 
                kerja Jepang, beliau memahami pentingnya bahasa, komunikasi, kedisiplinan, kepedulian, 
                etika kerja, serta kemampuan beradaptasi.
              </p>
              <p className="body-md">
                Pengalaman tersebut menjadi dasar pendekatan pembelajaran di Minna No Gakkou, agar peserta 
                tidak hanya mempelajari kosakata dan tata bahasa, tetapi juga memahami cara berkomunikasi 
                dan berperilaku secara tepat di lingkungan Jepang.
              </p>
            </div>

            {/* Credential Cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {CREDENTIALS.map((cred, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-borderGray shadow-soft"
                >
                  <span className="text-aka flex-shrink-0">{cred.icon}</span>
                  <span className="text-sm text-sumiText">{cred.text}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/6285781124502?text=${encodeURIComponent("Halo Admin Minna No Gakkou, saya ingin berkonsultasi dengan pengajar mengenai program pelatihan.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={16} />
              Konsultasi dengan Pengajar
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Image Column */}
          <div
            className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-soft aspect-[3/4] max-w-md mx-auto">
                <img
                  src="/images/WhatsApp%20Image%202026-07-10%20at%2014.51.51%20(1).jpeg"
                  alt="Aji Pangestu Ramdani, Pengajar Utama Minna No Gakkou"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-aka/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-ao/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
