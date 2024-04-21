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

function Todo({ todo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteLoading = useSelector(getTodoDeleteLoading);
  const key = useSelector(getKey);
  const toggleLoading = useSelector(getToggleTodoLoading);

  const handleDelete = () => {
    dispatch(todoActions.setKey(todo.id));
    dispatch(todoActions.deleteTodoStart());
    dispatch(deleteTodoAsync(todo.id));
  };

  const handleToggleTodo = () => {
    dispatch(todoActions.startToggleLoading());
    dispatch(
      updateTodoAsync({
        id: todo.id,
        title: todo.title,
        userId: todo.userId,
        completed: !todo.completed,
      })
    );
  };

  const handleEdit = () => {
    dispatch(todoActions.setUpdateTodo(todo));
    navigate("/update");
  };

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
          <button className="btn bg-transparent" onClick={handleDelete}>
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
            className={`btn ${todo.completed ? "btn-success" : "btn-error"}`}
          >
            {todo.completed ? "Completed" : "Not Completed"}
          </button>
          {toggleLoading ? (
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

export default Todo;
