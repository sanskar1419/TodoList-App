import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAsync,
  getAddTodoLoading,
  todoActions,
} from "../../redux/slice/todoSlice";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const addLoading = useSelector(getAddTodoLoading);

  const handleSubmit = () => {
    dispatch(todoActions.startAddLoading());
    dispatch(addTodoAsync(title));
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

export default AddTodo;
