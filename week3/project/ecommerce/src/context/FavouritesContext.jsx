import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext();

export function FavouritesProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("favourites") || "[]");
      return Array.isArray(raw)
        ? raw.map((x) => Number(x)).filter((n) => Number.isFinite(n))
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favourites", JSON.stringify(ids));
    } catch {}
  }, [ids]);

  // keep your names, just make ids numeric
  const toggle = (id) => {
    const n = Number(id);
    setIds((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const has = (id) => ids.includes(Number(id));

  return <Ctx.Provider value={{ ids, toggle, has }}>{children}</Ctx.Provider>;
}

export function useFavourites() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useFavourites must be used within FavouritesProvider");
  return ctx;
}
