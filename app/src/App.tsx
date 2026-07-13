import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InfoBar from "@/components/InfoBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import HomePage from "@/pages/HomePage";
import RegistrationPage from "@/pages/RegistrationPage";
import BlogPage from "@/pages/BlogPage";
import ArticlePage from "@/pages/ArticlePage";
import AdminPage from "@/pages/AdminPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-wash">
      <InfoBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/daftar" element={<RegistrationPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/kebijakan-privasi" element={<PrivacyPage />} />
          <Route path="/syarat-ketentuan" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
