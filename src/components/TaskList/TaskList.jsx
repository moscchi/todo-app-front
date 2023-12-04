import Task from "../Task/Task";
import { useFetchTasks } from "../../hooks/useFetchTasks";
import { useState } from "react";

const TaskList = ({ token = null }) => {
  const [refreshTasks, setRefreshTasks] = useState(false)

  const { error, loading, taskList } = useFetchTasks(refreshTasks);

  if (loading) return <div>Cargando tareas...</div>;
  if (error)
    return <div>Hubo un error inesperado, por favor vuelve a intentarlo.</div>;
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <Task
          setRefreshTasks={setRefreshTasks}
            key={task._id}
            id={task._id}
            title={task.title}
            description={task.description}
            username={task.username}
            userTasks={!!token}
            priority={task.priority}
            status={task.status}
          />
        ))
      ) : (
        <div>No hay tareas</div>
      )}
    </>
  );
};

export default TaskList;
