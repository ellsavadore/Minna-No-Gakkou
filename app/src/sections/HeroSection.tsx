import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, CalendarDays } from "lucide-react";
import { SITE_SETTINGS } from "@/data/siteData";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const animRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Japanese-themed Animated Background with Sakura & Mountains
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    const resize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      w = Math.max(300, window.innerWidth);
      h = Math.max(300, window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / w;
      mouseRef.current.y = e.clientY / h;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Create sakura petals
    const calcSakuraCount = () => {
      // fewer particles on small screens, more on large
      const base = Math.floor(Math.min(140, Math.max(18, w / 12)));
      return base;
    };

    const createSakuras = (count: number) =>
      Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random() - 0.5,
        vx: (Math.random() - 0.5) * 0.0025,
        vy: Math.random() * 0.0015 + 0.0006,
        size: (Math.random() * 3 + 2) * (Math.min(w, 900) / 900),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.6 + 0.25,
      }));

    let sakuras = createSakuras(calcSakuraCount());

    const draw = () => {
      timeRef.current += 0.01;
      const t = timeRef.current;

      // Gradient background - refined palette
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, "#0b1020");
      bgGrad.addColorStop(0.35, "#12203a");
      bgGrad.addColorStop(0.65, "#2a1730");
      bgGrad.addColorStop(1, "#0a0b12");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw distant mountains
      ctx.fillStyle = "rgba(40, 20, 40, 0.3)";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      for (let i = 0; i <= w; i += 50) {
        const waveY = Math.sin(i * 0.01 + t * 0.2) * 30 + h * 0.5;
        ctx.lineTo(i, waveY);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // Draw closer mountains
      ctx.fillStyle = "rgba(60, 30, 60, 0.4)";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.55);
      for (let i = 0; i <= w; i += 40) {
        const waveY = Math.sin(i * 0.015 + t * 0.15) * 25 + h * 0.55;
        ctx.lineTo(i, waveY);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // Draw wave lines (seigaiha pattern)
      ctx.strokeStyle = "rgba(188, 0, 45, 0.08)";
      ctx.lineWidth = 1;
      for (let waveIdx = 0; waveIdx < 4; waveIdx++) {
        const baseY = (h * 0.5) + (waveIdx * 30) + Math.sin(t * 0.1 + waveIdx) * 5;
        ctx.beginPath();
        for (let i = 0; i <= w; i += 20) {
          const y = baseY + Math.sin(i * 0.01 + t * 0.1 + waveIdx) * 10;
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
        // subtle strokes with layered alpha for depth
        ctx.globalAlpha = 0.085 - waveIdx * 0.01;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Update and draw sakura petals
      sakuras.forEach((petal) => {
        // Update position and rotation
        petal.x += petal.vx;
        petal.y += petal.vy;
        petal.rotation += petal.rotationSpeed;

        // Add wind effect modulated by time and mouse parallax
        const wind = Math.sin(petal.y * 4 + t * 0.12) * 0.00006;
        petal.vx += wind + (smoothMouseRef.current.x - 0.5) * 0.0006;

        // Wrap around
        if (petal.x < -0.1) petal.x = 1.1;
        if (petal.x > 1.1) petal.x = -0.1;
        if (petal.y > 1.2) {
          petal.y = -0.1;
          petal.x = Math.random();
        }

        const screenX = petal.x * w + (smoothMouseRef.current.x - 0.5) * 30;
        const screenY = petal.y * h + (smoothMouseRef.current.y - 0.5) * 18;

        // Draw sakura petal glow
        const glowGrad = ctx.createRadialGradient(
          screenX, screenY, 0,
          screenX, screenY, petal.size * 3
        );
        glowGrad.addColorStop(0, `rgba(188, 0, 45, ${petal.opacity * 0.3})`);
        glowGrad.addColorStop(1, `rgba(188, 0, 45, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.fillRect(screenX - petal.size * 3, screenY - petal.size * 3, petal.size * 6, petal.size * 6);

        // Draw sakura petal
        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(petal.rotation);
        ctx.fillStyle = `rgba(255, 200, 220, ${petal.opacity})`;
        
        // Five-petal flower shape
        for (let p = 0; p < 5; p++) {
          const angle = (p / 5) * Math.PI * 2;
          const px = Math.cos(angle) * petal.size;
          const py = Math.sin(angle) * petal.size;
          ctx.beginPath();
          ctx.arc(px, py, petal.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Draw lantern glow effect
      // smooth mouse for subtle parallax
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;

      const lanternX = w * (0.3 + Math.sin(t * 0.05) * 0.08) + (smoothMouseRef.current.x - 0.5) * 60;
      const lanternY = h * 0.3;
      const lanternGrad = ctx.createRadialGradient(lanternX, lanternY, 0, lanternX, lanternY, 300);
      lanternGrad.addColorStop(0, "rgba(255, 200, 100, 0.08)");
      lanternGrad.addColorStop(1, "rgba(188, 0, 45, 0)");
      ctx.fillStyle = lanternGrad;
      ctx.fillRect(lanternX - 300, lanternY - 300, 600, 600);

      // Add floating particles (mist effect)
      for (let p = 0; p < 15; p++) {
        const px = (Math.sin(p * 0.7 + t * 0.2) * 0.4 + 0.5) * w;
        const py = (Math.cos(p * 1.1 + t * 0.15) * 0.4 + 0.5) * h;
        const pOpacity = 0.05 + Math.sin(p * 1.5 + t) * 0.03;
        ctx.fillStyle = `rgba(200, 200, 200, ${pOpacity})`;
        ctx.beginPath();
        ctx.arc(px, py, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // reposition sakuras count on large resizes
      if (sakuras.length !== calcSakuraCount()) {
        sakuras = createSakuras(calcSakuraCount());
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent("Halo Admin Minna No Gakkou, saya ingin bertanya mengenai program pelatihan bahasa Jepang.")}`;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="container-main relative z-10 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <div className="max-w-3xl xl:max-w-4xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-aka/90 backdrop-blur-sm rounded-full mb-6 transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <CalendarDays size={16} className="text-white" />
            <span className="text-white text-xs sm:text-sm font-medium tracking-[0.12em] uppercase">
              PENDAFTARAN KELAS BARU DIBUKA
            </span>
          </div>

          {/* Eyebrow */}
          <p
            className={`jp-eyebrow text-wash/60 mb-3 transition-all duration-700 delay-100 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            lang="ja"
          >
            みんなの学校について
          </p>

          {/* Headline */}
          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white leading-[1.05] sm:leading-[1.08] tracking-tight mb-5 transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Langkah Awal Menuju Masa Depan Bersama Jepang.
          </h1>

          {/* Class date info */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center gap-3 mb-5 transition-all duration-700 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-12 h-px bg-aka" />
            <p className="text-wash/80 text-sm sm:text-base">
              Mulai Belajar: <span className="text-white font-semibold">3 Agustus 2026</span>
            </p>
          </div>

          {/* Subheadline */}
          <p
            className={`text-wash/75 text-base sm:text-lg md:text-xl leading-relaxed md:max-w-2xl mb-8 transition-all duration-700 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Belajar bahasa, memahami budaya, dan mempersiapkan komunikasi kerja Jepang dengan pendampingan langsung dari praktisi berpengalaman lima tahun di Jepang.
          </p>

          {/* CTA Group */}
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10 transition-all duration-700 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              to="/daftar"
              className="inline-flex items-center gap-2 px-7 py-4 bg-aka text-white font-medium rounded-full hover:bg-deepRed transition-all hover:scale-[1.02] shadow-elevated"
            >
              Daftar Kelas 3 Agustus 2026
              <ArrowRight size={18} />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-4 text-wash font-medium hover:text-white transition-colors group"
            >
              <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
              Konsultasi Gratis
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Trust Points */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-600 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              "Pendampingan langsung",
              "Pembelajaran terstruktur",
              "Pengalaman nyata di Jepang",
              "Lingkungan belajar nyaman",
            ].map((point) => (
              <span
                key={point}
                className="inline-flex items-center gap-2 text-wash/60 text-xs md:text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-aka" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Cards - Floating */}
      <div className="hidden xl:block absolute bottom-16 right-12 z-10 space-y-3">
        {[
          { label: "Bidang Kaigo dan Keperawatan", delay: "800" },
          { label: "Pendampingan Langsung", delay: "900" },
        ].map((card) => (
          <div
            key={card.label}
            className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 min-w-[240px] transition-all duration-700 delay-${card.delay} ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <p className="text-white text-sm font-medium">{card.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
