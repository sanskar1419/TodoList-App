// Importing necessary module, component etc.
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAsync,
  getAddTodoLoading,
  todoActions,
} from "../../redux/slice/todoSlice";
import { useNavigate } from "react-router-dom";

/* Defining functional AddTodo component */
function AddTodo() {
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Defining Navigator */
  const navigate = useNavigate();
  /* Defining state variable using useState hook to store title input */
  const [title, setTitle] = useState("");
  /* Getting addLoading state using useSelector hook from redux store */
  const addLoading = useSelector(getAddTodoLoading);

  /* Function to handle form submit */
  const handleSubmit = () => {
    /* Dispatching the action to set the loading state to true */
    dispatch(todoActions.startAddLoading());
    /* Dispatching action addTodoAsync to make API call and add new todo */
    dispatch(addTodoAsync(title));
    /* After 1s navigating to home page */
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  /* Returning the JSX */
  return (
    <div className="flex mt-4 text-3xl flex-col justify-center items-center">
      <h1 className="font-extrabold mb-5">Add A New Todo</h1>
      <input
        type="text"
        placeholder="Type Your Task Here"
        className="input input-bordered input-success w-full max-w-lg mb-5"
        /* Setting the value as tittle */
        value={title}
        /* On changing the input setting the title */
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* If loading state is true showing the spinner otherwise button */}
      {addLoading ? (
        <div>
          {" "}
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <button className="btn btn-active btn-primary" onClick={handleSubmit}>
          Add Todo
        </button>
      )}
    </div>
  );
}

/* Exporting AddTodo Component */
export default AddTodo;
