import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  todos: [],
  loading: false,
};

export const getAllTodoAsync = createAsyncThunk("add/getAll", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return await response.json();
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodoAsync.fulfilled, (state, action) => {
      state.todos = [...action.payload];
      state.loading = false;
    });
  },
});

export const todoReducer = todoSlice.reducer;
export const todoActions = todoSlice.actions;
