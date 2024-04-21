import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AddTodo from "./pages/AddTodo/AddTodo";
import UpdateTodo from "./pages/UpdateTodo/UpdateTodo";
import { useDispatch } from "react-redux";
import { getAllTodoAsync, todoActions } from "./redux/slice/todoSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(todoActions.fetchStart());
    dispatch(getAllTodoAsync());
  }, []);

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

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
