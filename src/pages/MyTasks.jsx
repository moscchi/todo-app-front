import { useContext } from 'react'
import TaskList from '../components/TaskList/TaskList'
import { UserContext } from '../Context/UserContext';

const MyTasks = () => {
    const { token } = useContext(UserContext);
  return (
    <div><TaskList token={token}/></div>

  )
}

export default MyTasks