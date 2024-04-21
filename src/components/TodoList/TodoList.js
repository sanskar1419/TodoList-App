// Importing necessary module, component etc.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTodoAsync,
  getTodos,
  todoActions,
} from "../../redux/slice/todoSlice";
import Todo from "../Todo/Todo";

/* Defining functional TodoList component */
function TodoList() {
  /* Getting todo array using useSelector hook from redux store */
  const todos = useSelector(getTodos);

  /* Returning the JSX */
  return (
    <div className="mt-4">
      {/* Mapping over todos */}
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

/* Exporting TodoList Component */
export default TodoList;
