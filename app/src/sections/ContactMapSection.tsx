import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Clock, Navigation, ExternalLink } from "lucide-react";
import { SITE_SETTINGS } from "@/data/siteData";

export default function ContactMapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Lazy load map when in viewport
          setTimeout(() => setMapLoaded(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${SITE_SETTINGS.googleMapsLat},${SITE_SETTINGS.googleMapsLng}`;
  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent("Halo Admin Minna No Gakkou, saya ingin bertanya mengenai lokasi lembaga.")}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pad bg-wash relative overflow-hidden"
    >
      <div className="absolute inset-0 pattern-seigaiha opacity-20 pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="jp-eyebrow mb-3" lang="ja">アクセス</p>
          <h2 className="heading-section mb-4 text-balance">
            Kunjungi Minna No Gakkou
          </h2>
          <p className="body-md">
            Silakan berkunjung atau hubungi kami untuk informasi lebih lanjut.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map - takes 3 columns */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="bg-white rounded-2xl border border-borderGray shadow-soft overflow-hidden h-[350px] md:h-[400px] relative">
              {!mapLoaded ? (
                <div className="absolute inset-0 bg-kinari flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-aka mx-auto mb-2" />
                    <p className="text-warmGray text-sm">Memuat peta...</p>
                  </div>
                </div>
              ) : (
                <iframe
                  title="Lokasi Minna No Gakkou"
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15840.123456789012!2d${SITE_SETTINGS.googleMapsLng}!3d${SITE_SETTINGS.googleMapsLat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjInMDIuMiJTIDEwNsKwMzMnNDEuOSJF!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid`}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>

            {/* Map action buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href={SITE_SETTINGS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-borderGray rounded-xl text-sm text-ink hover:border-aka hover:text-aka transition-colors shadow-soft"
              >
                <ExternalLink size={14} />
                Buka di Google Maps
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-borderGray rounded-xl text-sm text-ink hover:border-aka hover:text-aka transition-colors shadow-soft"
              >
                <Navigation size={14} />
                Petunjuk Arah
              </a>
            </div>
          </div>

          {/* Contact Info - takes 2 columns */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="bg-white rounded-2xl border border-borderGray shadow-soft p-6 md:p-8">
              <h3 className="font-serif text-xl text-ink mb-6">Informasi Kontak</h3>
              
              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-aka/10 rounded-lg flex items-center justify-center text-aka flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm mb-1">Alamat</p>
                    <p className="text-sumiText text-sm">{SITE_SETTINGS.address}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-aka/10 rounded-lg flex items-center justify-center text-aka flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm mb-1">WhatsApp</p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sumiText text-sm hover:text-aka transition-colors"
                    >
                      0857-8112-4502
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-aka/10 rounded-lg flex items-center justify-center text-aka flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm mb-1">Jam Operasional</p>
                    <p className="text-sumiText text-sm">{SITE_SETTINGS.operatingHours}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 pt-6 border-t border-borderGray">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-aka text-white font-medium rounded-full hover:bg-deepRed transition-colors"
                >
                  <Phone size={16} />
                  Hubungi via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
