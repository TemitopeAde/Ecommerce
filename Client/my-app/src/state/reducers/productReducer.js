import {
  ADD_PRODUCT,
  ADD_PRODUCT_FAILED,
  ADD_TO_CART,
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_FAILED,
  MODIFY_CART_ITEM_QUANTITY,
  REMOVE_FROM_CART,
  SEARCH,
  UPDATE_CART,
  UPDATE_CART_PRODUCT
} from "../actions/types";

const initialState = {
  allProduct: [],
  fetchedProducts: [],
  cartItems: "",
  cartProducts: [],
  totalPages: "",
  currentPageNumber: "",
  shoppingCart: []
}


const productReducer = (state = initialState, action) => {
  // console.log(action.payload);
  const { type, payload } = action;

  if (type === REMOVE_FROM_CART) {
    const productIdToRemove = payload;

    // Filter out the item with the matching product ID
    const updatedCartItems = state.shoppingCart.filter((item) => item._id !== productIdToRemove);

    return {
      ...state,
      shoppingCart: updatedCartItems,
    };
  }

  if (type === MODIFY_CART_ITEM_QUANTITY) {
    const { productId, quantity } = payload;

    // Find the cart item by product ID
    const updatedCartItems = state.shoppingCart.map((item) => {
      if (item._id === productId) {
        // Update the quantity and total price of the matching item
        return {
          ...item,
          quantity: quantity,
          totalPrice: item.price * quantity,
        };
      }
      return item;
    });
    return {
      ...state,
      shoppingCart: updatedCartItems
    };
  }

  if (type === ADD_TO_CART) {
    console.log(payload, "payload");
    return {
      ...state,
      shoppingCart: [...state.shoppingCart, payload]
    }
  }


  if (type === FETCH_ALL_PRODUCTS) {
    // console.log(payload);
    return {
      ...state,
      fetchedProducts: payload.products,
      totalPages: payload.totalPages,
      currentPageNumber: payload.page
    }
  }

  if (type === FETCH_ALL_PRODUCTS_FAILED) {
    return {
      ...state,
      fetchedProducts: []
    }
  }

  if (type === SEARCH) {
    console.log(payload);

    return {
      ...state,
      fetchedProducts: payload.products,
      totalPages: payload.totalPages,
      currentPageNumber: payload.currentPage
    }
  }

  if (type === UPDATE_CART_PRODUCT) {
    // console.log(payload, "payload")
    return {
      ...state,
      cartProducts: payload
    }
  }


  if (type === UPDATE_CART) {
    // console.log(payload, "payload")
    return {
      ...state,
      cartItems: payload
    }
  }

  if (type === ADD_PRODUCT) {
    return {
      ...state,
      allProduct: payload
    }
  }

  if (type === ADD_PRODUCT_FAILED) {
    return {
      ...state,
      allProduct: []
    }
  }

  return state
};


export default productReducer;

