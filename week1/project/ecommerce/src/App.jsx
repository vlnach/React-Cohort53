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
