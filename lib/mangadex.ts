const BASE_URL = 'https://api.mangadex.org';

export interface MangaDexManga {
  id: string;
  attributes: {
    title: { [key: string]: string };
    description: { [key: string]: string };
    status: string;
    contentRating: string;
    lastChapter: string;
    year?: number;
  };
  relationships: any[];
}

export async function fetchMangaList(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}/manga?limit=${limit}&offset=${offset}&includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive`, { cache: 'no-store' });
  const data = await res.json();
  return data.data as MangaDexManga[];
}

export async function fetchMangaDetails(id: string) {
  const res = await fetch(`${BASE_URL}/manga/${id}?includes[]=cover_art&includes[]=author`, { cache: 'no-store' });
  const data = await res.json();
  return data.data as MangaDexManga;
}

export async function fetchMangaFeed(id: string, offset = 0) {
  const res = await fetch(`${BASE_URL}/manga/${id}/feed?translatedLanguage[]=en&order[chapter]=desc&limit=50&offset=${offset}`, { cache: 'no-store' });
  const data = await res.json();
  return data.data;
}

export async function fetchChapterPages(chapterId: string) {
  try {
    const res = await fetch(`${BASE_URL}/at-home/server/${chapterId}`);
    const data = await res.json();
    
    if (data.result === 'error') {
      console.error('MangaDex API Error:', data.errors);
      return [];
    }

    const { baseUrl, chapter } = data;
    if (!chapter || !chapter.data) return [];
    
    return chapter.data.map((filename: string) => 
      `${baseUrl}/data/${chapter.hash}/${filename}`
    );
  } catch (err) {
    console.error('Failed to fetch chapter pages:', err);
    return [];
  }
}

export function getCoverUrl(manga: MangaDexManga) {
  const coverRelationship = manga.relationships.find(rel => rel.type === 'cover_art');
  if (!coverRelationship) return 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop';
  
  const filename = coverRelationship.attributes?.fileName;
  if (!filename) return 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop';
  
  return `https://uploads.mangadex.org/covers/${manga.id}/${filename}`;
}

export function getMangaTitle(manga: MangaDexManga) {
  // 1. Check primary English title
  if (manga.attributes.title.en) return manga.attributes.title.en;
  
  // 2. Check altTitles for an English version
  const altEnglish = manga.relationships?.find(rel => rel.type === 'manga' && rel.attributes?.altTitles)?.attributes?.altTitles?.find((t: any) => t.en);
  // Wait, altTitles are in attributes, not relationships usually.
  
  const altTitles = (manga.attributes as any).altTitles;
  if (altTitles && Array.isArray(altTitles)) {
    const enAlt = altTitles.find((t: any) => t.en);
    if (enAlt) return enAlt.en;
  }

  // 3. Fallback to first available title
  return Object.values(manga.attributes.title)[0] || 'Unknown Title';
}

export function getMangaDescription(manga: MangaDexManga) {
  return manga.attributes.description.en || Object.values(manga.attributes.description)[0] || 'No description available.';
}

export async function fetchManhwaList(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}/manga?limit=${limit}&offset=${offset}&includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&originalLanguage[]=ko`, { cache: 'no-store' });
  const data = await res.json();
  return data.data as MangaDexManga[];
}
