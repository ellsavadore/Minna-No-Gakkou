import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[100dvh] bg-wash flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="font-serif text-8xl md:text-9xl text-aka/20 font-bold">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-jp text-4xl text-aka" lang="ja">見つかりません</span>
            </div>
          </div>
        </div>

        <h1 className="font-serif text-2xl text-ink mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sumiText text-sm leading-relaxed mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan, 
          dihapus, atau URL yang Anda masukkan tidak benar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Home size={16} />
            Kembali ke Beranda
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary"
          >
            <ArrowLeft size={16} />
            Halaman Sebelumnya
          </button>
        </div>

        <p className="text-warmGray text-xs mt-8">
          Minna No Gakkou — みんなの学校
        </p>
      </div>
    </div>
  );
}
