import { useParams, Link, useNavigate } from "react-router-dom";
import { ARTICLES } from "@/data/siteData";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = ARTICLES.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="section-pad bg-wash min-h-screen">
        <div className="container-main text-center">
          <h1 className="heading-section mb-4">Artikel tidak ditemukan</h1>
          <p className="body-md mb-8">Maaf, artikel yang Anda cari tidak tersedia atau sudah dipindahkan.</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-primary"
          >
            Kembali
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad bg-wash min-h-screen">
      <div className="container-main max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <p className="jp-eyebrow mb-3" lang="ja">記事</p>
          <h1 className="heading-section mb-4">{article.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-wash/80">
            <span>{article.publishedDate}</span>
            <span>{article.readTime}</span>
            <span>{article.level}</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] shadow-soft mb-10">
          <img src={article.image} alt={article.title} className="w-full h-[420px] object-cover" />
        </div>

        <div className="space-y-6 text-sumiText">
          <p className="body-lg leading-relaxed">
            {article.excerpt}
          </p>
          {article.content.map((paragraph, index) => (
            <p key={index} className="body-md leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="bg-white/90 border border-borderGray rounded-3xl p-6">
            <h2 className="font-serif text-2xl mb-4">Intisari yang Harus Anda Ingat</h2>
            <ul className="list-disc list-inside space-y-3 text-sumiText">
              <li>Pelajari alfabet dan partikel sebagai fondasi utama.</li>
              <li>Gunakan konteks nyata dalam percakapan agar bahasa terasa alami.</li>
              <li>Praktik setiap hari melalui bacaan, mendengar, dan menulis.</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/blog" className="btn-secondary">
              Kembali ke Blog
            </Link>
            <a href="https://wa.me/6285781124502" target="_blank" rel="noreferrer" className="btn-primary">
              Konsultasi Materi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
