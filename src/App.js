/* Importing Hooks, method, function etc. */
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllTodoAsync, todoActions } from "./redux/slice/todoSlice";

/* Importing Components */
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AddTodo from "./pages/AddTodo/AddTodo";
import UpdateTodo from "./pages/UpdateTodo/UpdateTodo";

/* Functional App Component */
function App() {
  /* Defining Dispatcher */
  const dispatch = useDispatch();

  /* Getting all todos on component mounting */
  useEffect(() => {
    /* Dispatching action to set the loading state to true */
    dispatch(todoActions.fetchStart());
    /* Dispatching getAllTodoAsync function of asyncThunk to make API call and get all todos details*/
    dispatch(getAllTodoAsync());
  }, []);

  /* React Router Configuration */
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "add",
          element: <AddTodo />,
        },
        {
          path: "update",
          element: <UpdateTodo />,
        },
      ],
    },
  ]);

  /* Returning the JSX */
  return (
    <>
      {/* Passing all data router objects to this component to render the app and enable the rest of the data APIs */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
