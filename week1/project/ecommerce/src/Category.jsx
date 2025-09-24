export default function Category({ items, activeCategory, onItemClick }) {
  return (
    <div className="category-renderer">
      {items.map((item) => {
        const isActive =
          item === activeCategory ||
          (activeCategory === null && item === "All");
        return (
          <button
            key={item}
            type="button"
            className={`category-items ${isActive ? "active" : ""}`}
            onClick={() => onItemClick(item)}
            aria-pressed={isActive}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
