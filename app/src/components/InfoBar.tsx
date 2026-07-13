import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function InfoBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("info-bar-dismissed");
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      const hoursSince = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        setIsDismissed(true);
        setIsVisible(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("info-bar-dismissed", new Date().toISOString());
  };

  if (isDismissed && !isVisible) return null;

  return (
    <div
      className={`bg-ao text-wash relative z-50 transition-all duration-400 ${
        isVisible ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="container-main flex items-center justify-between py-2.5 px-4">
        <p className="text-xs md:text-sm font-medium flex-1 text-center pr-8">
          Kelas Baru Dimulai 3 Agustus 2026 — Pendaftaran Sudah Dibuka!{" "}
          <Link
            to="/daftar"
            className="underline underline-offset-2 hover:text-white/80 font-semibold ml-1"
          >
            Daftar Sekarang →
          </Link>
        </p>
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Tutup pengumuman"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
