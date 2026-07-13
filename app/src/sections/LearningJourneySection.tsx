import { useEffect, useRef, useState } from "react";
import { LEARNING_STEPS } from "@/data/siteData";

export default function LearningJourneySection() {
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
      id="journey"
      className="section-pad bg-wash relative overflow-hidden"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 pattern-seigaiha opacity-20 pointer-events-none" />
      
      <div className="container-main relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="jp-eyebrow mb-3" lang="ja">学習の旅</p>
          <h2 className="heading-section mb-4 text-balance">
            Proses Belajar yang Jelas dan Terarah
          </h2>
          <p className="body-md">
            Setiap peserta akan menjalani proses pembelajaran yang sistematis, dari konsultasi awal hingga pendampingan lanjutan.
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-borderGray -translate-x-1/2" />
          
          <div className="space-y-12">
            {LEARNING_STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={step.id}
                  className={`relative flex items-center transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Left content */}
                  <div className={`w-1/2 ${isLeft ? "pr-12 text-right" : "pr-12"}`}>
                    {isLeft && (
                      <div>
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-aka text-white text-sm font-semibold rounded-full mb-2">
                          {step.number}
                        </span>
                        <h3 className="font-serif text-xl text-ink mb-1">{step.title}</h3>
                        <p className="text-sumiText text-sm">{step.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 bg-aka rounded-full border-4 border-wash shadow-soft" />
                  </div>

                  {/* Right content */}
                  <div className={`w-1/2 ${isLeft ? "pl-12" : "pl-12 text-left"}`}>
                    {!isLeft && (
                      <div>
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-aka text-white text-sm font-semibold rounded-full mb-2">
                          {step.number}
                        </span>
                        <h3 className="font-serif text-xl text-ink mb-1">{step.title}</h3>
                        <p className="text-sumiText text-sm">{step.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-borderGray" />
          
          <div className="space-y-8">
            {LEARNING_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`relative pl-12 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Dot */}
                <div className="absolute left-4 top-0 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 bg-aka rounded-full border-4 border-wash shadow-soft" />
                </div>
                
                <span className="inline-flex items-center justify-center w-7 h-7 bg-aka text-white text-xs font-semibold rounded-full mb-2">
                  {step.number}
                </span>
                <h3 className="font-serif text-lg text-ink mb-1">{step.title}</h3>
                <p className="text-sumiText text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
