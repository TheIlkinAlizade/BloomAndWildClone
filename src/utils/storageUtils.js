export const getUser = () => JSON.parse(sessionStorage.getItem("user"));
export const setUser = (user) => sessionStorage.setItem("user", JSON.stringify(user));
export const logoutUser = () => sessionStorage.removeItem("user");

export const getWishlist = () => {
  const user = getUser();
  const key = user ? `wishlist_${user.username}` : "wishlist_guest";
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const updateWishlist = (items) => {
  const user = getUser();
  const key = user ? `wishlist_${user.username}` : "wishlist_guest";
  localStorage.setItem(key, JSON.stringify(items));
};

export const getCart = () => {
  const user = getUser();
  const key = user ? `cart_${user.username}` : "cart_guest";
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const updateCart = (items) => {
  const user = getUser();
  const key = user ? `cart_${user.username}` : "cart_guest";
  localStorage.setItem(key, JSON.stringify(items));
};
