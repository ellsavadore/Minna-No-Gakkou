import { Link } from "react-router-dom";
import { ARTICLES } from "@/data/siteData";

export default function BlogPage() {
  return (
    <section className="section-pad bg-wash min-h-screen">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="jp-eyebrow mb-3" lang="ja">記事</p>
          <h1 className="heading-section mb-4 text-balance">Artikel Materi N5 dan N4</h1>
          <p className="body-md mx-auto max-w-2xl">
            Koleksi tulisan berkualitas tentang pembelajaran Hiragana, Katakana, kanji, tata bahasa, dan percakapan N5/N4 dengan sentuhan seni dan cerita visual.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {ARTICLES.map((article) => (
            <article key={article.id} className="card-jp overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/80">{article.level}</p>
                  <h2 className="mt-2 text-xl font-semibold">{article.title}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="body-md text-sumiText mb-4">{article.excerpt}</p>
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-wash/80">
                  <span>{article.publishedDate}</span>
                  <span>{article.readTime}</span>
                </div>
                <Link
                  to={`/blog/${article.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-aka font-medium hover:text-deepRed"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
