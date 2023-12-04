import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

const CreateTask = () => {
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      priority: 'low', // Establece un valor predeterminado
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/task`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData),
        })
        if(response.ok) {
          toast.success('Tarea creada exitosamente');
        } else {
          toast.error('Error al crear la tarea');
        }
      } catch (error) {
        console.error('Error', error)
        toast.error('Error al crear la tarea'); 
      }
    }

    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
    }, [])

    
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label">
        Title:
        <input
          className="form__input"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label className="form__label">
        Description:
        <textarea
          className="form__input"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label className="form__label">
        Priority:
        <div className='form__radio-container'>
          <label>
            <input
              type="radio"
              name="priority"
              value="low"
              checked={formData.priority === 'low'}
              onChange={handleChange}
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="medium"
              checked={formData.priority === 'medium'}
              onChange={handleChange}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="high"
              checked={formData.priority === 'high'}
              onChange={handleChange}
            />
            High
          </label>
        </div>
      </label>
      <br />
      <button className="form__button" type="submit">
        Create Task
      </button>
    </form>
  )
}

export default CreateTask