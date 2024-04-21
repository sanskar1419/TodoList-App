import editImage from "../../images/edit.png";
import spider from "../../images/spider.jpg";
import deleteImg from "../../images/delete.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoAsync,
  getKey,
  getTodoDeleteLoading,
  todoActions,
} from "../../redux/slice/todoSlice";

function Todo({ todo }) {
  const dispatch = useDispatch();
  const deleteLoading = useSelector(getTodoDeleteLoading);
  const key = useSelector(getKey);

  const handleDelete = () => {
    dispatch(todoActions.setKey(todo.id));
    dispatch(todoActions.deleteTodoStart());
    dispatch(deleteTodoAsync(todo.id));
  };

  return (
    <div className="card card-side bg-base-300 shadow-xl mb-4 max-w-3xl">
      <figure>
        <img src={spider} alt="Movie" />
      </figure>
      <div className="card-body">
        <div className="card-actions absolute top-0 right-1">
          <button className="btn btn-square">
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
          <button className="btn btn-secondary">Toggle Todo</button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
