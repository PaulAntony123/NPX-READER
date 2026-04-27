import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchMangaDetails, fetchChapterPages, getMangaTitle } from "@/lib/mangadex";
import { ChevronLeft, Home, Settings, ChevronRight, Maximize2, Menu } from "lucide-react";
import { FadeIn } from "@/components/ClientMotion";

export default async function ReaderPage({ params }: { params: Promise<{ id: string, chapter: string }> }) {
  const { id, chapter: chapterId } = await params;
  const manga = await fetchMangaDetails(id);
  const pages = await fetchChapterPages(chapterId);

  if (!manga || !pages) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200">
      {/* Reader Header */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-6">
          <Link href={`/manga/${manga.id}`} className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all">
            <div className="bg-white/5 p-2 rounded-xl group-hover:bg-primary transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="hidden sm:inline font-bold text-sm tracking-widest uppercase">Series Overview</span>
          </Link>
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
          <div>
            <h1 className="font-black text-sm md:text-base line-clamp-1 tracking-tight text-white">{getMangaTitle(manga)}</h1>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-0.5">Chapter Active</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-all text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
          <Link href="/" className="bg-primary p-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all text-white">
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      {/* Pages Container */}
      <main className="pt-24 pb-40 flex flex-col items-center max-w-5xl mx-auto px-2 sm:px-4">
        {pages.length > 0 ? (
          pages.map((page: string, index: number) => (
            <div key={index} className="relative w-full mb-4 bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl border border-white/5">
              <Image 
                src={page} 
                alt={`Page ${index + 1}`} 
                width={1200}
                height={1800}
                className="w-full h-auto object-contain select-none"
                unoptimized
                priority={index < 2}
              />
              <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl text-[10px] font-black text-white/60 border border-white/10 tracking-[0.3em] uppercase">
                {index + 1} / {pages.length}
              </div>
            </div>
          ))
        ) : (
          <FadeIn>
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
              <div className="bg-primary/10 p-10 rounded-[40px] mb-8 border border-primary/20">
                <Settings className="w-16 h-16 text-primary animate-spin-slow" />
              </div>
              <h2 className="text-4xl font-black mb-4 tracking-tighter text-white">Resource Unavailable</h2>
              <p className="text-gray-400 mb-10 max-w-md text-lg font-medium leading-relaxed">
                The high-speed delivery nodes for this chapter are currently being recalibrated. Please return to the series page.
              </p>
              <Link 
                href={`/manga/${manga.id}`}
                className="bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-2xl font-black transition-all hover:scale-105 shadow-xl shadow-primary/20 uppercase tracking-widest text-sm"
              >
                Return to Series
              </Link>
            </div>
          </FadeIn>
        )}
      </main>

      {/* Ultra-Minimal Bottom Controls */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 glass px-8 py-5 rounded-[32px] shadow-2xl border border-white/10 group hover:scale-105 transition-all">
        <button className="text-gray-500 hover:text-white transition-colors disabled:opacity-20">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Navigation</span>
          <span className="text-xs font-bold text-white whitespace-nowrap">Chapter Menu</span>
        </div>
        <button className="text-gray-500 hover:text-white transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
