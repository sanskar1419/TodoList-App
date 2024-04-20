import TodoList from "../../components/TodoList/TodoList";

function Home() {
  return (
    <div className="flex mt-4 text-3xl flex-col justify-center items-center">
      <h1 className="font-extrabold">List Of All Todos</h1>
      <TodoList />
    </div>
  );
}

export default Home;
