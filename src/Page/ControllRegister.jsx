import React, { useRef, useState } from "react";
import Registro from "../Components/Register";

const ControllRegister = () => {
  const formRef = useRef(null);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;

    const nombre = form.Name.value;
    const email = form.email.value;
    const rol = form.RolUsu.value === "one" ? "estudiante" : "profesor";
    const contrasena = form.password.value;

    if (!nombre || !email || !rol || !contrasena) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    const data = { nombre, email, rol, contrasena };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMensaje("Usuario registrado con éxito ");
        form.reset();
      } else {
        setMensaje(result.message || "Error al registrar usuario ");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error en la conexión al servidor ");
    }
  };

  return <Registro handleSubmit={handleSubmit} formRef={formRef} mensaje={mensaje} />;
};

export default ControllRegister;
