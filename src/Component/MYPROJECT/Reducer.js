const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || []
};

export const myReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---------------- CART ----------------
    case "ADD": {
      const existing = state.cart.find((el) => el.id === action.payload.id);
      let updatedCart;
      if (existing) {
        updatedCart = state.cart.map((el) =>
          el.id === action.payload.id
            ? { ...el, quantity: el.quantity + 1 }
            : el
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      return {
        ...state,
        cart: updatedCart
      };
    }

    case "INCREASE_QTY":
    case "INCREMENT_QTY": {
      const updatedCart = state.cart.map((el) =>
        el.id === action.payload
          ? { ...el, quantity: el.quantity + 1 }
          : el
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      return {
        ...state,
        cart: updatedCart
      };
    }

    case "DECREASE_QTY":
    case "DECREMENT_QTY": {
      const updatedCart = state.cart
        .map((el) =>
          el.id === action.payload && el.quantity > 1
            ? { ...el, quantity: el.quantity - 1 }
            : el
        )
        .filter((el) => el.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      return {
        ...state,
        cart: updatedCart
      };
    }

    case "REMOVE_ITEM": {
      const updatedCart = state.cart.filter((el) => el.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      return {
        ...state,
        cart: updatedCart
      };
    }

    // ---------------- WISHLIST ----------------
    case "WISHLIST_ADD": {
      const exists = state.wishlist.find((el) => el.id === action.payload.id);
      if (exists) return state;
      const updatedWishlist = [...state.wishlist, action.payload];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('wishlistUpdated'));
      return {
        ...state,
        wishlist: updatedWishlist
      };
    }

    case "WISHLIST_REMOVE": {
      const updatedWishlist = state.wishlist.filter((el) => el.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('wishlistUpdated'));
      return {
        ...state,
        wishlist: updatedWishlist
      };
    }

    default:
      return state;
  }
};
