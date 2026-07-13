import { useEffect, useRef, useState } from "react";
import { School, Armchair, Square, Volume2, BookOpen, MessageCircle, Wifi, UserCheck } from "lucide-react";
import { FACILITIES } from "@/data/siteData";

const ICON_MAP: Record<string, React.ReactNode> = {
  school: <School size={20} />,
  armchair: <Armchair size={20} />,
  square: <Square size={20} />,
  "volume-2": <Volume2 size={20} />,
  "book-open": <BookOpen size={20} />,
  "message-circle": <MessageCircle size={20} />,
  wifi: <Wifi size={20} />,
  "user-check": <UserCheck size={20} />,
};

export default function FacilitiesSection() {
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
      id="facilities"
      className="section-pad bg-wash relative overflow-hidden"
    >
      <div className="absolute inset-0 pattern-seigaiha opacity-20 pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="jp-eyebrow mb-3" lang="ja">施設</p>
          <h2 className="heading-section mb-4 text-balance">
            Lingkungan Belajar yang Nyaman
          </h2>
          <p className="body-md">
            Kami menyediakan fasilitas yang mendukung proses pembelajaran agar peserta dapat belajar dengan nyaman dan fokus.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACILITIES.filter((f) => f.isActive).map((facility, index) => (
            <div
              key={facility.id}
              className={`bg-white rounded-2xl border border-borderGray p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="w-10 h-10 bg-aka/10 rounded-lg flex items-center justify-center text-aka mb-4">
                {ICON_MAP[facility.icon]}
              </div>
              <h3 className="font-serif text-base text-ink mb-1">{facility.name}</h3>
              <p className="text-warmGray text-sm">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
