import React, { createContext, useContext, useMemo, useState } from "react";
import { CATALOG, FILTERS, SEED_SHELF } from "./data";

export type Screen =
  | "splash"
  | "welcome"
  | "customization"
  | "referral"
  | "signin"
  | "library"
  | "catalog"
  | "profile"
  | "inventory";

type AppValue = {
  screen: Screen;
  go: (s: Screen) => void;
  signedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  selectedGenres: string[];
  toggleGenre: (id: string) => void;
  shelf: string[];
  addBook: (id: string) => void;
  removeBook: (id: string) => void;
  filter: string;
  setFilter: (f: string) => void;
  catalogById: Record<string, (typeof CATALOG)[number]>;
};

const AppContext = createContext<AppValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>("splash");
  const [signedIn, setSignedIn] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    "literary",
    "essays",
    "design",
    "poetry",
  ]);
  const [shelf, setShelf] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>(FILTERS[1]);

  const catalogById = useMemo(
    () => Object.fromEntries(CATALOG.map((b) => [b.id, b])),
    []
  );

  const go = (s: Screen) => setScreen(s);

  const signIn = () => {
    setSignedIn(true);
    setShelf((prev) => (prev.length ? prev : [...SEED_SHELF]));
    setScreen("library");
  };

  const signOut = () => {
    setSignedIn(false);
    setScreen("signin");
  };

  const toggleGenre = (id: string) =>
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );

  const addBook = (id: string) =>
    setShelf((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const removeBook = (id: string) =>
    setShelf((prev) => prev.filter((b) => b !== id));

  const value: AppValue = {
    screen,
    go,
    signedIn,
    signIn,
    signOut,
    selectedGenres,
    toggleGenre,
    shelf,
    addBook,
    removeBook,
    filter,
    setFilter,
    catalogById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
