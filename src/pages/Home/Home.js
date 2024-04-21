import { useDispatch, useSelector } from "react-redux";
import TodoList from "../../components/TodoList/TodoList";
import { getError, getMessage, todoActions } from "../../redux/slice/todoSlice";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const message = useSelector(getMessage);
  const error = useSelector(getError);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(todoActions.resetMessage());
      }, 2000);
    }
    if (error) {
      setTimeout(() => {
        dispatch(todoActions.resetError());
      }, 2000);
    }
  }, [message, error]);

  return (
    <>
      {message && (
        <div role="alert" className="alert alert-success alertMessage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
        </div>
      )}
      {error && (
        <div role="alert" className="alert alert-error errorAlert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <div className="flex mt-4 text-3xl flex-col justify-center items-center">
        <h1 className="font-extrabold">List Of All Todos</h1>
        <TodoList />
      </div>
    </>
  );
}

export default Home;
