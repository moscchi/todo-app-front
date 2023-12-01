import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "../Task/Task";

const TaskList = ({token = null}) => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if(token){
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/task/user`, {
                    headers: {
                        Authorization: `${token}`
                    }
                }
              );
                const data = await response.json();
                setTaskList(data);
                setLoading(false); 
        } else {
            const response = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/task`
            );
            const data = await response.json();
            setTaskList(data);
            setLoading(false);        
        }
      } catch (error) {
        toast.error("Error al cargar las tareas");
        setError(true);
      }
    };
    fetchTasks();
  }, []);
  if (loading) return <div>Cargando tareas...</div>;
  if (error)
    return <div>Hubo un error inesperado, por favor vuelve a intentarlo.</div>;
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => <Task key={task._id} id={task._id} title={task.title} description={task.description} username={task.username} userTasks={!!token}/>)
      ) : (
        <div>No hay tareas</div>
      )}
    </>
  );
};

export default TaskList;
