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

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(["all", ...data]);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url =
      active === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${active}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
        {error && <p className="error">Error: {error}</p>}
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
