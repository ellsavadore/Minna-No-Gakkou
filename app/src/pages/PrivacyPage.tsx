import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Kebijakan Privasi | Minna No Gakkou";
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
              <Shield size={20} className="text-aka" />
            </div>
            <div>
              <h1 className="font-serif text-2xl text-ink">Kebijakan Privasi</h1>
              <p className="text-warmGray text-sm">Minna No Gakkou (みんなの学校)</p>
            </div>
          </div>

          <div className="space-y-6 text-sumiText text-sm leading-relaxed">
            <section>
              <h2 className="font-serif text-lg text-ink mb-2">1. Pendahuluan</h2>
              <p>
                Minna No Gakkou berkomitmen untuk melindungi privasi dan data pribadi setiap pengguna website dan calon peserta. 
                Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi Anda.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">2. Data yang Kami Kumpulkan</h2>
              <p className="mb-2">Kami mengumpulkan data berikut melalui formulir pendaftaran:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nama lengkap</li>
                <li>Nomor WhatsApp</li>
                <li>Alamat email (opsional)</li>
                <li>Tempat dan tanggal lahir</li>
                <li>Jenis kelamin</li>
                <li>Alamat domisili</li>
                <li>Pendidikan terakhir</li>
                <li>Informasi program yang diminati</li>
                <li>Level kemampuan bahasa Jepang</li>
                <li>Tujuan mengikuti pelatihan</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">3. Tujuan Pengumpulan Data</h2>
              <p className="mb-2">Data yang dikumpulkan digunakan untuk:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Proses pendaftaran dan administrasi peserta</li>
                <li>Komunikasi mengenai program dan jadwal</li>
                <li>Penyusunan kurikulum yang sesuai dengan kebutuhan peserta</li>
                <li>Evaluasi dan peningkatan kualitas layanan</li>
                <li>Dokumentasi legalitas sesuai ketentuan yang berlaku</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">4. Penyimpanan dan Keamanan Data</h2>
              <p>
                Data pribadi Anda disimpan secara aman dalam sistem kami. Kami menerapkan langkah-langkah keamanan 
                teknis dan organisasional yang sesuai untuk melindungi data dari akses, pengubahan, pengungkapan, 
                atau penghancuran yang tidak sah.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">5. Pengiriman Data melalui WhatsApp</h2>
              <p>
                Setelah mengisi formulir pendaftaran, data Anda akan dikirimkan ke admin Minna No Gakkou 
                melalui WhatsApp untuk proses konfirmasi dan tindak lanjut. Dengan mengisi formulir, 
                Anda memberikan persetujuan untuk pengiriman data ini.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">6. Penggunaan Layanan Google</h2>
              <p>
                Website ini menggunakan Google Maps Embed API untuk menampilkan lokasi dan Google Business Profile 
                untuk menampilkan ulasan. Penggunaan layanan ini tunduk pada kebijakan privasi Google.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">7. Cookie dan Analytics</h2>
              <p>
                Website ini mungkin menggunakan cookie untuk meningkatkan pengalaman pengguna. 
                Kami juga dapat menggunakan alat analytics untuk memahami perilaku pengunjung website. 
                Data analytics bersifat anonim dan tidak mengidentifikasi individu.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">8. Hak Anda</h2>
              <p className="mb-2">Anda memiliki hak untuk:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mengakses data pribadi yang kami miliki tentang Anda</li>
                <li>Meminta koreksi data yang tidak akurat</li>
                <li>Meminta penghapusan data pribadi Anda</li>
                <li>Menarik persetujuan penggunaan data</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">9. Permintaan Penghapusan Data</h2>
              <p>
                Untuk mengajukan permintaan penghapusan data atau pertanyaan lain mengenai privasi, 
                silakan hubungi kami melalui WhatsApp di nomor{" "}
                <a href="https://wa.me/6285781124502" className="text-aka hover:underline">0857-8112-4502</a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">10. Perubahan Kebijakan</h2>
              <p>
                Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan akan diumumkan 
                melalui website ini. Penggunaan berkelanjutan atas website ini setelah perubahan 
                merupakan persetujuan Anda terhadap kebijakan yang diperbarui.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-lg text-ink mb-2">11. Kontak</h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami melalui:
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
