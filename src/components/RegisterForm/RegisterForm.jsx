import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
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
        // Redirigimos al login
        navigate('/login')
      } else {
        toast.error('Error en el registro.');
      }
    } catch (error) {
        toast.error('Error en el registro');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:{" "}
        <input
          value={formData.username}
          onChange={handleChange}
          required
          type="text"
          name="username"
        />
      </label>
      <br />
      <label>
        Password:{" "}
        <input
          value={formData.password}
          onChange={handleChange}
          required
          type="password"
          name="password"
        />
      </label>
      <br />
      <label>
        Repeat Password:{" "}
        <input
          value={formData.repeatPassword}
          onChange={handleChange}
          required
          type="password"
          name="repeatPassword"
        />
      </label>
      <br />
      <button>Submit</button>
    </form>
  );
};

export default RegisterForm;
