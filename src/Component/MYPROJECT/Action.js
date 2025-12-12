// Cart action
export const myAction = (payload) => {
  return {
    type: "ADD",
    payload
  }
}

// Wishlist action
// CART ACTIONS
export const addToCart = (item) => ({ type: "ADD", payload: item });

// WISHLIST ACTIONS
export const addToWishlist = (item) => ({ type: "WISHLIST_ADD", payload: item });
export const removeFromWishlist = (id) => ({ type: "WISHLIST_REMOVE", payload: id });


export default myAction
