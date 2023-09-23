import { 
  ADD_PRODUCT,
  ADD_PRODUCT_FAILED,
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_FAILED,
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
  currentPageNumber: ""
}


const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

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
    return {
      ...state,
      fetchedProducts: payload.products,
      totalPages: payload.totalPages,
      currentPageNumber: payload.page
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

