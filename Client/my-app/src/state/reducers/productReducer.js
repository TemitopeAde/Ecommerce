import { 
  ADD_PRODUCT,
  ADD_PRODUCT_FAILED,
  UPDATE_CART,
  UPDATE_CART_PRODUCT
} from "../actions/types";

const initialState = {
  allProduct: [],
  cartItems: "",
  cartProducts: []
}


const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === UPDATE_CART_PRODUCT) {
    console.log(payload, "payload")
    return {
      ...state,
      cartProducts: payload
    }
  }


  if (type === UPDATE_CART) {
    console.log(payload, "payload")
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

