function ItemCard({ item, onAddToCart, onAddToWishlist }) {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.title} width="150" />
      <h4>{item.title}</h4>
      <p>${item.price}</p>
      <div>
        <button onClick={() => onAddToCart(item)}>🛒</button>
        <button onClick={() => onAddToWishlist(item)}>❤️</button>
      </div>
    </div>
  );
}

export default ItemCard;
