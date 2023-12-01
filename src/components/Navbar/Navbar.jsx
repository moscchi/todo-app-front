import { Link } from "react-router-dom";
import "./styles.css";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const NavBar = () => {
  const { token, setToken } = useContext(UserContext);
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to={"/"}>Inicio</Link>
        </li>

        <li>
          <Link to={"/create-task"}>Crear tarea</Link>
        </li>
        {!token ? (
          <>
            <li>
              <Link to={"/register"}>Registro</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/my-tasks"}>Mis Tareas</Link>
            </li>
            <li style={{ cursor: "pointer" }} onClick={() => setToken(null)}>
              Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
