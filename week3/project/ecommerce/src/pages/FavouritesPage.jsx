import { useEffect, useState } from "react";
import { useFavourites } from "../context/FavouritesContext";
import ProductList from "../components/ProductList";

const HOST = "https://fakestoreapi.com";

/** Very simple multi-fetch page for favourites */
export default function FavouritesPage() {
  const { ids } = useFavourites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // No favourites -> show empty state
    if (!ids || ids.length === 0) {
      setProducts([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    Promise.all(
      ids.map((id) =>
        fetch(`${HOST}/products/${id}`, { signal: controller.signal }).then(
          (r) => {
            if (!r.ok) throw new Error(`Product ${id} failed (${r.status})`);
            return r.json();
          }
        )
      )
    )
      .then((arr) => setProducts(arr))
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message || "Unknown error");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [JSON.stringify(ids)]); // rerun when ids change

  if (loading) return <p>Loading favourites...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (products.length === 0) return <p>No favourites yet.</p>;

  return <ProductList products={products} />;
}
