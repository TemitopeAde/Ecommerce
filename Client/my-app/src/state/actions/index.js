import axios from 'axios';
import { FETCH_ALL_PRODUCTS, FETCH_ALL_PRODUCTS_FAILED, GET_SINGLE_PRODUCT, SIGNIN_FAILED, SIGNIN_SUCCESS, SIGNUP_FAILED, SIGNUP_SUCCESS, UPDATE_CART, UPDATE_CART_PRODUCT } from './types';


const baseUrlAuth = "http://localhost:5100/api/v1/users"
const baseUrlProduct = "http://localhost:5100/api/v1/products"

export const login = (data) => async (dispatch) => {

  // console.log(getState());
  const { email, password } = data;
  const url = `${baseUrlAuth}/signin`

  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // Make the login request to your server
    const response = await axios.post(url, body, config);

    if (response.status !== 200) {
      throw new Error('Login failed'); // Throw an error for non-200 responses
    }

    // Assuming your server returns user data upon successful login
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: response.data
    })
    const user = response.data;

    // Return the user data
    return user;
  } catch (error) {
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: null
    })
    // Handle login error here
    throw error; // Re-throw the error for React Query to catch
  }

}


export const signUp = (data) => async (dispatch) => {

  // console.log(getState());
  const { email, password, confirmPassword, name } = data;
  const url = `${baseUrlAuth}/signup`

  const body = JSON.stringify({
    email,
    password, 
    confirmPassword, 
    name
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // Make the login request to your server
    const response = await axios.post(url, body, config);

    if (response.status !== 200) {
      throw new Error('Login failed'); // Throw an error for non-200 responses
    }

    // Assuming your server returns user data upon successful login
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data
    })

    const user = response.data;

    // Return the user data
    return user;
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILED,
      payload: null
    })
    // Handle login error here
    throw error; // Re-throw the error for React Query to catch
  }

}

export const getProduct = (data) => async (dispatch) => {
  console.log(data, "data");
  const url = `${baseUrlProduct}/${data}`
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(url, config);
    if (response.status !== 200) {
      throw new Error('Get product failed'); // Throw an error for non-200 responses
    }

    dispatch({
      type: GET_SINGLE_PRODUCT,
      payload: response.data
    })

    return response.data
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PRODUCT,
      payload: null
    })
    throw error
  }
}


export const getAllProducts = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(baseUrlProduct, config);
    if (response.status !== 200) {
      throw new Error('Get all products failed'); // Throw an error for non-200 responses
    }

    dispatch({
      type: FETCH_ALL_PRODUCTS,
      payload: response.data
    })

    return response.data
  } catch (error) {
    dispatch({
      type: FETCH_ALL_PRODUCTS_FAILED,
      payload: null
    })
    throw error
  }
}


export const getCartNumber = (data) => async (dispatch) => {
  console.log(data);
  dispatch({
    type: UPDATE_CART,
    payload: data
  })
}

export const getCartProducts = (data) => async (dispatch) => {
  console.log(data);
  dispatch({
    type: UPDATE_CART_PRODUCT,
    payload: data
  })
}