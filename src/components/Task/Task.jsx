import { useContext } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
const Task = ({ id, title, description, username, userTasks }) => {
  const { token } = useContext(UserContext);
  const handleDelete = async () => {

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/task/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`
        }
        }
      );
      if (response.ok) {
        toast.info("Tarea eliminada");
      } else {
        toast.error("Ocurrió un error.");
      }
    } catch (error) {
      toast.error("Ocurrió un error.");
    }
  };
  return (
    <>
      <h1>{title}</h1> <div>{description}</div>{" "}
      <sub>
        {username}{" "}
        { userTasks && <button onClick={handleDelete}>
          <FaRegTrashCan />
        </button> }
      </sub>{" "}
    </>
  );
};

export default Task;
