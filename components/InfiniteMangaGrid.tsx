"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCoverUrl, getMangaTitle, MangaDexManga } from "@/lib/mangadex";
import { FadeIn, HoverScale } from "./ClientMotion";
import { useInView } from "react-intersection-observer";

interface Props {
  initialData: MangaDexManga[];
  type: "manga" | "manhwa";
}

export function InfiniteMangaGrid({ initialData, type }: Props) {
  const [items, setItems] = useState<MangaDexManga[]>(initialData);
  const [offset, setOffset] = useState(initialData.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "400px",
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const endpoint = type === "manhwa" 
        ? `https://api.mangadex.org/manga?limit=12&offset=${offset}&includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&originalLanguage[]=ko`
        : `https://api.mangadex.org/manga?limit=12&offset=${offset}&includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive`;
      
      const res = await fetch(endpoint);
      const data = await res.json();
      
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...data.data]);
        setOffset(prev => prev + data.data.length);
      }
    } catch (error) {
      console.error("Failed to load more:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
      {items.map((manga, i) => (
        <FadeIn key={`${manga.id}-${i}`} delay={0.05}>
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
      
      {/* Sentinel for infinite scroll */}
      {hasMore && (
        <div ref={ref} className="col-span-full py-20 flex justify-center">
          {loading && (
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
}
