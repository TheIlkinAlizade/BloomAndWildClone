import { useEffect, useState } from "react";
import axios from "axios";
import { getCart, updateCart, getWishlist, updateWishlist } from "../utils/storageUtils";
import { Link, useLocation } from "react-router-dom";

function Items() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(getCart());
  const [wishlist, setWishlist] = useState(getWishlist());
  const [filters, setFilters] = useState({
    color: "",
    category: "",
    occasion: []  // change to array for multi-select
  });
  const [sortOrder, setSortOrder] = useState("featured");
  const location = useLocation();

  // Extract unique colors from items dynamically
  const uniqueColors = Array.from(new Set(items.map(item => item.color))).filter(c => c);

  // Extract unique occasions dynamically (all occasions used in all items)
  const uniqueOccasions = Array.from(
    new Set(items.flatMap(item => item.occasions))
  ).filter(o => o);

  // Sync filters.category with URL query param "category"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category") || "";
    setFilters(prev => ({ ...prev, category: categoryFromUrl }));
  }, [location.search]);

  useEffect(() => {
    axios.get("http://localhost:5000/items").then((res) => {
      setItems(res.data);
    });
  }, []);

  const isInCart = (item) => cart.some((i) => i.id === item.id);
  const isInWishlist = (item) => wishlist.some((i) => i.id === item.id);

  const toggleCart = (item) => {
    const updated = isInCart(item)
      ? cart.filter((i) => i.id !== item.id)
      : [...cart, item];
    updateCart(updated);
    setCart(updated);
  };

  const toggleWishlist = (item) => {
    const updated = isInWishlist(item)
      ? wishlist.filter((i) => i.id !== item.id)
      : [...wishlist, item];
    updateWishlist(updated);
    setWishlist(updated);
  };

  // Toggle occasion filter for multi-select checkboxes
  const toggleOccasionFilter = (occasion) => {
    setFilters((prev) => {
      const newOccasions = prev.occasion.includes(occasion)
        ? prev.occasion.filter((o) => o !== occasion)
        : [...prev.occasion, occasion];
      return { ...prev, occasion: newOccasions };
    });
  };

  const filteredItems = items
    .filter((item) => {
      const { color, category, occasion } = filters;
      const colorMatch = color ? item.color === color : true;
      const categoryMatch = category ? item.category === category : true;
      // Match if item occasions have any selected occasion (OR true if no filter)
      const occasionMatch = occasion.length > 0
        ? occasion.some(o => item.occasions.includes(o))
        : true;
      return colorMatch && categoryMatch && occasionMatch;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") return b.id - a.id;
      if (sortOrder === "popular") return a.price - b.price;
      return 0;
    });

  return (
    <div className="page-container">
      <aside className="filter-bar">
        <div className="filter-section">
          <h4>Color</h4>
          <label>
            <input
              type="radio"
              name="color"
              checked={filters.color === ""}
              onChange={() => setFilters({ ...filters, color: "" })}
            />
            All
          </label>
          {uniqueColors.map((color) => (
            <label key={color}>
              <input
                type="radio"
                name="color"
                checked={filters.color === color}
                onChange={() => setFilters({ ...filters, color })}
              />
              {color}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h4>Occasion</h4>
          {uniqueOccasions.map((occasion) => (
            <label key={occasion}>
              <input
                type="checkbox"
                name="occasion"
                checked={filters.occasion.includes(occasion)}
                onChange={() => toggleOccasionFilter(occasion)}
              />
              {occasion}
            </label>
          ))}
          <label>
            <input
              type="checkbox"
              name="occasion"
              checked={filters.occasion.length === 0}
              onChange={() => setFilters({ ...filters, occasion: [] })}
            />
            All
          </label>
        </div>

        <div className="filter-section">
          <h4>Sort By</h4>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </aside>

      <main className="product-section">
        <div className="header-row">
          <h2>{filters.category || "Trending"}</h2>
          <span>{filteredItems.length} gifts</span>
        </div>

        <div className="product-grid">
          {filteredItems.length === 0 ? (
            <p>No items match your filters.</p>
          ) : (
            filteredItems.map((item) => (
              <div className="item" key={item.id}>
                <div className="image-wrapper">
                  <Link to={`/item/${item.id}`}>
                    <img src={item.images[0]} alt={item.title} />
                  </Link>
                  <button
                    className="wishlist-btn"
                    onClick={() => toggleWishlist(item)}
                  >
                    {isInWishlist(item) ? "♥" : "♡"}
                  </button>
                </div>
                <div className="info">
                  <h3>{item.title}</h3>
                  <p className="type">{item.category}</p>
                  <div className="price-send-row">
                    <p className="price">£{item.price.toFixed(2)}</p>
                    <button className="send" onClick={() => toggleCart(item)}>
                      {isInCart(item) ? "Remove" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );  
}

export default Items;
