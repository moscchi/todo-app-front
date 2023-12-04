import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Context/UserContext"
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
export const useFetchTasks = (refreshTasks) => {
    const { token } = useContext(UserContext);
    const [taskList, setTaskList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { pathname } = useLocation()
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                let apiUrl = `${import.meta.env.VITE_BACKEND_URL}/task`;
                if(pathname === "/my-tasks") 
                    apiUrl = `${import.meta.env.VITE_BACKEND_URL}/task/user`;
                const response = await fetch(
                    apiUrl, {
                        headers: {
                            Authorization: `${token}`
                        }
                    }
                )
                const data = await response.json();
                setTaskList(data);
                setLoading(false);
            } catch(error){
                toast.error("Error al cargar las tareas");
                setError(true);
            }
        }
        fetchTasks();
    }, [refreshTasks])
    return { taskList, loading, error }
}