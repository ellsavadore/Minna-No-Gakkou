import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserPlus,
  TrendingUp,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Phone,
  GraduationCap,
  Clock,
} from "lucide-react";
import type { RegistrationData } from "@/types";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  new: { label: "Baru", color: "bg-blue-100 text-blue-700" },
  contacted: { label: "Dihubungi", color: "bg-yellow-100 text-yellow-700" },
  consultation: { label: "Konsultasi", color: "bg-purple-100 text-purple-700" },
  waiting_docs: { label: "Menunggu Dokumen", color: "bg-orange-100 text-orange-700" },
  registered: { label: "Terdaftar", color: "bg-success/10 text-success" },
  not_proceeding: { label: "Tidak Melanjutkan", color: "bg-red-100 text-red-700" },
  completed: { label: "Selesai", color: "bg-gray-100 text-gray-700" },
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReg, setSelectedReg] = useState<RegistrationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    document.title = "Dashboard Admin | Minna No Gakkou";
    // Load registrations from localStorage
    const stored = JSON.parse(localStorage.getItem("mng_registrations") || "[]");
    setRegistrations(stored);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - in production, use proper auth
    if (password === "admin-mng-2026") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Password tidak valid");
    }
  };

  const filtered = registrations
    .filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          r.fullName.toLowerCase().includes(q) ||
          r.whatsapp.includes(q) ||
          r.registrationNumber.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const exportCSV = () => {
    const headers = [
      "No. Pendaftaran", "Nama", "WhatsApp", "Email", "TTL", "Gender",
      "Domisili", "Pendidikan", "Program", "Level Jepang", "Jadwal",
      "Tujuan", "Status", "Tanggal Daftar",
    ];
    const rows = filtered.map((r) => [
      r.registrationNumber, r.fullName, r.whatsapp, r.email || "",
      `${r.placeOfBirth}, ${r.birthDate}`, r.gender, r.domicile,
      r.education, r.selectedProgram, r.japaneseLevel, r.preferredSchedule,
      r.purpose, STATUS_MAP[r.status]?.label || r.status,
      new Date(r.createdAt).toLocaleDateString("id-ID"),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pendaftaran-mng-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const updateStatus = (id: string, newStatus: RegistrationData["status"]) => {
    const updated = registrations.map((r) =>
      r.id === id ? { ...r, status: newStatus, updatedAt: new Date().toISOString() } : r
    );
    setRegistrations(updated);
    localStorage.setItem("mng_registrations", JSON.stringify(updated));
    if (selectedReg && selectedReg.id === id) {
      setSelectedReg({ ...selectedReg, status: newStatus });
    }
  };

  // Stats
  const stats = {
    total: registrations.length,
    today: registrations.filter((r) => {
      const d = new Date(r.createdAt);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }).length,
    thisMonth: registrations.filter((r) => {
      const d = new Date(r.createdAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length,
    newCount: registrations.filter((r) => r.status === "new").length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] bg-wash flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-borderGray shadow-soft p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-aka/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={28} className="text-aka" />
            </div>
            <h1 className="font-serif text-xl text-ink mb-1">Dashboard Admin</h1>
            <p className="text-warmGray text-sm">Minna No Gakkou</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-ink mb-1.5">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
                className={`input-jp ${loginError ? "border-red-400" : ""}`}
                placeholder="Masukkan password"
              />
              {loginError && <p className="text-red-500 text-xs mt-1">{loginError}</p>}
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              Masuk
            </button>
          </form>

          <Link
            to="/"
            className="block text-center text-sm text-warmGray hover:text-aka mt-4 transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-kinari pt-20 pb-8">
      <div className="container-main max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl text-ink">Dashboard Admin</h1>
            <p className="text-warmGray text-sm">Minna No Gakkou — Panel Pengelolaan Pendaftaran</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-warmGray hover:text-aka transition-colors">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Pendaftar", value: stats.total, icon: <Users size={18} />, color: "bg-aka/10 text-aka" },
            { label: "Hari Ini", value: stats.today, icon: <UserPlus size={18} />, color: "bg-success/10 text-success" },
            { label: "Bulan Ini", value: stats.thisMonth, icon: <TrendingUp size={18} />, color: "bg-ao/10 text-ao" },
            { label: "Status Baru", value: stats.newCount, icon: <Clock size={18} />, color: "bg-warning/10 text-warning" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-borderGray p-4 shadow-soft">
              <div className={`w-9 h-9 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-semibold text-ink">{stat.value}</p>
              <p className="text-warmGray text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warmGray" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, WA, no. daftar..."
                className="input-jp pl-9 text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-jp text-sm py-2.5"
            >
              <option value="all">Semua Status</option>
              {Object.entries(STATUS_MAP).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-borderGray rounded-xl text-sm text-ink hover:border-aka hover:text-aka transition-colors shadow-soft"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-xl border border-borderGray shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-borderGray bg-kinari/50">
                  <th className="text-left px-4 py-3 font-medium text-warmGray">No. Daftar</th>
                  <th className="text-left px-4 py-3 font-medium text-warmGray">Nama</th>
                  <th className="text-left px-4 py-3 font-medium text-warmGray hidden md:table-cell">Program</th>
                  <th className="text-left px-4 py-3 font-medium text-warmGray">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-warmGray hidden sm:table-cell">Tanggal</th>
                  <th className="text-left px-4 py-3 font-medium text-warmGray">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-warmGray">
                      Tidak ada data pendaftaran
                    </td>
                  </tr>
                ) : (
                  paginated.map((reg) => (
                    <tr key={reg.id} className="border-b border-borderGray/50 hover:bg-kinari/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{reg.registrationNumber}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-ink">{reg.fullName}</p>
                        <p className="text-xs text-warmGray">{reg.whatsapp}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-warmGray">{reg.selectedProgram}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_MAP[reg.status]?.color || ""}`}>
                          {STATUS_MAP[reg.status]?.label || reg.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-warmGray text-xs">
                        {new Date(reg.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedReg(reg)}
                            className="p-1.5 hover:bg-kinari rounded transition-colors"
                            aria-label="Lihat detail"
                          >
                            <Eye size={16} className="text-warmGray" />
                          </button>
                          <a
                            href={`https://wa.me/${reg.whatsapp.replace(/\D/g, "").startsWith("0") ? "62" + reg.whatsapp.replace(/\D/g, "").slice(1) : reg.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Halo ${reg.fullName}, terima kasih telah mendaftar di Minna No Gakkou.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:bg-green-50 rounded transition-colors"
                            aria-label="Chat WhatsApp"
                          >
                            <Phone size={16} className="text-green-600" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-borderGray">
              <p className="text-xs text-warmGray">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filtered.length)} dari {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 hover:bg-kinari rounded disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-warmGray">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 hover:bg-kinari rounded disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReg && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedReg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl shadow-elevated max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-borderGray flex items-center justify-between">
              <h2 className="font-serif text-lg text-ink">Detail Pendaftaran</h2>
              <button
                onClick={() => setSelectedReg(null)}
                className="p-1.5 hover:bg-kinari rounded transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_MAP[selectedReg.status]?.color}`}>
                  {STATUS_MAP[selectedReg.status]?.label}
                </span>
                <span className="font-mono text-xs text-warmGray">{selectedReg.registrationNumber}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-warmGray text-xs">Nama</p>
                  <p className="text-ink font-medium">{selectedReg.fullName}</p>
                </div>
                <div>
                  <p className="text-warmGray text-xs">WhatsApp</p>
                  <p className="text-ink">{selectedReg.whatsapp}</p>
                </div>
                <div>
                  <p className="text-warmGray text-xs">TTL</p>
                  <p className="text-ink">{selectedReg.placeOfBirth}, {selectedReg.birthDate}</p>
                </div>
                <div>
                  <p className="text-warmGray text-xs">Gender</p>
                  <p className="text-ink capitalize">{selectedReg.gender}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-warmGray text-xs">Domisili</p>
                  <p className="text-ink">{selectedReg.domicile}</p>
                </div>
                <div>
                  <p className="text-warmGray text-xs">Pendidikan</p>
                  <p className="text-ink">{selectedReg.education}</p>
                </div>
                <div>
                  <p className="text-warmGray text-xs">Program</p>
                  <p className="text-ink">{selectedReg.selectedProgram}</p>
                </div>
                <div>
                  <p className="text-warmGray text-xs">Level Jepang</p>
                  <p className="text-ink">{selectedReg.japaneseLevel}</p>
                </div>
                <div>
                  <p className="text-warmGray text-xs">Jadwal</p>
                  <p className="text-ink">{selectedReg.preferredSchedule}</p>
                </div>
                <div>
                  <p className="text-warmGray text-xs">Tujuan</p>
                  <p className="text-ink">{selectedReg.purpose}</p>
                </div>
                <div>
                  <p className="text-warmGray text-xs">Sumber</p>
                  <p className="text-ink">{selectedReg.referralSource || "-"}</p>
                </div>
              </div>

              {selectedReg.message && (
                <div>
                  <p className="text-warmGray text-xs mb-1">Pesan</p>
                  <p className="text-ink text-sm bg-kinari rounded-lg p-3">{selectedReg.message}</p>
                </div>
              )}

              {/* Update Status */}
              <div className="pt-4 border-t border-borderGray">
                <p className="text-sm font-medium text-ink mb-2">Ubah Status</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(STATUS_MAP).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => updateStatus(selectedReg.id!, key as RegistrationData["status"])}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        selectedReg.status === key
                          ? val.color
                          : "bg-kinari text-warmGray hover:bg-borderGray"
                      }`}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
