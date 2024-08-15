import PostDetails from "./components/PostDetails";
import PostsList from "./components/PostsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AuthComponent from "./components/AuthComponent";
import UserLayout from "./components/UserLayout";
import MainLayout from "./components/MainLayout";
import NoMatch from "./components/Nomatch";

function App() {
  return (
    <BrowserRouter>
      <AuthComponent>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="posts/:id" element={<PostDetails />} />
            <Route path="todos" element={<TodoList />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/user" element={<UserLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthComponent>
    </BrowserRouter>
  );
}

export default App;
