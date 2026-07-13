import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import Logo from "./Logo";
import { SITE_SETTINGS } from "@/data/siteData";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent("Halo Admin Minna No Gakkou, saya ingin bertanya mengenai program pelatihan bahasa Jepang.")}`;

  const quickLinks = [
    { label: "Beranda", href: "/" },
    { label: "Program Pelatihan", href: "/#programs" },
    { label: "Metode Pembelajaran", href: "/#methods" },
    { label: "Profil Pengajar", href: "/#instructor" },
    { label: "Galeri", href: "/#gallery" },
    { label: "FAQ", href: "/#faq" },
    { label: "Kontak", href: "/#contact" },
  ];

  const programLinks = [
    { label: "Bahasa Jepang Dasar", href: "/#programs" },
    { label: "Persiapan JLPT N5", href: "/#programs" },
    { label: "Bahasa Jepang untuk Kaigo", href: "/#programs" },
    { label: "Budaya dan Etika Kerja", href: "/#programs" },
    { label: "Persiapan Wawancara", href: "/#programs" },
    { label: "Kelas Privat", href: "/#programs" },
  ];

  return (
    <footer className="bg-sumi text-wash relative overflow-hidden">
      {/* Subtle seigaiha watermark */}
      <div className="absolute inset-0 pattern-seigaiha opacity-[0.03] pointer-events-none" />
      
      <div className="container-main relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Logo variant="light" className="mb-5" />
            <p className="text-wash/70 text-sm leading-relaxed mb-5 max-w-xs">
              Minna No Gakkou — Lembaga pelatihan bahasa Jepang dengan pendampingan langsung dari praktisi berpengalaman di Jepang.
            </p>
            <p className="text-wash/50 text-xs font-jp tracking-wider">
              みんなの学校
            </p>
            <div className="mt-4 inline-block px-3 py-1.5 bg-wash/10 rounded-lg text-xs text-wash/60 border border-wash/10">
              Lembaga pelatihan yang berorientasi pada standar pembinaan ketenagakerjaan Indonesia.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-wash/90 mb-5">
              Menu Cepat
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-wash/60 text-sm hover:text-aka transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-wash/90 mb-5">
              Program
            </h3>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-wash/60 text-sm hover:text-aka transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-wash/90 mb-5">
              Hubungi Kami
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={SITE_SETTINGS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-wash/60 text-sm hover:text-aka transition-colors group"
                >
                  <MapPin size={18} className="flex-shrink-0 mt-0.5 text-aka/70 group-hover:text-aka" />
                  <span>{SITE_SETTINGS.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-wash/60 text-sm hover:text-aka transition-colors group"
                >
                  <Phone size={18} className="flex-shrink-0 text-aka/70 group-hover:text-aka" />
                  <span>0857-8112-4502</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-wash/60 text-sm">
                <Clock size={18} className="flex-shrink-0 text-aka/70" />
                <span>{SITE_SETTINGS.operatingHours}</span>
              </li>
              <li className="flex items-center gap-3 text-wash/60 text-sm">
                <Mail size={18} className="flex-shrink-0 text-aka/70" />
                <span>info@minnanogakkou.id</span>
              </li>
            </ul>

            {/* Google Maps Mini Link */}
            <a
              href={SITE_SETTINGS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs text-aka hover:text-wash transition-colors"
            >
              <MapPin size={14} />
              Lihat di Google Maps →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-wash/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-wash/40 text-xs text-center md:text-left">
              © {currentYear} Minna No Gakkou (みんなの学校). Hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-4 text-xs text-wash/40">
              <Link to="/kebijakan-privasi" className="hover:text-aka transition-colors">
                Kebijakan Privasi
              </Link>
              <span className="text-wash/20">|</span>
              <Link to="/syarat-ketentuan" className="hover:text-aka transition-colors">
                Syarat dan Ketentuan
              </Link>
            </div>
          </div>
          <p className="text-wash/30 text-[10px] text-center mt-3">
            Minna No Gakkou — Belajar Bahasa Jepang, Memahami Budayanya, Mempersiapkan Masa Depan.
          </p>
        </div>
      </div>
    </footer>
  );
}
