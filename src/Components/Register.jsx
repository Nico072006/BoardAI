import React from "react";
import { useNavigate } from "react-router-dom"; // <- lo uso para navegar
import { Link } from "react-router-dom";
import "../style/Register.css";

export default function Registro({ handleSubmit, formRef, mensaje }) {

  const navigate = useNavigate(); 
  // Uso useNavigate para poder enviar al usuario al login cuando yo quiera

  return (
    <div className="RegistroCon">
      <div className="RegistroForm">
        <form className="RegistroF" ref={formRef} onSubmit={handleSubmit}>
          <h1>BoardAI</h1>

          {/* Campo nombre */}
          <div className="Form">
            <label>Full Name</label>
            <input type="text" name="Name" id="Name" placeholder="Nicolas Muñoz" required />
          </div>

          {/* Campo email */}
          <div className="Form">
            <label>Email</label>
            <input type="email" name="email" id="email" placeholder="Ejemplo@gmail.com" required />
          </div>

          {/* Selección de rol */}
          <div className="Form">
            <label>Rol</label>
            <select name="RolUsu" id="RolUsu">
              <option value="one">Student</option>
              <option value="two">Teacher</option>
            </select>
          </div>

          {/* Contraseña */}
          <div className="Form">
            <label>Password</label>
            <input type="password" name="password" id="password" required />
          </div>

          {/* Botón registrar */}
          <div className="Form">
            <button type="submit" id="submit">
              Register
            </button>
          </div>

          {/* Botón para volver al login */}
          <p className="BackToLogin">
            Already have an account?{" "}
            <Link to="/" className="BackToLoginLink">
              Login
            </Link>
          </p>


          {/* Mensaje de error */}
          {mensaje && <p className="mensaje">{mensaje}</p>}
        </form>
      </div>

      <div className="RegistroImg">
        <img
          src="https://i.pinimg.com/736x/6a/99/d5/6a99d52370d6d2397b8853a2908ed827.jpg"
          alt="Login Illustration"
        />
      </div>
    </div>
  );
}
