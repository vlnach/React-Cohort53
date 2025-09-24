import { useMemo, useState } from "react";
import products from "./fake-data/all-products";
import rawCategories from "./fake-data/all-categories";
import "./App.css";

const toValue = (label) => label.replace(/^FAKE:\s*/i, "").toLowerCase();
const categories = [
  { label: "ALL", value: "all" },
  ...rawCategories.map((label) => ({ label, value: toValue(label) })),
];

const normalize = (s) => String(s).toLowerCase();
const FALLBACK = "https://via.placeholder.com/600x400?text=Image+unavailable";

const imgProxy = (url) =>
  "https://images.weserv.nl/?url=" +
  encodeURIComponent(url.replace(/^https?:\/\//, ""));

export default function App() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return products;
    return products.filter((p) => normalize(p.category) === active);
  }, [active]);

  return (
    <div className="page">
      <header className="header">
        <h1>Products</h1>
        <nav className="categories" aria-label="Product categories">
          {categories.map((c) => (
            <button
              key={c.value}
              className={`cat ${active === c.value ? "active" : ""}`}
              onClick={() => setActive(c.value)}
              aria-pressed={active === c.value}
            >
              {c.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="grid">
        {filtered.length === 0 ? (
          <p className="empty">No products for this category.</p>
        ) : (
          filtered.map((p) => (
            <article key={p.id} className="card">
              <div className="imgBox">
                <img
                  src={imgProxy(p.image)}
                  alt={p.title}
                  loading="lazy"
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
                  <span className="rating">{p.rating.rate}★</span>
                </div>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}
