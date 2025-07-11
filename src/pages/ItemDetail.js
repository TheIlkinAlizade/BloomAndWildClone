import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCart, updateCart, getWishlist, updateWishlist } from "../utils/storageUtils";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState(getCart());
  const [wishlist, setWishlist] = useState(getWishlist());

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(`http://localhost:5000/items/${id}`)
      .then((res) => {
        if (res.data) setItem(res.data);
        else {
          setItem(null);
          setError("Item not found.");
        }
      })
      .catch(() => {
        setError("Failed to load item. Please try again.");
        setItem(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const isInCart = () => cart.some((i) => i.id === item?.id);
  const isInWishlist = () => wishlist.some((i) => i.id === item?.id);

  const toggleCart = () => {
    if (!item) return;
    const updated = isInCart()
      ? cart.filter((i) => i.id !== item.id)
      : [...cart, item];
    updateCart(updated);
    setCart(updated);
  };

  const toggleWishlist = () => {
    if (!item) return;
    const updated = isInWishlist()
      ? wishlist.filter((i) => i.id !== item.id)
      : [...wishlist, item];
    updateWishlist(updated);
    setWishlist(updated);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="product-container">
      <div className="product-gallery">
        <div className="gallery-main-grid">
          {item.images.map((src, i) => (
            <img key={i} src={src} alt={`${item.title} image ${i + 1}`} />
          ))}
        </div>
      </div>

      <div className="product-details">
        <h1 className="title">{item.title}</h1>
        <p className="price">£{item.price.toFixed(2)}</p>

        <div className="summary">
          <h3>In a nutshell</h3>
          <ul>
            {item.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="action-buttons">
          <button className="add-to-cart" onClick={toggleCart}>
            {isInCart() ? "Remove from Cart" : "Add to Cart"}
          </button>
          <button className="wishlist-btn2" onClick={toggleWishlist}>
            {isInWishlist() ? "♥" : "♡"}
          </button>
        </div>

        <p className="rewards">🎁 Earn 210 Rewards points on this gift.</p>
      </div>
    </div>
  );
}
