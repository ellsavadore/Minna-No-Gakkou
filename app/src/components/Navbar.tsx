import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, SITE_SETTINGS } from "@/data/siteData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent("Halo Admin Minna No Gakkou, saya ingin bertanya mengenai program pelatihan bahasa Jepang.")}`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "nav-frosted py-3 shadow-soft"
            : "bg-transparent py-4"
        }`}
        role="navigation"
        aria-label="Navigasi utama"
      >
        <div className="container-main flex items-center justify-between">
          <Logo variant={isScrolled ? "dark" : "light"} />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              link.href.startsWith("/#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors hover:text-aka ${
                    isScrolled ? "text-ink" : "text-white/90"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-aka ${
                    isScrolled ? "text-ink" : "text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 border rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? "border-aka text-aka hover:bg-aka hover:text-white"
                  : "border-white/40 text-white hover:bg-white/10"
              }`}
            >
              <MessageCircle size={16} />
              Konsultasi
            </a>
            <Link
              to="/daftar"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-aka text-white rounded-full text-sm font-medium hover:bg-deepRed transition-colors shadow-soft"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-full ${
                isScrolled ? "text-aka" : "text-white"
              }`}
              aria-label="Konsultasi WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-full ${
                isScrolled ? "text-ink" : "text-white"
              }`}
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-wash transition-transform duration-500 ease-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Menu mobile"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          <div className="flex flex-col gap-2 flex-1">
            {NAV_LINKS.map((link) => (
              link.href.startsWith("/#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xl font-serif text-ink py-3 border-b border-borderGray hover:text-aka transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-xl font-serif text-ink py-3 border-b border-borderGray hover:text-aka transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <Link
              to="/daftar"
              className="btn-primary w-full text-center py-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Daftar Sekarang
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-center py-4"
            >
              <MessageCircle size={18} />
              Konsultasi WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
