import { MessageCircle } from "lucide-react";
import { SITE_SETTINGS } from "@/data/siteData";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent("Halo Admin Minna No Gakkou, saya ingin bertanya mengenai program pelatihan bahasa Jepang.")}`;

  return (
    <>
      {/* Desktop Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 hidden md:inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-full shadow-elevated hover:scale-105 transition-transform"
        aria-label="Konsultasi via WhatsApp"
      >
        <MessageCircle size={20} />
        <span className="text-sm font-medium">Konsultasi</span>
      </a>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-wash/95 backdrop-blur-lg border-t border-borderGray px-4 py-3 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-aka text-aka rounded-full text-sm font-medium hover:bg-aka hover:text-white transition-colors"
        >
          <MessageCircle size={16} />
          Tanya Admin
        </a>
        <a
          href="/#/daftar"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-aka text-white rounded-full text-sm font-medium hover:bg-deepRed transition-colors"
        >
          Daftar Kelas 3 Agustus
        </a>
      </div>

      {/* Mobile spacer for sticky CTA */}
      <div className="h-16 md:hidden" />
    </>
  );
}
