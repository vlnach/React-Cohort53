import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import heartOutline from "../assets/heart-regular.svg";
import heartSolid from "../assets/heart-solid.svg";

export default function ProductCard({ product }) {
  const { has, toggle } = useFavourites();
  const fav = has(product.id);

  return (
    <article className="product-card">
      <button
        className="heart-icon"
        aria-label={fav ? "Remove from favourites" : "Add to favourites"}
        onClick={() => toggle(product.id)}
      >
        <img src={fav ? heartSolid : heartOutline} alt="" />
      </button>

      <Link to={`/product/${product.id}`}>
        <div className="image-wrapper">
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>
        <p className="product-title">{product.title}</p>
      </Link>
    </article>
  );
}
