import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // <- para redirigir
import "../style/Login.css";

export default function Login() {
  const formRef = useRef();
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); // <- hook de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(formRef.current);
    const email = formData.get("email");
    const contrasena = formData.get("password");
  
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ email, contrasena }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Redirigir según rol
        if (data.rol === "profesor") {
          navigate("/teacher");
        } else if (data.rol === "estudiante") {
          navigate("/student");
        } else {
          navigate("/start");
        }
      } else {
        setMensaje(data.message);
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor");
    }
  };
  

  return (
    <div className="LoginCon">
      <div className="LoginImg">
        <img
          src="https://i.pinimg.com/736x/cd/2c/de/cd2cde0acd7fe399e5f3b0f66e431125.jpg"
          alt="Login Illustration"
        />
      </div>

      <div className="LoginForm">
        <form className="LoginF" ref={formRef} onSubmit={handleSubmit}>
          <h1>BoardAI</h1>

          <div className="Form">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ejemplo@gmail.com"
              required
            />
          </div>

          <div className="Form">
            <label>Password</label>
            <input type="password" name="password" id="password" required />
          </div>

          <div className="Form">
            <button type="submit" id="submit">
              Login
            </button>
          </div>

          {mensaje && <p className="mensaje">{mensaje}</p>}

          <p className="CreateLogin">
            ¿Don't have an account??{" "}
            <span onClick={() => window.location.href = "/Register"}>
              Create one
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
