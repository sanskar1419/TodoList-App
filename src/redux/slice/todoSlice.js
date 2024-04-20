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

export const addTodoAsync = createAsyncThunk("todo/add", async (payload) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 11,
      title: payload.title,
      completed: false,
    }),
  });
  return await response.json();
});

export const updateTodoAsync = createAsyncThunk(
  "todo/update",
  async (payload) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: payload.userId,
          title: payload.title,
          completed: payload.completed,
        }),
      }
    );
    return await response.json();
  }
);

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
    builder
      .addCase(getAllTodoAsync.fulfilled, (state, action) => {
        state.todos = [...action.payload];
        state.loading = false;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
        state.loading = false;
        state.message = "Todo Added Successfully";
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.todos.map((todo) => {
          if (
            todo.id === action.payload.id &&
            todo.userId === action.payload.userId
          ) {
            return action.payload;
          }

          return todo;
        });
        state.loading = false;
        state.message = "Todo Updated Successfully";
      });
  },
});

export const todoReducer = todoSlice.reducer;
export const todoActions = todoSlice.actions;
