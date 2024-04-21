// Importing necessary module, component etc.
import editImage from "../../images/edit.png";
import spider from "../../images/spider.jpg";
import deleteImg from "../../images/delete.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoAsync,
  getKey,
  getTodoDeleteLoading,
  getToggleTodoLoading,
  todoActions,
  updateTodoAsync,
} from "../../redux/slice/todoSlice";
import { useNavigate } from "react-router-dom";

/* Defining functional Todo component */
function Todo({ todo }) {
  /* Defining Dispatcher */
  const dispatch = useDispatch();
  /* Defining Navigator */
  const navigate = useNavigate();
  /* Getting deleteLoading state using useSelector hook from redux store */
  const deleteLoading = useSelector(getTodoDeleteLoading);
  /* Getting key state using useSelector hook from redux store */
  const key = useSelector(getKey);
  /* Getting toggleLoading state using useSelector hook from redux store */
  const toggleLoading = useSelector(getToggleTodoLoading);

  /* Function to handle delete */
  const handleDelete = () => {
    /* Dispatching a action to set the key */
    dispatch(todoActions.setKey(todo.id));
    /* Dispatching a action to set the loading state to true */
    dispatch(todoActions.deleteTodoStart());
    /* Dispatching action deleteTodoAsync to make API call and delete todo */
    dispatch(deleteTodoAsync(todo.id));
  };

  /* Function to handleToggleTodo */
  const handleToggleTodo = () => {
    /* Dispatching a action to set the key */
    dispatch(todoActions.setKey(todo.id));
    /* Dispatching a action to set the loading state to true */
    dispatch(todoActions.startToggleLoading());
    /* Dispatching action updateTodoAsync to make API call and update todo */
    dispatch(
      updateTodoAsync({
        id: todo.id,
        title: todo.title,
        userId: todo.userId,
        completed: !todo.completed,
      })
    );
  };

  /* Function to handleEdit */
  const handleEdit = () => {
    /* Dispatching a action to set todo to update */
    dispatch(todoActions.setUpdateTodo(todo));
    /* Navigating to update page */
    navigate("/update");
  };

  /* Returning the JSX */
  return (
    <div className="card card-side bg-base-300 shadow-xl mb-4 max-w-3xl">
      <figure>
        <img src={spider} alt="Movie" />
      </figure>
      <div className="card-body">
        <div className="card-actions absolute top-0 right-1">
          <button className="btn btn-square" onClick={handleEdit}>
            <img src={editImage} width="40px" />
          </button>
          {/* On clicking to button call the function handleDelete */}
          <button className="btn bg-transparent" onClick={handleDelete}>
            {/* If loading state is true showing the spinner otherwise button */}
            {deleteLoading && key === todo.id ? (
              <span className="loading loading-spinner text-success"></span>
            ) : (
              <img src={deleteImg} width="40px" />
            )}
          </button>
        </div>
        <p className="text-lg font-bold">{todo.title}</p>
        <div className="card-actions justify-end">
          <button
            /* If todo.completed is true showing the btn-success otherwise btn-error  */
            className={`btn ${todo.completed ? "btn-success" : "btn-error"}`}
          >
            {todo.completed ? "Completed" : "Not Completed"}
          </button>
          {/* If loading state is true showing the spinner otherwise button */}
          {toggleLoading && key === todo.id ? (
            <div>
              <span className="loading loading-spinner text-info"></span>
            </div>
          ) : (
            <button className="btn btn-secondary" onClick={handleToggleTodo}>
              Toggle Todo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Exporting Todo Component */
export default Todo;
