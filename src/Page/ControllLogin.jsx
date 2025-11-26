import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Components/Login";

const ContLogin = () => {
  const formRef = useRef(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    const email = form.email.value;
    const contrasena = form.password.value;

    if (!email || !contrasena) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    const data = { email, contrasena };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMensaje("Login exitoso ");
        form.reset();

        // Redirigir según rol
        if (result.rol === "profesor") {
          navigate("/teacher");
        } else {
          navigate("/student");
        }
      } else {
        setMensaje(result.message || "Credenciales incorrectas ");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor ");
    }
  };

  return <Login handleSubmit={handleSubmit} formRef={formRef} mensaje={mensaje} />;
};

export default ContLogin;
