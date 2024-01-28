// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  // Add your other reducers here
  // auth: authReducer,
});

export default rootReducer;
