import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";

const HOST = "https://fakestoreapi.com";

export default function ProductsPage() {
  const [active, setActive] = useState("all");

  // categories (once)
  const { data: catsRaw } = useFetch(`${HOST}/products/categories`, []);
  const categories = useMemo(
    () => (Array.isArray(catsRaw) ? ["all", ...catsRaw] : []),
    [catsRaw]
  );

  // products for active category
  const path = active === "all" ? "products" : `products/category/${active}`;
  const {
    data: products,
    loading,
    error,
  } = useFetch(`${HOST}/${path}`, [active]);

  return (
    <div className="page">
      <h1 className="page-title">Products</h1>

      <CategoryList
        categories={categories.slice(1)}
        active={active}
        onSelect={setActive}
      />

      <section aria-live="polite">
        {loading && <p>Loading products...</p>}
        {!loading && error && <p className="error">Error: {error}</p>}
        {!loading && !error && (!products || products.length === 0) && (
          <p>No products.</p>
        )}
        {!loading && !error && <ProductList products={products} />}
      </section>
    </div>
  );
}
