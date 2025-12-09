import { useState } from "react";
import "../style/teacher.css";

export default function CrearClase({ onClose }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleCrear = async () => {
    if (!nombre || !descripcion) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/clases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nombre, descripcion })
      });

      const data = await res.json();

      if (data.success) {
        setMensaje("Clase creada correctamente");
        setNombre("");
        setDescripcion("");
        setTimeout(() => onClose(), 1000); // cerrar modal después de 1s
      } else {
        setMensaje(data.message);
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear la clase");
    }
  };

  return (
    <div className="modal-fondo">
      <div className="modal-contenedor">
        <h2>Crear Nueva Clase</h2>

        <input
          type="text"
          placeholder="Nombre de la clase"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <textarea
          placeholder="Descripción de la clase"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <div className="modal-botones">
          <button onClick={handleCrear} className="btn-profe verde">Crear</button>
          <button onClick={onClose} className="btn-profe rojo">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
