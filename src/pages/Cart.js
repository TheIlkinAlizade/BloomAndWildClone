import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart, updateCart, getWishlist, updateWishlist } from "../utils/storageUtils";

function Cart() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(getWishlist());

  useEffect(() => {
    setCart(getCart());
  }, []);

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
    setCart(updated);
  };

  const toggleWishlist = (item) => {
    const exists = wishlist.some(i => i.id === item.id);
    const updated = exists
      ? wishlist.filter(i => i.id !== item.id)
      : [...wishlist, item];
    updateWishlist(updated);
    setWishlist(updated);
  };

  return (
    <>
      <div className="shopheader">
        <h1>Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="wishlist-empty">
          <p>Your cart is empty</p>
          <Link to="/items">Discover More</Link>
        </div>
      ) : (
        <div className="rewards-member">
          <div className="itemswishlist">
            {cart.map((item) => (
              <div className="item" key={item.id}>
                <div className="visual" style={{ position: "relative" }}>
                  <Link to={`/item/${item.id}`}>
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback.jpg";
                      }}
                    />
                  </Link>
                  <button
                    className="wishlist-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove from cart"
                    style={{ position: "absolute", bottom: 10, right: 10 }}
                  >
                    🗑️
                  </button>
                  <button
                    className="wishlist-btn"
                    onClick={() => toggleWishlist(item)}
                    aria-label={wishlist.some(i => i.id === item.id) ? "Remove from wishlist" : "Add to wishlist"}
                    style={{ position: "absolute", bottom: 10, left: 10 }}
                  >
                    {wishlist.some(i => i.id === item.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div className="details">
                  <div className="info">
                    <h1>{item.title}</h1>
                    <p>{item.category}</p>
                  </div>
                  <div className="more">
                    <p>${item.price?.toFixed(2)}</p>
                    <Link to={`/item/${item.id}`}>View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
