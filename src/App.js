/* Importing Hooks, method, function etc. */
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTodoAsync,
  getLoading,
  todoActions,
} from "./redux/slice/todoSlice";
import GridLoader from "react-spinners/GridLoader";

/* Importing Components */
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AddTodo from "./pages/AddTodo/AddTodo";
import UpdateTodo from "./pages/UpdateTodo/UpdateTodo";

/* Functional App Component */
function App() {
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

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
      {loading ? (
        <div className="loader">
          {" "}
          <GridLoader color="green" />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
