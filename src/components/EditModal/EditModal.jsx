import { useContext, useState } from "react";
import Modal from "react-modal";
import { UserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
const EditModal = ({ isOpen, handleClose, task, setRefreshTasks }) => {
  const { token } = useContext(UserContext);
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  });
  const handleChangeData = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/task/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(taskData),
        }
      );
      if (response.ok) {
        toast.success("Tarea editada");
        setRefreshTasks((prevState) => !prevState);
        handleClose();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error al editar la tarea");
      handleClose();
    }
  };
  return (
    <Modal isOpen={isOpen}>
      <h2>Editar Tarea</h2>
      <form>
        <input
          className="form__input"
          type="text"
          name="title"
          placeholder="Título"
          value={taskData.title}
          onChange={handleChangeData}
        />
        <input
          className="form__input"
          type="text"
          name="description"
          placeholder="Descripción"
          value={taskData.description}
          onChange={handleChangeData}
        />
        <select
          className="form__input"
          name="priority"
          onChange={handleChangeData}
        >
          <option selected={taskData.priority === "low"}>low</option>
          <option selected={taskData.priority === "medium"}>medium</option>
          <option selected={taskData.priority === "high"}>high</option>
        </select>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            className="form__button"
            onClick={handleClose}
            style={{ backgroundColor: "gray", width: "50%" }}
          >
            Cancelar
          </button>
          <button
            className="form__button"
            type="submit"
            style={{ width: "50%" }}
            onClick={handleSubmit}
          >
            Editar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
