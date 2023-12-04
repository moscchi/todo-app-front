import { useContext, useState } from "react";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import "./styles.css";
import { getPriorityColor } from "../../utils/getPriorityColor";
import EditModal from "../EditModal/EditModal";
const Task = ({
  id,
  title,
  description,
  username,
  userTasks,
  priority,
  status,
  setRefreshTasks
}) => {
  const { token } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/task/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        toast.info("Tarea eliminada");
        setRefreshTasks(prevState => !prevState)

      } else {
        toast.error("Ocurrió un error.");
      }
    } catch (error) {
      toast.error("Ocurrió un error.");
    }
  };
  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleCompleteTask = async (id, status) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/task/${id}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          }
        }
      );
      if(response.ok){
        setRefreshTasks(prevState => !prevState)
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(status ? "Error, no se pudo desmarcar la tarea.":"Error, no se pudo marcar la tarea como completada.");
    }
  }
  return (
    <div className={`task-card-${status}`}>
      <div className="task-card__header">
        <h1 className="task-card__title">{title}</h1>
        <div className="task-card__header-actions">
          {userTasks && (
            <>
              <button
                className="task-card__edit-button"
                onClick={handleEditClick}
                title="Editar tarea"
              >
                <FaPencil />
              </button>
              <button
                className="task-card__delete-button"
                onClick={handleDelete}
                title="Eliminar tarea"
              >
                <FaRegTrashCan />
              </button>
            </>
          )}
        </div>
      </div>
      <p className="task-card__description">{description}</p>
      <p className="task-card__priority">
        Estado: {status ? <span style={{color: 'greenyellow'}}>Complete</span> : "Pending"}
      </p>{" "}
      <p style={{ color: getPriorityColor(priority) }}>{priority}</p>
      <div className="task-card__footer">
        <sub className="task-card__info">{username} </sub>
        {userTasks &&
          (status ? (
            <button className="task-card__edit-button" onClick={() => handleCompleteTask(id, false)}>Desmarcar</button>
          ) : (
            <button className="task-card__edit-button" onClick={() => handleCompleteTask(id, true)}>
              Marcar como completado
            </button>
          ))}
      </div>
      <EditModal
        isOpen={isModalOpen}
        handleClose={handleClose}
        task={{id, title, description, priority, status}}
        setRefreshTasks={setRefreshTasks}
      />
    </div>
  );
};

export default Task;
