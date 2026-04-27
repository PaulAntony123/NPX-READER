import { fetchManhwaList } from "@/lib/mangadex";
import { Navbar } from "@/components/Navbar";
import { InfiniteMangaGrid } from "@/components/InfiniteMangaGrid";
import { Zap } from "lucide-react";

export default async function ManhwaPage() {
  const initialManhwa = await fetchManhwaList(24);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <header className="px-6 md:px-12 py-16 bg-gradient-to-b from-accent/10 to-transparent">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-accent p-3 rounded-2xl shadow-xl shadow-accent/20">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">UNLIMITED <span className="text-accent">MANHWA</span></h1>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl font-medium">
          The best of Korean webtoons and manhwa. Experience vibrant colors and unique vertical storytelling.
        </p>
      </header>

      <main className="px-6 md:px-12">
        <InfiniteMangaGrid initialData={initialManhwa} type="manhwa" />
      </main>
    </div>
  );
}
