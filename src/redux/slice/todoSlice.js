/* Importing necessary function and method */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Defining the InitialState for todo */
const initialState = {
  message: null,
  todos: [],
  loading: false,
  deleteLoading: false,
  error: null,
  key: null,
  addLoading: false,
  toggleLoading: false,
  todoToUpdate: null,
};

/* Creating a getAllTodoAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const getAllTodoAsync = createAsyncThunk("add/getAll", async () => {
  /* Making the GET API Call to get todos array */
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos"
  );
  /* Returning the promise */
  return await response.json();
});

/* Creating a addTodoAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const addTodoAsync = createAsyncThunk("todo/add", async (payload) => {
  /* Making POST API Call to add the new todo */
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: payload,
        completed: false,
      }),
    }
  );
  /* Returning the promise */
  return await response.json();
});

/* Creating a updateTodoAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const updateTodoAsync = createAsyncThunk(
  "todo/update",
  async (payload) => {
    /* Making PUT API Call to update todo*/
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
    /* Returning the promise */
    return await response.json();
  }
);

/* Creating a deleteTodoAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const deleteTodoAsync = createAsyncThunk(
  "todo/delete",
  async (payload, thunkAPI) => {
    /* Making DELETE API Call to */
    await fetch(`https://jsonplaceholder.typicode.com/todos/${payload}`, {
      method: "DELETE",
    }).then((response) => {
      /* If res is between 200-299 */
      if (response.ok) {
        /* Dispatching a action to delete todo */
        thunkAPI.dispatch(todoActions.deleteTodo(payload));
        /* Dispatching action to set the message*/
        thunkAPI.dispatch(todoActions.setMessage("Todo Deleted Successfully"));
      } else {
        /* If res is not between 200-299 */
        /* Dispatching action to set error */
        thunkAPI.dispatch(todoActions.setError("Unable To Delete Todo"));
      }
      /* Dispatching action to set loading state to false */
      thunkAPI.dispatch(todoActions.deleteTodoEnd());
    });
  }
);

/* Creating todoSlice function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state. */
const todoSlice = createSlice({
  /* Slice Name */
  name: "todo",
  /* Initial State */
  initialState,
  /* Object of Reducers Function */
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true;
    },
    deleteTodoStart: (state, action) => {
      state.deleteLoading = true;
    },
    deleteTodoEnd: (state, action) => {
      state.deleteLoading = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    deleteTodo: (state, action) => {
      const todoIndex = state.todos.findIndex((t) => t.id === action.payload);
      state.todos.splice(todoIndex, 1);
    },
    resetMessage: (state, action) => {
      state.message = null;
    },
    resetError: (state, action) => {
      state.error = null;
    },
    startAddLoading: (state, action) => {
      state.addLoading = true;
    },
    startToggleLoading: (state, action) => {
      state.toggleLoading = true;
    },
    setUpdateTodo: (state, action) => {
      state.todoToUpdate = action.payload;
    },
    resetUpdateTodo: (state, action) => {
      state.todoToUpdate = null;
    },
  },
  /* Object of extraReducer function */
  /* A "builder callback" function used to add more reducers */
  extraReducers: (builder) => {
    builder
      /* When getAllTodoAsync promise is fulfilled setting the todos */
      .addCase(getAllTodoAsync.fulfilled, (state, action) => {
        state.todos = [...action.payload];
        state.loading = false;
      })
      /* When getAllTodoAsync promise is rejected setting the error message */
      .addCase(getAllTodoAsync.rejected, (state, action) => {
        state.error = "Something went wrong";
        state.loading = false;
      })
      /* When addTodoAsync promise is fulfilled adding the todo to the front */
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
        state.addLoading = false;
        state.message = "Todo Added Successfully";
      })
      /* When addTodoAsync promise is rejected setting the error message */
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.error = "Unable To Add Todo";
        state.addLoading = false;
      })
      /* When updateTodoAsync promise is fulfilled updating the todo */
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        if (action.payload.id) {
          const index = state.todos.findIndex(
            (t) => t.id === action.payload.id
          );
          state.todos[index].completed = !state.todos[index].completed;
          state.todos[index].title = action.payload.title;
          state.message = "Todo Updated Successfully";
          state.toggleLoading = false;
        } else {
          state.error = "Unable to update Todo";
        }
      });
  },
});

/* Creating and exporting todoReducer using slice reducer method */
export const todoReducer = todoSlice.reducer;
/* Creating and exporting todoActions using slice actions method */
export const todoActions = todoSlice.actions;

/* Selector function to get data */
export const getTodos = (state) => state.todo.todos;
export const getTodoDeleteLoading = (state) => state.todo.deleteLoading;
export const getKey = (state) => state.todo.key;
export const getMessage = (state) => state.todo.message;
export const getError = (state) => state.todo.error;
export const getAddTodoLoading = (state) => state.todo.addLoading;
export const getToggleTodoLoading = (state) => state.todo.toggleLoading;
export const getUpdatedTodo = (state) => state.todo.todoToUpdate;
export const getLoading = (state) => state.todo.loading;
