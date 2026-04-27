import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchMangaDetails, fetchMangaFeed, getCoverUrl, getMangaTitle, getMangaDescription } from "@/lib/mangadex";
import { Navbar } from "@/components/Navbar";
import { FadeIn } from "@/components/ClientMotion";
import { BookOpen, Calendar, Clock, Star, Play, Plus } from "lucide-react";

export default async function MangaDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const manga = await fetchMangaDetails(id);
  
  if (!manga) {
    notFound();
  }

  const chapters = await fetchMangaFeed(id);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[50vh] w-full">
        <Image 
          src={getCoverUrl(manga)} 
          alt={getMangaTitle(manga)} 
          fill 
          sizes="100vw"
          className="object-cover opacity-30 grayscale-[0.3] blur-2xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <main className="px-6 md:px-12 -mt-64 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Cover & Action */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <FadeIn>
              <div className="relative aspect-[2/3] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 group">
                <Image 
                  src={getCoverUrl(manga)} 
                  alt={getMangaTitle(manga)} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              {chapters.length > 0 && (
                <Link 
                  href={`/manga/${manga.id}/${chapters[chapters.length - 1].id}`}
                  className="w-full mt-8 bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/20"
                >
                  <Play className="w-5 h-5 fill-current" /> Read First Chapter
                </Link>
              )}
              <button className="w-full mt-4 glass hover:bg-white/10 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3">
                <Plus className="w-5 h-5" /> Add to Library
              </button>
            </FadeIn>
          </div>

          {/* Info */}
          <div className="flex-1 lg:pt-32">
            <FadeIn delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-black border border-primary/30 uppercase tracking-widest">
                  {manga.attributes.status}
                </span>
                <span className="bg-white/5 text-gray-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/5 flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {manga.attributes.contentRating}
                </span>
                <span className="bg-white/5 text-gray-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/5 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> {(manga as any).attributes?.year || 'N/A'}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter leading-tight">{getMangaTitle(manga)}</h1>
              <p className="text-primary font-bold mb-8 uppercase tracking-[0.2em] text-sm flex items-center gap-3">
                <span className="w-8 h-[2px] bg-primary" /> Official Digital Release
              </p>
              
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> Synopsis
                </h2>
                <p className="text-gray-400 leading-relaxed text-lg max-w-4xl font-medium">
                  {getMangaDescription(manga)}
                </p>
              </div>

              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" /> Recent Chapters
                  </h2>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{chapters.length} Chapters Available</span>
                </div>
                
                <div className="grid gap-4">
                  {chapters.map((chapter: any, i: number) => (
                    <Link 
                      key={chapter.id} 
                      href={`/manga/${manga.id}/${chapter.id}`}
                      className="bg-card hover:bg-card-hover p-6 rounded-2xl border border-white/5 flex items-center justify-between group transition-all hover:translate-x-2"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center font-black text-primary border border-white/5 group-hover:bg-primary group-hover:text-white transition-colors">
                          {chapter.attributes.chapter || '?'}
                        </div>
                        <div>
                          <p className="font-bold text-lg group-hover:text-primary transition-colors">
                            {chapter.attributes.title || `Chapter ${chapter.attributes.chapter}`}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">
                            EN | {new Date(chapter.attributes.publishAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="bg-white/5 group-hover:bg-primary text-white p-3 rounded-xl transition-all">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                    </Link>
                  ))}
                  {chapters.length === 0 && (
                    <div className="bg-card/50 p-12 rounded-[32px] text-center border border-dashed border-white/10">
                      <p className="text-gray-500 italic font-medium">No English chapters found for this series.</p>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </div>
  );
}
