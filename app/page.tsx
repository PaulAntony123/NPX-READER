import Image from "next/image";
import Link from "next/link";
import { fetchMangaList, fetchManhwaList, getCoverUrl, getMangaTitle } from "@/lib/mangadex";
import { Navbar } from "@/components/Navbar";
import { FadeIn, HoverScale } from "@/components/ClientMotion";
import { Play, Plus, TrendingUp, Sparkles, Zap, ChevronRight, Bookmark } from "lucide-react";

export default async function Home() {
  const trendingManga = await fetchMangaList(6);
  const trendingManhwa = await fetchManhwaList(6);
  const featured = trendingManga[0];

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      {/* Hero Section */}
      {featured && (
        <section className="relative h-[80vh] flex items-center px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src={getCoverUrl(featured)} 
              alt="Hero Banner" 
              fill 
              sizes="100vw"
              className="object-cover opacity-50 grayscale-[0.2] blur-[2px] scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <FadeIn>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/30 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Trending Now
                </span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                  🔥 {featured.attributes.status}
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-[0.9]">
                {getMangaTitle(featured)}
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-10 line-clamp-3 leading-relaxed max-w-2xl font-medium">
                {featured.attributes.description.en || "Experience the next level of storytelling in this critically acclaimed series."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href={`/manga/${featured.id}`} 
                  className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 glow flex items-center gap-3 text-lg"
                >
                  <Play className="w-5 h-5 fill-current" /> Start Reading
                </Link>
                <button className="glass hover:bg-white/10 text-white px-10 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 text-lg">
                  <Plus className="w-5 h-5" /> Add to Library
                </button>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <main className="px-6 md:px-12 -mt-10 relative z-10 space-y-24">
        {/* Trending Manga */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Trending Manga</h2>
            </div>
            <Link href="/manga" className="group flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase hover:opacity-80 transition-opacity">
              See Full Catalog <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {trendingManga.map((manga, i) => (
              <FadeIn key={manga.id} delay={i * 0.05}>
                <Link href={`/manga/${manga.id}`} className="group block">
                  <HoverScale>
                    <div className="relative aspect-[2/3] rounded-3xl overflow-hidden border border-white/5 bg-card shadow-2xl">
                      <Image 
                        src={getCoverUrl(manga)} 
                        alt={getMangaTitle(manga)} 
                        fill 
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-5 left-5 right-5">
                        <span className="text-[10px] font-black text-primary block mb-1 uppercase tracking-widest">
                          {manga.attributes.status}
                        </span>
                        <p className="text-sm font-bold line-clamp-1 group-hover:text-primary transition-colors leading-tight">
                          {getMangaTitle(manga)}
                        </p>
                      </div>
                    </div>
                  </HoverScale>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Popular Manhwa */}
        <section className="bg-card/20 rounded-[40px] p-8 md:p-12 border border-white/5">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-accent p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Popular Manhwa</h2>
            </div>
            <Link href="/manhwa" className="group flex items-center gap-2 text-accent text-sm font-bold tracking-widest uppercase hover:opacity-80 transition-opacity">
              Explore All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {trendingManhwa.map((manga, i) => (
              <FadeIn key={manga.id} delay={i * 0.1}>
                <Link href={`/manga/${manga.id}`} className="group">
                  <HoverScale>
                    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 shadow-xl bg-card">
                      <Image 
                        src={getCoverUrl(manga)} 
                        alt={getMangaTitle(manga)} 
                        fill 
                        sizes="(max-width: 640px) 50vw, 16vw"
                        className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="mt-4 text-sm font-bold line-clamp-1 group-hover:text-accent transition-colors">
                      {getMangaTitle(manga)}
                    </p>
                  </HoverScale>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Community Call to Action */}
        <section className="relative rounded-[40px] overflow-hidden py-20 px-8 text-center bg-primary/10 border border-primary/20">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Bookmark className="w-64 h-64 text-primary" />
          </div>
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Join the Raven Community</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-medium">
              Create your library, track your progress, and get notified about new chapters. Join thousands of readers today.
            </p>
            <button className="bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-2xl font-bold transition-all hover:scale-105 glow shadow-2xl shadow-primary/40">
              Create Free Account
            </button>
          </FadeIn>
        </section>
      </main>

      {/* Detailed Footer */}
      <footer className="mt-40 border-t border-white/5 px-6 md:px-12 py-24 bg-card/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-3xl font-black tracking-tighter text-primary mb-8 block">
              N P X <span className="text-white">READER</span>
            </Link>
            <p className="text-gray-400 max-w-sm text-lg leading-relaxed">
              Designed for the modern reader. Experience manga and manhwa with unparalleled speed, quality, and aesthetics.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 col-span-1 md:col-span-2">
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Explore</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-primary transition-colors">Discover</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Trending</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">New Releases</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">API Docs</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500 font-medium">© 2026 N P X READER. Built for the elite.</p>
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Discord</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
