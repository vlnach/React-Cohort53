export default function CategoryList({ categories = [], active, onSelect }) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>Loading categories...</p>;
  }
  return (
    <nav className="category-list" aria-label="Product categories">
      <button
        className={`category-button ${active === "all" ? "active" : ""}`}
        onClick={() => onSelect("all")}
      >
        ALL
      </button>
      {categories.map((c) => (
        <button
          key={c}
          className={`category-button ${active === c ? "active" : ""}`}
          onClick={() => onSelect(c)}
        >
          {String(c).toUpperCase()}
        </button>
      ))}
    </nav>
  );
}
