import PostDetails from "./components/PostDetails";
import PostsList from "./components/PostsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
