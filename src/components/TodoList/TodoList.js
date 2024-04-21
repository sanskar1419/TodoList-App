import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTodoAsync,
  getTodos,
  todoActions,
} from "../../redux/slice/todoSlice";
import Todo from "../Todo/Todo";

function TodoList() {
  const dispatch = useDispatch();

  /*  useEffect(() => {
    dispatch(todoActions.fetchStart());
    dispatch(getAllTodoAsync());
  }, []); */

  const todos = useSelector(getTodos);

  return (
    <div className="mt-4">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

export default TodoList;
