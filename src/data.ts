export type Book = {
  id: string;
  title: string;
  author: string;
  rating: number;
  genre: string;
};

export const CATALOG: Book[] = [
  { id: "atomic", title: "Atomic Habits", author: "James Clear", rating: 4.8, genre: "Ideas & growth" },
  { id: "doit", title: "Do It Today", author: "Darius Foroux", rating: 4.6, genre: "Ideas & growth" },
  { id: "4000", title: "Four Thousand Weeks", author: "Oliver Burkeman", rating: 4.7, genre: "Ideas & growth" },
  { id: "deep", title: "Deep Work", author: "Cal Newport", rating: 4.5, genre: "Ideas & growth" },
  { id: "orbital", title: "Orbital", author: "S. Harvey", rating: 4.9, genre: "Fiction" },
  { id: "creative", title: "The Creative Act", author: "Rick Rubin", rating: 4.8, genre: "Culture" },
  { id: "braiding", title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", rating: 4.9, genre: "Culture" },
  { id: "serviceberry", title: "The Serviceberry", author: "Robin Wall Kimmerer", rating: 4.7, genre: "Ideas & growth" },
  { id: "firstlight", title: "First Light", author: "Mina Lee", rating: 4.4, genre: "Fiction" },
];

export const GENRES = [
  { id: "literary", label: "Literary fiction", icon: "sparkles" },
  { id: "essays", label: "Essays", icon: "quote" },
  { id: "history", label: "History", icon: "landmark" },
  { id: "design", label: "Design", icon: "shapes" },
  { id: "memoir", label: "Memoir", icon: "feather" },
  { id: "science", label: "Science", icon: "orbit" },
  { id: "poetry", label: "Poetry", icon: "flower" },
  { id: "mystery", label: "Mystery", icon: "key" },
] as const;

export const FILTERS = ["For you", "Ideas & growth", "Fiction", "Culture"];

export const CURRENTLY_READING = {
  id: "serviceberry",
  title: "The Serviceberry",
  author: "Robin Wall Kimmerer",
  page: 84,
  totalPages: 128,
  minutesLeft: 42,
};

export const SEED_SHELF = ["orbital", "creative", "braiding"];
