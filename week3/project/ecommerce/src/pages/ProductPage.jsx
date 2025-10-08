import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useFavourites } from "../context/FavouritesContext";
import heartOutline from "../assets/heart-regular.svg";
import heartSolid from "../assets/heart-solid.svg";

const HOST = "https://fakestoreapi.com";

export default function ProductPage() {
  const { id } = useParams();
  const { has, toggle } = useFavourites();
  const fav = has(Number(id));

  const {
    data: product,
    loading,
    error,
  } = useFetch(`${HOST}/products/${id}`, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!product) return null;

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <button className="heart-icon" onClick={() => toggle(product.id)}>
        <img src={fav ? heartSolid : heartOutline} alt="" />
      </button>
      <img
        src={product.image}
        alt={product.title}
        className="product-detail-image"
      />
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating?.rate} /{" "}
        {product.rating?.count}
      </p>
      <p>{product.description}</p>
    </div>
  );
}
