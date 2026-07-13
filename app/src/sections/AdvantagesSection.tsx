import { useEffect, useRef, useState } from "react";
import { Award, Users, Globe, BookOpen, Home, TrendingUp, FileText, Shield } from "lucide-react";
import { ADVANTAGES } from "@/data/siteData";

const ICON_MAP: Record<string, React.ReactNode> = {
  award: <Award size={22} />,
  users: <Users size={22} />,
  globe: <Globe size={22} />,
  "book-open": <BookOpen size={22} />,
  home: <Home size={22} />,
  "trending-up": <TrendingUp size={22} />,
  "file-text": <FileText size={22} />,
  shield: <Shield size={22} />,
};

export default function AdvantagesSection() {
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
      id="advantages"
      className="section-pad bg-wash relative overflow-hidden"
    >
      <div className="absolute inset-0 pattern-seigaiha opacity-20 pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="jp-eyebrow mb-3" lang="ja">強み</p>
          <h2 className="heading-section mb-4 text-balance">
            Mengapa Memilih Minna No Gakkou?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ADVANTAGES.map((advantage, index) => (
            <div
              key={advantage.id}
              className={`bg-white rounded-2xl border border-borderGray p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-11 h-11 bg-aka/10 rounded-xl flex items-center justify-center text-aka mb-4">
                {ICON_MAP[advantage.icon]}
              </div>
              <h3 className="font-serif text-lg text-ink mb-2">{advantage.title}</h3>
              <p className="text-sumiText text-sm leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
