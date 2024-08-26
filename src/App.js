import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import UserLayout from "./components/UserLayout";
import MainLayout from "./components/MainLayout";
import Debounce from "./components/Debounce";
import InfiniteScroll from "./components/InfiniteScroll";
import NewInfiniteScroll from "./components/NewInfiniteScroll";
import ModalParent from "./components/ModalParent";
import MaterialUIDrawer from "./components/MaterialUIDrawer";
import HeadlessUIDrawer from "./components/HeadlesUIDrawer";
import Test from "./components/Test";
import {
  NotFoundPage,
  PostDetailsPage,
  PostsDetailsPage,
  Home,
  UserProfilePage,
  RegistrationPage,
  LoginPage,
} from "./pages";
import { Auth } from "./features/auth/components";

function App() {
  return (
    <BrowserRouter>
      <Auth>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="posts" element={<PostsDetailsPage />} />
            <Route path="post/:id" element={<PostDetailsPage />} />
            <Route path="todos" element={<TodoList />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/user" element={<UserLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="user-profile" element={<UserProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/debo" element={<Debounce />} />
          <Route path="/scroll" element={<InfiniteScroll />} />
          <Route path="/newscroll" element={<NewInfiniteScroll />} />
          <Route path="/modalparent" element={<ModalParent />} />
          <Route path="/materialuidrawer" element={<MaterialUIDrawer />} />
          <Route path="/headlesuidrawer" element={<HeadlessUIDrawer />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Auth>
    </BrowserRouter>
  );
}

export default App;
