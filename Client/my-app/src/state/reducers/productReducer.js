import { 
  ADD_PRODUCT,
  ADD_PRODUCT_FAILED
} from "../actions/types";

const initialState = {
  allProduct: []
}


const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

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

