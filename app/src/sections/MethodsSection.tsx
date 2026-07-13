import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { METHOD_TABS } from "@/data/siteData";

export default function MethodsSection() {
  const [activeTab, setActiveTab] = useState(METHOD_TABS[0].id);
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

  const activeTabData = METHOD_TABS.find((t) => t.id === activeTab) || METHOD_TABS[0];

  return (
    <section
      ref={sectionRef}
      id="methods"
      className="section-pad bg-kinari"
    >
      <div className="container-main">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="jp-eyebrow mb-3" lang="ja">教育方法</p>
          <h2 className="heading-section mb-4 text-balance">
            Lebih dari Sekadar Menghafal Kosakata
          </h2>
          <p className="body-md">
            Metode pembelajaran kami mencakup berbagai aspek yang diperlukan untuk menguasai bahasa Jepang secara komprehensif.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {METHOD_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all border ${
                activeTab === tab.id
                  ? "bg-aka text-white border-aka shadow-soft"
                  : "bg-white text-sumiText border-borderGray hover:border-aka hover:text-aka"
              }`}
            >
              <span lang="ja" className="font-jp text-xs block opacity-70">{tab.labelJp}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl border border-borderGray shadow-soft p-8">
            <h3 className="font-serif text-2xl text-ink mb-2">
              {activeTabData.label}
              <span lang="ja" className="font-jp text-lg text-warmGray ml-2">
                {activeTabData.labelJp}
              </span>
            </h3>
            <div className="w-12 h-1 bg-aka rounded-full mb-6" />
            <ul className="space-y-4">
              {activeTabData.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex-shrink-0 w-5 h-5 bg-success/10 rounded-full flex items-center justify-center mt-0.5">
                    <Check size={12} className="text-success" />
                  </span>
                  <span className="text-sumiText">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
