import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const CreateTask = () => {
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
    }, [])
  return (
    <div>CreateTask</div>
  )
}

export default CreateTask