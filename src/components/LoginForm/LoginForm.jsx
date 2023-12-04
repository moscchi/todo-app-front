import { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import './styles.css'
const LoginForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });
      const { setToken } = useContext(UserContext);
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: formData.username,
                password: formData.password,
              }),
            }
          );
          if(response.ok){
            toast.success("Usuario registrado");
            const data = await response.json();
            setToken(data.token);
            navigate('/')
          } else {
            toast.error('Error en el registro.');
          }
        } catch (error) {
            toast.error('Error en el registro');
        }
      };
  return (
    <form className='form' onSubmit={handleSubmit}>
      <label className='form__label'>
        Username:{" "}
        <input
        className='form__input'
          value={formData.username}
          onChange={handleChange}
          required
          type="text"
          name="username"
        />
      </label>
      <br />
      <label className='form__label'>
        Password:{" "}
        <input className='form__input'
          value={formData.password}
          onChange={handleChange}
          required
          type="password"
          name="password"
        />
      </label>
      <br />
      <button className='form__button'>Login</button>
    </form>
  )
}

export default LoginForm