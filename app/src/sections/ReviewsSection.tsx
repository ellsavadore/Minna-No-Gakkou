import { useEffect, useRef, useState } from "react";
import { Star, ExternalLink, MessageSquarePlus } from "lucide-react";

// Since this is a new institution, we show empty state with guidance
export default function ReviewsSection() {
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
      id="reviews"
      className="section-pad bg-wash relative overflow-hidden"
    >
      <div className="absolute inset-0 pattern-seigaiha opacity-20 pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="jp-eyebrow mb-3" lang="ja">レビュー</p>
          <h2 className="heading-section mb-4 text-balance">
            Apa Kata Mereka di Google?
          </h2>
          <p className="body-md">
            Ulasan asli dari Google Maps tentang pengalaman belajar di Minna No Gakkou.
          </p>
        </div>

        {/* Empty State */}
        <div
          className={`max-w-xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="bg-white rounded-3xl border border-borderGray shadow-soft p-10 text-center">
            {/* Stars placeholder */}
            <div className="flex justify-center gap-1 mb-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className="text-borderGray"
                  strokeWidth={1.5}
                />
              ))}
            </div>

            <h3 className="font-serif text-xl text-ink mb-3">
              Minna No Gakkou Masih Bertumbuh
            </h3>
            <p className="text-sumiText text-sm leading-relaxed mb-6">
              Jadilah salah satu peserta pertama yang membagikan pengalaman belajar Anda. 
              Setelah menjadi siswa, kami sangat menghargai ulasan jujur Anda di Google Maps 
              untuk membantu calon siswa lainnya mengenal Minna No Gakkou.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://search.google.com/local/writereview?placeid=PLACEHOLDER"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageSquarePlus size={16} />
                Tulis Ulasan di Google
              </a>
              <a
                href="https://www.google.com/maps/@-7.367272,106.5616326,21z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <ExternalLink size={14} />
                Lihat di Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Note about reviews */}
        <p className="text-center text-warmGray text-xs mt-8 max-w-lg mx-auto">
          Ulasan ditampilkan setelah diverifikasi melalui Google Business Profile. 
          Kami tidak membuat atau memodifikasi ulasan apa pun.
        </p>
      </div>
    </section>
  );
}
