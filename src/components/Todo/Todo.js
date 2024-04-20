import editImage from "../../images/edit.png";
import spider from "../../images/spider.jpg";

function Todo({ todo }) {
  return (
    <div className="card card-side bg-base-300 shadow-xl mb-4 max-w-3xl">
      <figure>
        <img src={spider} alt="Movie" />
      </figure>
      <div className="card-body">
        <div className="card-actions absolute top-0 right-0">
          <button className="btn btn-square">
            <img src={editImage} width="40px" />
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