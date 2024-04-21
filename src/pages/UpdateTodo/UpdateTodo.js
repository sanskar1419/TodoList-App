// Importing necessary module, component etc.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getToggleTodoLoading,
  getUpdatedTodo,
  todoActions,
  updateTodoAsync,
} from "../../redux/slice/todoSlice";

/* Defining functional UpdateTodo component */
function UpdateTodo() {
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Defining Navigator */
  const navigate = useNavigate();
  /* Getting todo to update using useSelector hook from redux store */
  const todo = useSelector(getUpdatedTodo);
  /* Defining state variable using useState hook to store title input */
  const [title, setTitle] = useState("");
  /* Getting updateTodoLoading state using useSelector hook from redux store */
  const updateTodoLoading = useSelector(getToggleTodoLoading);

  /* Setting the title on mounting */
  useEffect(() => {
    setTitle(todo.title);
  }, []);

  /* Function to handle form submit */
  const handleSubmit = () => {
    /* Dispatching the action to set the loading state to true */
    dispatch(todoActions.startToggleLoading());
    /* Dispatching action updateTodoAsync to make API call and update the todo */
    dispatch(
      updateTodoAsync({
        id: todo.id,
        title: title,
        userId: todo.userId,
        completed: !todo.completed,
      })
    );
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
      {updateTodoLoading ? (
        <div>
          {" "}
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <button className="btn btn-active btn-primary" onClick={handleSubmit}>
          Update Todo
        </button>
      )}
    </div>
  );
}

/* Exporting UpdateTodo Component */
export default UpdateTodo;
