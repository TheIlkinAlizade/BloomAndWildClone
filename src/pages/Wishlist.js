import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWishlist, updateWishlist } from "../utils/storageUtils";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    updateWishlist(updated);
    setWishlist(updated);
  };

  return (
    <>
      <div className="shopheader">
        <h1>Wishlist</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <p>Your wishlist is empty</p>
          <Link to="/items">Discover More</Link>
        </div>
      ) : (
        <div className="rewards-member">
          <div className="itemswishlist">
            {wishlist.map((item) => (
              <div className="item" key={item.id}>
                <div className="visual">
                  <Link to={`/item/${item.id}`}>
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback.jpg"; // optional fallback
                      }}
                    />
                  </Link>
                  <button
                    className="wishlist-btn"
                    onClick={() => removeFromWishlist(item.id)}
                    aria-label="Remove from wishlist"
                  >
                    ♥
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

export default Wishlist;
