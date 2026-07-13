import { useEffect } from "react";
import HeroSection from "@/sections/HeroSection";
import IntroductionSection from "@/sections/IntroductionSection";
import ProgramsSection from "@/sections/ProgramsSection";
import NewClassSection from "@/sections/NewClassSection";
import LearningJourneySection from "@/sections/LearningJourneySection";
import MethodsSection from "@/sections/MethodsSection";
import InstructorSection from "@/sections/InstructorSection";
import AdvantagesSection from "@/sections/AdvantagesSection";
import FacilitiesSection from "@/sections/FacilitiesSection";
import GallerySection from "@/sections/GallerySection";
import ReviewsSection from "@/sections/ReviewsSection";
import FAQSection from "@/sections/FAQSection";
import CTASection from "@/sections/CTASection";
import ContactMapSection from "@/sections/ContactMapSection";

export default function HomePage() {
  // Update page title and meta on mount
  useEffect(() => {
    document.title = "Pendaftaran Kelas Bahasa Jepang 3 Agustus 2026 | Minna No Gakkou";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Pendaftaran kelas baru Minna No Gakkou telah dibuka. Mulai belajar bahasa Jepang, budaya, dan komunikasi kerja Jepang pada 3 Agustus 2026. Daftar mulai sekarang.");
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <ProgramsSection />
      <NewClassSection />
      <LearningJourneySection />
      <MethodsSection />
      <InstructorSection />
      <AdvantagesSection />
      <FacilitiesSection />
      <GallerySection />
      <ReviewsSection />
      <FAQSection />
      <CTASection />
      <ContactMapSection />
    </>
  );
}
