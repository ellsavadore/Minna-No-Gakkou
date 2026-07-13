import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  useEffect(() => {
    document.title = "Syarat dan Ketentuan | Minna No Gakkou";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-wash pt-24 pb-16">
      <div className="container-main max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-warmGray hover:text-aka transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-2xl border border-borderGray shadow-soft p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-aka/10 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-aka" />
            </div>
            <div>
              <h1 className="font-serif text-2xl text-ink">Syarat dan Ketentuan</h1>
              <p className="text-warmGray text-sm">Minna No Gakkou (みんなの学校)</p>
            </div>
          </div>

          <div className="space-y-6 text-sumiText text-sm leading-relaxed">
            <section>
              <h2 className="font-serif text-lg text-ink mb-2">1. Ketentuan Umum</h2>
              <p>
                Dengan mengakses dan menggunakan website Minna No Gakkou, Anda menyetujui untuk terikat 
                oleh syarat dan ketentuan ini. Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, 
                mohon untuk tidak menggunakan website ini.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">2. Definisi</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>"Kami"</strong> merujuk pada Minna No Gakkou, lembaga pelatihan bahasa Jepang.</li>
                <li><strong>"Anda"</strong> merujuk pada pengguna website atau calon peserta.</li>
                <li><strong>"Program"</strong> merujuk pada kelas dan pelatihan yang ditawarkan oleh Minna No Gakkou.</li>
                <li><strong>"Pendaftaran"</strong> merujuk pada proses pengisian formulir dan pengajuan permohonan bergabung.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">3. Pendaftaran Program</h2>
              <p className="mb-2">
                Untuk mendaftar program pelatihan, Anda harus:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mengisi formulir pendaftaran dengan data yang akurat dan lengkap</li>
                <li>Memberikan informasi kontak yang valid (terutama nomor WhatsApp)</li>
                <li>Menyetujui kebijakan privasi dan pemrosesan data pribadi</li>
                <li>Memenuhi persyaratan umum program yang dipilih</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">4. Informasi dan Transparansi</h2>
              <p>
                Minna No Gakkou berkomitmen untuk memberikan informasi yang transparan mengenai program, 
                jadwal, biaya, dan proses pendaftaran. Kami tidak memberikan jaminan otomatis mengenai 
                kelulusan, visa, penempatan, maupun keberangkatan ke Jepang. Hasil setiap peserta 
                bergantung pada kemampuan individu, kedisiplinan, persyaratan program, dan ketentuan yang berlaku.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">5. Pembayaran dan Biaya</h2>
              <p>
                Informasi mengenai biaya program akan diberikan secara transparan saat konsultasi 
                atau melalui komunikasi langsung dengan admin. Pembayaran dilakukan sesuai dengan 
                prosedur yang telah disepakati. Pendaftaran awal tidak dipungut biaya konsultasi.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">6. Pembatalan dan Pengembalian</h2>
              <p>
                Ketentuan pembatalan dan pengembalian biaya (jika berlaku) akan diinformasikan 
                secara jelas saat proses pendaftaran. Silakan berkonsultasi dengan admin untuk 
                informasi lebih lanjut mengenai kebijakan ini.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">7. Kedisiplinan dan Etika</h2>
              <p>
                Peserta program diharapkan mematuhi peraturan dan ketentuan yang berlaku di Minna No Gakkou, 
                termasuk etika belajar, ketepatan waktu, dan sikap sopan santun sesuai dengan 
                nilai-nilai yang dianut lembaga ini.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">8. Konten Website</h2>
              <p>
                Seluruh konten di website ini, termasuk teks, gambar, logo, dan desain, merupakan 
                milik Minna No Gakkou dan dilindungi oleh undang-undang hak cipta. Dilarang 
                menyalin, mendistribusikan, atau menggunakan konten ini tanpa izin tertulis.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">9. Batasan Tanggung Jawab</h2>
              <p>
                Minna No Gakkou tidak bertanggung jawab atas kerugian langsung atau tidak langsung 
                yang timbul dari penggunaan website ini atau layanan yang diberikan, kecuali jika 
                kerugian tersebut disebabkan oleh kelalaian berat dari pihak kami.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">10. Perubahan Ketentuan</h2>
              <p>
                Kami berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan 
                efektif sejak dipublikasikan di website. Penggunaan berkelanjutan atas website ini 
                setelah perubahan merupakan persetujuan Anda terhadap ketentuan yang diperbarui.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">11. Hukum yang Berlaku</h2>
              <p>
                Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia. Setiap perselisihan 
                yang timbul akan diselesaikan secara musyawarah. Jika tidak tercapai kesepakatan, 
                perselisihan akan diselesaikan melalui lembaga yang berwenang di Indonesia.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">12. Kontak</h2>
              <p>
                Untuk pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami melalui:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>WhatsApp: <a href="https://wa.me/6285781124502" className="text-aka hover:underline">0857-8112-4502</a></li>
                <li>Email: info@minnanogakkou.id</li>
              </ul>
            </section>

            <p className="text-warmGray text-xs pt-4 border-t border-borderGray">
              Terakhir diperbarui: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
