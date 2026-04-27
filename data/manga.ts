export interface Manga {
  id: string;
  title: string;
  author: string;
  cover: string;
  banner: string;
  synopsis: string;
  genres: string[];
  status: 'Ongoing' | 'Completed';
  rating: number;
  chapters: { id: string; title: string; releaseDate: string }[];
}

export const MANGA_DATA: Manga[] = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    author: "Chugong",
    cover: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1634157703702-3c124b455499?q=80&w=2000&auto=format&fit=crop",
    synopsis: "In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation, a notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival.",
    genres: ["Action", "Adventure", "Fantasy"],
    status: "Completed",
    rating: 4.9,
    chapters: [
      { id: "1", title: "Chapter 1: The Beginning", releaseDate: "2024-01-01" },
      { id: "2", title: "Chapter 2: The Double Dungeon", releaseDate: "2024-01-08" },
      { id: "3", title: "Chapter 3: The System", releaseDate: "2024-01-15" },
    ],
  },
  {
    id: "one-piece",
    title: "One Piece",
    author: "Eiichiro Oda",
    cover: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1000&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1614583225154-5feaba1bd541?q=80&w=2000&auto=format&fit=crop",
    synopsis: "Monkey D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates. With a course charted for the treacherous waters of the Grand Line and beyond, this is one captain who'll never give up until he's claimed the greatest treasure on Earth: the Legendary One Piece!",
    genres: ["Action", "Adventure", "Comedy"],
    status: "Ongoing",
    rating: 4.8,
    chapters: [
      { id: "1110", title: "Chapter 1110: Arrival", releaseDate: "2024-03-20" },
      { id: "1111", title: "Chapter 1111: The Shield", releaseDate: "2024-03-27" },
    ],
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    cover: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?q=80&w=1000&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=2000&auto=format&fit=crop",
    synopsis: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman's school to be able to locate the demon's other body parts and thus exorcise himself.",
    genres: ["Action", "Supernatural", "Shounen"],
    status: "Ongoing",
    rating: 4.7,
    chapters: [
      { id: "250", title: "Chapter 250: Showdown", releaseDate: "2024-03-15" },
    ],
  },
];
