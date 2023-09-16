import axios from 'axios';
import { SIGNIN_FAILED, SIGNIN_SUCCESS, SIGNUP_FAILED, SIGNUP_SUCCESS } from './types';


const baseUrlAuth = "http://localhost:5100/api/v1/users"

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

export const addProduct = (data) => async (dispatch) => {
  console.log(data);
}



