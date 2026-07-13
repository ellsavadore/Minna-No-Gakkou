import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, BookOpen, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { PROGRAMS } from "@/data/siteData";
import type { Program } from "@/types";

const CATEGORIES = [
  { id: "all", label: "Semua Program" },
  { id: "pemula", label: "Pemula" },
  { id: "persiapan-ujian", label: "Persiapan Ujian" },
  { id: "kebutuhan-kerja", label: "Kebutuhan Kerja" },
  { id: "kelas-reguler", label: "Kelas Reguler" },
  { id: "kelas-intensif", label: "Kelas Intensif" },
];

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-jp overflow-hidden transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-aka via-aka/70 to-transparent" />
      
      <div className="p-6">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          {program.isNewClass && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-aka/10 text-aka text-xs font-medium rounded-full">
              <Sparkles size={12} />
              Kelas Baru — 3 Agustus 2026
            </span>
          )}
          {program.status === "open" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
              Pendaftaran Dibuka
            </span>
          )}
          {program.status === "coming_soon" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
              Segera Hadir
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="heading-card mb-2">{program.title}</h3>
        <p className="text-sumiText text-sm leading-relaxed mb-4 line-clamp-3">
          {program.description}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-warmGray">
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {program.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} />
            {program.capacity}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={13} />
            {program.method}
          </span>
        </div>

        {/* Price info */}
        <p className="text-sm text-warmGray mb-5 italic">
          {program.priceInfo}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {program.status === "open" ? (
            <>
              <Link
                to="/daftar"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-aka text-white text-sm font-medium rounded-full hover:bg-deepRed transition-colors"
              >
                {program.isNewClass ? "Daftar untuk Periode Ini" : "Daftar"}
                <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/6285781124502?text=${encodeURIComponent(`Halo Admin Minna No Gakkou, saya ingin bertanya mengenai program ${program.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-aka hover:text-deepRed transition-colors"
              >
                <MessageCircle size={14} />
                Tanya Program
              </a>
            </>
          ) : (
            <a
              href={`https://wa.me/6285781124502?text=${encodeURIComponent(`Halo Admin Minna No Gakkou, saya ingin menanyakan kapan program ${program.title} akan dibuka.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-aka text-aka text-sm font-medium rounded-full hover:bg-aka hover:text-white transition-colors"
            >
              <MessageCircle size={14} />
              Tanyakan Ketersediaan
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProgramsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredPrograms = activeCategory === "all"
    ? PROGRAMS
    : PROGRAMS.filter((p) => p.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="section-pad bg-kinari relative"
    >
      <div className="container-main">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="jp-eyebrow mb-3" lang="ja">プログラム</p>
          <h2 className="heading-section mb-4 text-balance">
            Program yang Dirancang untuk Setiap Tahap Pembelajaran
          </h2>
          <p className="body-md">
            Pilih program yang sesuai dengan kebutuhan dan tujuan belajar Anda. Setiap program dirancang dengan kurikulum terstruktur.
          </p>
        </div>

        {/* Filters */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-aka text-white shadow-soft"
                  : "bg-white text-sumiText border border-borderGray hover:border-aka hover:text-aka"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Program Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-warmGray text-sm mt-10">
          Harga program dapat dikonsultasikan langsung dengan admin.{" "}
          <a
            href={`https://wa.me/6285781124502?text=${encodeURIComponent("Halo Admin Minna No Gakkou, saya ingin menanyakan informasi biaya program pelatihan.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-aka hover:underline"
          >
            Hubungi kami via WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
