const CATEGORY_PREDICATES = {
  "FAKE: electronics": (p) => p.category === "electronics",
  "FAKE: jewelery": (p) => p.category === "jewelery",
  "FAKE: men's clothing": (p) => p.category === "men's clothing",
  "FAKE: women's clothing": (p) => p.category === "women's clothing",
};

export function filterCategory(products, selectedCategory) {
  if (!selectedCategory) return products;

  const predicate = CATEGORY_PREDICATES[selectedCategory];
  if (!predicate) return products;
  return products.filter(predicate);
}
