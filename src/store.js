// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Import your rootReducer

const store = configureStore({
  reducer: rootReducer,
  // Add any middleware or other configuration options here if needed
});

export default store;
