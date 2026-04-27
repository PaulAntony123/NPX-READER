import { fetchMangaList } from "@/lib/mangadex";
import { Navbar } from "@/components/Navbar";
import { InfiniteMangaGrid } from "@/components/InfiniteMangaGrid";
import { Book } from "lucide-react";

export default async function MangaPage() {
  const initialManga = await fetchMangaList(24);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <header className="px-6 md:px-12 py-16 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20">
            <Book className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">MANGA <span className="text-primary">CATALOG</span></h1>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl font-medium">
          Browse through our massive collection of Japanese manga. From action-packed shonen to emotional seinen.
        </p>
      </header>

      <main className="px-6 md:px-12">
        <InfiniteMangaGrid initialData={initialManga} type="manga" />
      </main>
    </div>
  );
}
