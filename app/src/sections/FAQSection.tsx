import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/data/siteData";

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="section-pad bg-kinari"
    >
      <div className="container-main">
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="jp-eyebrow mb-3" lang="ja">よくある質問</p>
          <h2 className="heading-section mb-4 text-balance">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="body-md">
            Temukan jawaban atas pertanyaan umum seputar program dan pendaftaran di Minna No Gakkou.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div
          className={`max-w-3xl mx-auto space-y-3 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {FAQ_ITEMS.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-borderGray overflow-hidden shadow-soft"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-kinari/50 transition-colors"
                aria-expanded={openId === faq.id}
              >
                <span className="font-medium text-ink text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-warmGray flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-4 text-sumiText text-sm leading-relaxed border-t border-borderGray/50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Schema.org FAQPage structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          })}
        </script>
      </div>
    </section>
  );
}
