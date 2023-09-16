import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authreducer";
import productReducer from "./productReducer";



const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: [
    "token",
  ],
};


const productPersistConfig = {
  key: "products",
  storage: storage,
  whitelist: [
    "allProducts",
  ]
};


const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  memory: persistReducer(productPersistConfig, productReducer),
});


export default reducers;
