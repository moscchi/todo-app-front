import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { UserContext } from "./Context/UserContext";
import { useContext } from "react";
import CreateTask from "./pages/CreateTask";
import MyTasks from "./pages/MyTasks";

function App() {
  const { token } = useContext(UserContext);
  console.log(token);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/my-tasks" element={<MyTasks />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
