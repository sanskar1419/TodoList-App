import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getToggleTodoLoading,
  getUpdatedTodo,
  todoActions,
  updateTodoAsync,
} from "../../redux/slice/todoSlice";

function UpdateTodo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todo = useSelector(getUpdatedTodo);
  const [title, setTitle] = useState("");
  const updateTodoLoading = useSelector(getToggleTodoLoading);

  useEffect(() => {
    setTitle(todo.title);
  }, []);

  const handleSubmit = () => {
    dispatch(todoActions.startToggleLoading());
    dispatch(
      updateTodoAsync({
        id: todo.id,
        title: title,
        userId: todo.userId,
        completed: !todo.completed,
      })
    );
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex mt-4 text-3xl flex-col justify-center items-center">
      <h1 className="font-extrabold mb-5">Add A New Todo</h1>
      <input
        type="text"
        placeholder="Type Your Task Here"
        className="input input-bordered input-success w-full max-w-lg mb-5"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
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

export default UpdateTodo;
