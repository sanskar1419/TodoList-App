// Importing necessary module, component etc.
import { useDispatch, useSelector } from "react-redux";
import TodoList from "../../components/TodoList/TodoList";
import { getError, getMessage, todoActions } from "../../redux/slice/todoSlice";
import { useEffect } from "react";

/* Defining functional Home component */
function Home() {
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Getting message using useSelector hook from redux store */
  const message = useSelector(getMessage);
  /* Getting error using useSelector hook from redux store */
  const error = useSelector(getError);

  /* Using useEffect hook to reset the message and error to null whenever they changes */
  useEffect(() => {
    /* If message exist */
    if (message) {
      setTimeout(() => {
        /* Dispatching a action to reset message */
        dispatch(todoActions.resetMessage());
      }, 2000);
    }
    /* If error exist */
    if (error) {
      setTimeout(() => {
        /* Dispatching a action to reset error */
        dispatch(todoActions.resetError());
      }, 2000);
    }
  }, [message, error]);

  /* Returning the JSX */
  return (
    <>
      {/* If message is there showing the alert */}
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
      {/* If error is there showing the alert */}
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
        {/* Rendering the TodoList component */}
        <TodoList />
      </div>
    </>
  );
}

/* Exporting Home Component */
export default Home;
