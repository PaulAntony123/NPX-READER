"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        try {
          const res = await fetch(`https://api.mangadex.org/manga?title=${query}&limit=5&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive`);
          const data = await res.json();
          setResults(data.data || []);
          setIsOpen(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative group">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Search manga..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setIsOpen(true)}
          className="bg-card border border-border rounded-full pl-11 pr-4 py-1.5 text-sm w-64 md:w-80 focus:outline-none focus:border-primary transition-all focus:ring-1 focus:ring-primary/20"
        />
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-gray-500 hover:text-white transition-colors" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 left-0 right-0 glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-[100]"
          >
            {loading ? (
              <div className="p-4 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((manga) => {
                  const coverRel = manga.relationships.find((r: any) => r.type === 'cover_art');
                  const coverUrl = coverRel 
                    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverRel.attributes?.fileName}.256.jpg`
                    : null;
                  
                  return (
                    <Link 
                      key={manga.id}
                      href={`/manga/${manga.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors group"
                    >
                      <div className="relative w-10 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-card">
                        {coverUrl && (
                          <Image 
                            src={coverUrl} 
                            alt={manga.attributes.title.en || "Cover"} 
                            fill 
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                          {manga.attributes.title.en || Object.values(manga.attributes.title)[0]}
                        </p>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">
                          {manga.attributes.status} | {manga.attributes.contentRating}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-400">No results found for "{query}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
