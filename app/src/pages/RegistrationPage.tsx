import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Copy,
  CheckCircle,
  User,
  BookOpen,
  Settings,
  Shield,
} from "lucide-react";
import {
  EDUCATION_OPTIONS,
  JAPANESE_LEVEL_OPTIONS,
  PURPOSE_OPTIONS,
  SCHEDULE_OPTIONS,
  REFERRAL_OPTIONS,
  GENDER_OPTIONS,
  SITE_SETTINGS,
} from "@/data/siteData";

interface FormData {
  fullName: string;
  whatsapp: string;
  email: string;
  placeOfBirth: string;
  birthDate: string;
  gender: string;
  domicile: string;
  education: string;
  occupation: string;
  selectedProgram: string;
  japaneseLevel: string;
  preferredSchedule: string;
  purpose: string;
  referralSource: string;
  message: string;
  guardianName: string;
  guardianPhone: string;
  consentPrivacy: boolean;
  consentWhatsapp: boolean;
}

const INITIAL_DATA: FormData = {
  fullName: "",
  whatsapp: "",
  email: "",
  placeOfBirth: "",
  birthDate: "",
  gender: "",
  domicile: "",
  education: "",
  occupation: "",
  selectedProgram: "Kelas Baru — Mulai 3 Agustus 2026",
  japaneseLevel: "",
  preferredSchedule: "",
  purpose: "",
  referralSource: "",
  message: "",
  guardianName: "",
  guardianPhone: "",
  consentPrivacy: false,
  consentWhatsapp: false,
};

const STEPS = [
  { id: 1, label: "Data Diri", icon: <User size={18} /> },
  { id: 2, label: "Latar Belakang", icon: <BookOpen size={18} /> },
  { id: 3, label: "Program", icon: <Settings size={18} /> },
  { id: 4, label: "Konfirmasi", icon: <Shield size={18} /> },
];

function generateRegistrationId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MNG-${date}-${random}`;
}

function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }
  if (!cleaned.startsWith("62")) {
    cleaned = "62" + cleaned;
  }
  return cleaned;
}

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Formulir Pendaftaran | Minna No Gakkou";
    window.scrollTo(0, 0);
  }, []);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Nama lengkap wajib diisi";
      if (!formData.whatsapp.trim()) newErrors.whatsapp = "Nomor WhatsApp wajib diisi";
      else if (formData.whatsapp.replace(/\D/g, "").length < 10) {
        newErrors.whatsapp = "Nomor WhatsApp tidak valid";
      }
      if (!formData.placeOfBirth.trim()) newErrors.placeOfBirth = "Tempat lahir wajib diisi";
      if (!formData.birthDate) newErrors.birthDate = "Tanggal lahir wajib diisi";
      else {
        const birthDate = new Date(formData.birthDate);
        const today = new Date();
        if (birthDate > today) newErrors.birthDate = "Tanggal lahir tidak valid";
      }
      if (!formData.gender) newErrors.gender = "Jenis kelamin wajib dipilih";
      if (!formData.domicile.trim()) newErrors.domicile = "Alamat/domisili wajib diisi";
    }

    if (step === 2) {
      if (!formData.education) newErrors.education = "Pendidikan terakhir wajib dipilih";
    }

    if (step === 3) {
      if (!formData.selectedProgram) newErrors.selectedProgram = "Program wajib dipilih";
      if (!formData.japaneseLevel) newErrors.japaneseLevel = "Level bahasa Jepang wajib dipilih";
      if (!formData.preferredSchedule) newErrors.preferredSchedule = "Jadwal wajib dipilih";
      if (!formData.purpose) newErrors.purpose = "Tujuan wajib dipilih";
    }

    if (step === 4) {
      if (!formData.consentPrivacy) {
        newErrors.consentPrivacy = "Anda harus menyetujui kebijakan privasi";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    // Generate registration ID
    const regId = generateRegistrationId();
    setRegistrationId(regId);

    // Simulate saving to database (would be an API call in production)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Save to localStorage for demo admin view
    const registrations = JSON.parse(localStorage.getItem("mng_registrations") || "[]");
    registrations.push({
      ...formData,
      id: regId,
      registrationNumber: regId,
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      intakeName: "Kelas Agustus 2026",
      intakeStartDate: "2026-08-03",
    });
    localStorage.setItem("mng_registrations", JSON.stringify(registrations));

    setSubmitted(true);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generateWhatsAppMessage = (): string => {
    return `Halo Admin Minna No Gakkou,

Saya telah mengisi formulir pendaftaran melalui website dan ingin melanjutkan proses pendaftaran.

Nomor Pendaftaran: ${registrationId}
Periode Kelas: Kelas Agustus 2026
Tanggal Mulai Kelas: 3 Agustus 2026
Nama Lengkap: ${formData.fullName}
Nomor WhatsApp: ${formData.whatsapp}
Tempat, Tanggal Lahir: ${formData.placeOfBirth}, ${formData.birthDate}
Domisili: ${formData.domicile}
Pendidikan Terakhir: ${formData.education}
Program yang Diminati: ${formData.selectedProgram}
Kemampuan Bahasa Jepang: ${formData.japaneseLevel}
Pilihan Jadwal: ${formData.preferredSchedule}
Tujuan Pelatihan: ${formData.purpose}
Pesan/Pertanyaan: ${formData.message || "-"}
Sumber Informasi: ${formData.referralSource || "-"}

Mohon informasi mengenai jadwal, biaya, persyaratan, dan proses pendaftaran kelas yang dimulai pada 3 Agustus 2026.

Terima kasih.`;
  };

  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent(generateWhatsAppMessage())}`;

  const copyRegId = () => {
    navigator.clipboard.writeText(registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-wash pt-24 pb-16">
        <div className="container-main max-w-lg">
          <div className="bg-white rounded-3xl border border-borderGray shadow-soft p-8 md:p-10 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-success" />
            </div>
            
            <h1 className="font-serif text-2xl text-ink mb-2">
              Pendaftaran Berhasil!
            </h1>
            <p className="text-sumiText text-sm mb-6">
              Data Anda telah tersimpan. Silakan lanjutkan ke WhatsApp untuk konfirmasi.
            </p>

            {/* Registration ID */}
            <div className="bg-kinari rounded-xl p-4 mb-6 border border-borderGray">
              <p className="text-warmGray text-xs mb-1">Nomor Pendaftaran</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-lg font-semibold text-ink">{registrationId}</span>
                <button
                  onClick={copyRegId}
                  className="p-1.5 hover:bg-borderGray rounded transition-colors"
                  aria-label="Salin nomor pendaftaran"
                >
                  {copied ? <Check size={16} className="text-success" /> : <Copy size={16} className="text-warmGray" />}
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <MessageCircle size={18} />
                Lanjutkan ke WhatsApp
              </a>
              <Link to="/" className="btn-secondary w-full justify-center">
                Kembali ke Beranda
              </Link>
            </div>

            <p className="text-warmGray text-xs mt-5">
              Jika WhatsApp tidak terbuka otomatis, silakan hubungi admin di nomor{" "}
              <strong>0857-8112-4502</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-wash pt-24 pb-16">
      <div className="container-main max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="jp-eyebrow mb-2" lang="ja">登録フォーム</p>
          <h1 className="font-serif text-2xl md:text-3xl text-ink mb-2">
            Formulir Pendaftaran Minna No Gakkou
          </h1>
          <p className="text-sumiText text-sm">
            Pendaftaran Kelas Baru — Mulai 3 Agustus 2026
          </p>
          <p className="text-warmGray text-xs mt-2">
            Isi formulir berikut untuk mengikuti proses pendaftaran kelas baru Minna No Gakkou.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    currentStep > step.id
                      ? "bg-success text-white"
                      : currentStep === step.id
                      ? "bg-aka text-white"
                      : "bg-borderGray text-warmGray"
                  }`}
                >
                  {currentStep > step.id ? <Check size={18} /> : step.icon}
                </div>
                <span
                  className={`text-xs mt-1.5 hidden sm:block ${
                    currentStep >= step.id ? "text-ink font-medium" : "text-warmGray"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          {/* Progress bar */}
          <div className="progress-step">
            <div
              className="progress-step-fill"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <p className="text-center text-xs text-warmGray mt-2">
            {currentStep} dari 4 — {STEPS[currentStep - 1].label}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-borderGray shadow-soft p-6 md:p-8">
          {/* Step 1: Personal Data */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="font-serif text-xl text-ink mb-4">Data Diri</h2>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-ink mb-1.5">
                  Nama Lengkap <span className="text-aka">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className={`input-jp ${errors.fullName ? "border-red-400 focus:ring-red-200" : ""}`}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-ink mb-1.5">
                  Nomor WhatsApp <span className="text-aka">*</span>
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  inputMode="tel"
                  value={formData.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value)}
                  className={`input-jp ${errors.whatsapp ? "border-red-400 focus:ring-red-200" : ""}`}
                  placeholder="Contoh: 085781124502"
                />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                <p className="text-warmGray text-xs mt-1">Format: 08xx atau 628xx</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                  Email <span className="text-warmGray">(opsional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="input-jp"
                  placeholder="email@contoh.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="placeOfBirth" className="block text-sm font-medium text-ink mb-1.5">
                    Tempat Lahir <span className="text-aka">*</span>
                  </label>
                  <input
                    id="placeOfBirth"
                    type="text"
                    value={formData.placeOfBirth}
                    onChange={(e) => updateField("placeOfBirth", e.target.value)}
                    className={`input-jp ${errors.placeOfBirth ? "border-red-400" : ""}`}
                    placeholder="Kota kelahiran"
                  />
                  {errors.placeOfBirth && <p className="text-red-500 text-xs mt-1">{errors.placeOfBirth}</p>}
                </div>
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-ink mb-1.5">
                    Tanggal Lahir <span className="text-aka">*</span>
                  </label>
                  <input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => updateField("birthDate", e.target.value)}
                    className={`input-jp ${errors.birthDate ? "border-red-400" : ""}`}
                  />
                  {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Jenis Kelamin <span className="text-aka">*</span>
                </label>
                <div className="flex gap-4">
                  {GENDER_OPTIONS.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={opt.value}
                        checked={formData.gender === opt.value}
                        onChange={(e) => updateField("gender", e.target.value)}
                        className="w-4 h-4 accent-aka"
                      />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label htmlFor="domicile" className="block text-sm font-medium text-ink mb-1.5">
                  Alamat/Domisili <span className="text-aka">*</span>
                </label>
                <textarea
                  id="domicile"
                  value={formData.domicile}
                  onChange={(e) => updateField("domicile", e.target.value)}
                  className={`input-jp min-h-[80px] resize-none ${errors.domicile ? "border-red-400" : ""}`}
                  placeholder="Alamat lengkap domisili saat ini"
                />
                {errors.domicile && <p className="text-red-500 text-xs mt-1">{errors.domicile}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Background */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="font-serif text-xl text-ink mb-4">Latar Belakang</h2>
              
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-ink mb-1.5">
                  Pendidikan Terakhir <span className="text-aka">*</span>
                </label>
                <select
                  id="education"
                  value={formData.education}
                  onChange={(e) => updateField("education", e.target.value)}
                  className={`input-jp ${errors.education ? "border-red-400" : ""}`}
                >
                  <option value="">Pilih pendidikan</option>
                  {EDUCATION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
              </div>

              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-ink mb-1.5">
                  Pekerjaan <span className="text-warmGray">(opsional)</span>
                </label>
                <input
                  id="occupation"
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => updateField("occupation", e.target.value)}
                  className="input-jp"
                  placeholder="Pekerjaan saat ini"
                />
              </div>

              <div>
                <label htmlFor="guardianName" className="block text-sm font-medium text-ink mb-1.5">
                  Nama Orang Tua/Wali <span className="text-warmGray">(opsional)</span>
                </label>
                <input
                  id="guardianName"
                  type="text"
                  value={formData.guardianName}
                  onChange={(e) => updateField("guardianName", e.target.value)}
                  className="input-jp"
                  placeholder="Nama orang tua atau wali"
                />
              </div>

              <div>
                <label htmlFor="guardianPhone" className="block text-sm font-medium text-ink mb-1.5">
                  Nomor Orang Tua/Wali <span className="text-warmGray">(opsional)</span>
                </label>
                <input
                  id="guardianPhone"
                  type="tel"
                  inputMode="tel"
                  value={formData.guardianPhone}
                  onChange={(e) => updateField("guardianPhone", e.target.value)}
                  className="input-jp"
                  placeholder="Nomor WhatsApp orang tua/wali"
                />
              </div>
            </div>
          )}

          {/* Step 3: Program Selection */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="font-serif text-xl text-ink mb-4">Pilihan Program</h2>
              
              <div>
                <label htmlFor="selectedProgram" className="block text-sm font-medium text-ink mb-1.5">
                  Program yang Diminati <span className="text-aka">*</span>
                </label>
                <select
                  id="selectedProgram"
                  value={formData.selectedProgram}
                  onChange={(e) => updateField("selectedProgram", e.target.value)}
                  className={`input-jp ${errors.selectedProgram ? "border-red-400" : ""}`}
                >
                  <option value="Kelas Baru — Mulai 3 Agustus 2026">Kelas Baru — Mulai 3 Agustus 2026</option>
                  <option value="Bahasa Jepang Dasar">Bahasa Jepang Dasar</option>
                  <option value="Persiapan JLPT N5">Persiapan JLPT N5</option>
                  <option value="Persiapan JLPT N4">Persiapan JLPT N4</option>
                  <option value="Percakapan Bahasa Jepang">Percakapan Bahasa Jepang</option>
                  <option value="Bahasa Jepang untuk Kaigo">Bahasa Jepang untuk Kaigo</option>
                  <option value="Budaya dan Etika Kerja Jepang">Budaya dan Etika Kerja Jepang</option>
                  <option value="Persiapan Wawancara">Persiapan Wawancara</option>
                  <option value="Kelas Privat">Kelas Privat</option>
                  <option value="Program Intensif">Program Intensif</option>
                </select>
                {errors.selectedProgram && <p className="text-red-500 text-xs mt-1">{errors.selectedProgram}</p>}
              </div>

              <div>
                <label htmlFor="japaneseLevel" className="block text-sm font-medium text-ink mb-1.5">
                  Kemampuan Bahasa Jepang <span className="text-aka">*</span>
                </label>
                <select
                  id="japaneseLevel"
                  value={formData.japaneseLevel}
                  onChange={(e) => updateField("japaneseLevel", e.target.value)}
                  className={`input-jp ${errors.japaneseLevel ? "border-red-400" : ""}`}
                >
                  <option value="">Pilih level</option>
                  {JAPANESE_LEVEL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.label}>{opt.label}</option>
                  ))}
                </select>
                {errors.japaneseLevel && <p className="text-red-500 text-xs mt-1">{errors.japaneseLevel}</p>}
              </div>

              <div>
                <label htmlFor="preferredSchedule" className="block text-sm font-medium text-ink mb-1.5">
                  Pilihan Jadwal <span className="text-aka">*</span>
                </label>
                <select
                  id="preferredSchedule"
                  value={formData.preferredSchedule}
                  onChange={(e) => updateField("preferredSchedule", e.target.value)}
                  className={`input-jp ${errors.preferredSchedule ? "border-red-400" : ""}`}
                >
                  <option value="">Pilih jadwal</option>
                  {SCHEDULE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.preferredSchedule && <p className="text-red-500 text-xs mt-1">{errors.preferredSchedule}</p>}
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-ink mb-1.5">
                  Tujuan Mengikuti Pelatihan <span className="text-aka">*</span>
                </label>
                <select
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => updateField("purpose", e.target.value)}
                  className={`input-jp ${errors.purpose ? "border-red-400" : ""}`}
                >
                  <option value="">Pilih tujuan</option>
                  {PURPOSE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.label}>{opt.label}</option>
                  ))}
                </select>
                {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
              </div>

              <div>
                <label htmlFor="referralSource" className="block text-sm font-medium text-ink mb-1.5">
                  Dari Mana Mengetahui Minna No Gakkou <span className="text-warmGray">(opsional)</span>
                </label>
                <select
                  id="referralSource"
                  value={formData.referralSource}
                  onChange={(e) => updateField("referralSource", e.target.value)}
                  className="input-jp"
                >
                  <option value="">Pilih sumber</option>
                  {REFERRAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                  Pertanyaan atau Pesan <span className="text-warmGray">(opsional)</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="input-jp min-h-[100px] resize-none"
                  placeholder="Tulis pertanyaan atau pesan Anda"
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="font-serif text-xl text-ink mb-4">Konfirmasi Data</h2>
              
              <div className="bg-kinari rounded-xl p-5 border border-borderGray space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-warmGray">Nama:</span>
                  <span className="text-ink font-medium">{formData.fullName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-warmGray">WhatsApp:</span>
                  <span className="text-ink">{normalizePhone(formData.whatsapp)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-warmGray">TTL:</span>
                  <span className="text-ink">{formData.placeOfBirth}, {formData.birthDate}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-warmGray">Domisili:</span>
                  <span className="text-ink">{formData.domicile}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-warmGray">Pendidikan:</span>
                  <span className="text-ink">{formData.education}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-warmGray">Program:</span>
                  <span className="text-ink font-medium">{formData.selectedProgram}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-warmGray">Level Jepang:</span>
                  <span className="text-ink">{formData.japaneseLevel}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-warmGray">Jadwal:</span>
                  <span className="text-ink">{formData.preferredSchedule}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-warmGray">Tujuan:</span>
                  <span className="text-ink">{formData.purpose}</span>
                </div>
              </div>

              {/* Consent checkboxes */}
              <div className="space-y-3 pt-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentPrivacy}
                    onChange={(e) => updateField("consentPrivacy", e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-aka"
                  />
                  <span className="text-sm text-sumiText">
                    Saya menyetujui{" "}
                    <Link to="/kebijakan-privasi" className="text-aka hover:underline" target="_blank">
                      Kebijakan Privasi
                    </Link>{" "}
                    dan pemrosesan data pribadi saya oleh Minna No Gakkou. <span className="text-aka">*</span>
                  </span>
                </label>
                {errors.consentPrivacy && <p className="text-red-500 text-xs">{errors.consentPrivacy}</p>}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentWhatsapp}
                    onChange={(e) => updateField("consentWhatsapp", e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-aka"
                  />
                  <span className="text-sm text-sumiText">
                    Saya bersedia menerima informasi dan konfirmasi melalui WhatsApp.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-borderGray">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                currentStep === 1
                  ? "text-warmGray cursor-not-allowed"
                  : "text-ink hover:bg-kinari"
              }`}
            >
              <ChevronLeft size={16} />
              Sebelumnya
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-aka text-white rounded-full text-sm font-medium hover:bg-deepRed transition-colors"
              >
                Lanjutkan
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-2.5 bg-aka text-white rounded-full text-sm font-medium hover:bg-deepRed transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    Kirim Pendaftaran
                    <Check size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
