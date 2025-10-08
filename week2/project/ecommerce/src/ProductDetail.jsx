import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      // fresh request for this id
      setError(null);
      setProduct(null);

      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Unknown error");
      }
    }

    load();
    return () => controller.abort();
  }, [id]);

  if (error) return <p className="error">Error: {error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="200" />
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}
