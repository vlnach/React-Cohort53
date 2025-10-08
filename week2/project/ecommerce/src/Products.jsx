import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
       <rect width='100%' height='100%' fill='#f2f3f5'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
             fill='#999' font-family='Arial, sans-serif' font-size='20'>
         Image unavailable
       </text>
     </svg>`
  );

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // load categories once
  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        if (!cancelled) setCategories(["all", ...data]);
      } catch (err) {
        // keep UI usable even if categories fail
        if (!cancelled) {
          setCategories(["all"]);
          setError(err.message || "Categories error");
        }
      }
    }

    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  // load products when category changes
  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      // reset error and start loading for a fresh request
      setError(null);
      setLoading(true);

      const base = "https://fakestoreapi.com/products";
      const url = active === "all" ? base : `${base}/category/${active}`;

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok)
          throw new Error(`Failed to fetch products (${res.status})`);
        const data = await res.json();

        // normalize to array and replace old data
        setProducts(Array.isArray(data) ? data : []);
        setError(null); // success -> no error
      } catch (err) {
        // ignore aborted requests
        if (err.name === "AbortError") return;

        // show error and remove stale items
        setProducts([]);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
    // cancel previous in-flight request on category change/unmount
    return () => controller.abort();
  }, [active]);

  return (
    <div className="page">
      <header className="header">
        <h1>Products</h1>
        <nav className="categories" aria-label="Product categories">
          {categories.map((c) => (
            <button
              key={c}
              className={`cat ${active === c ? "active" : ""}`}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </nav>
      </header>

      <main className="grid">
        {loading && <p>Loading products...</p>}
        {!loading && error && <p className="error">Error: {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="empty">No products for this category.</p>
        )}

        {!loading &&
          !error &&
          products.map((p) => (
            <article key={p.id} className="card">
              <Link to={`/product/${p.id}`}>
                <div className="imgBox">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // set a tiny inline fallback image
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK;
                    }}
                  />
                </div>

                <div className="info">
                  <h3 className="title">{p.title}</h3>
                  <div className="meta">
                    <span className="price">${p.price}</span>
                    <span className="rating">{p.rating?.rate}★</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
      </main>
    </div>
  );
}
