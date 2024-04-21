/* Importing reducer function and configure store function */
import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./slice/todoSlice";

/* Creating Redux Store */
export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
