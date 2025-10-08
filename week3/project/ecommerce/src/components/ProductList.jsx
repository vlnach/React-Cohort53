import ProductCard from "./ProductCard";

export default function ProductList({ products = [] }) {
  if (!Array.isArray(products)) products = [];
  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
