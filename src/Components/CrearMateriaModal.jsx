import { useState } from "react";
import "../style/CrearMateriaModal.css";

function CrearMateriaModal({ close }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const crearMateria = async () => {
    const response = await fetch("http://localhost:5000/crear-materia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        nombre,
        descripcion
      })
    });
  
    const data = await response.json();
  
    if (data.success) {
      alert("Materia creada correctamente");
      close(); 
    } else {
      alert(data.message);
    }
  };
  

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="crear-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Crear nueva materia</h2>

        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <button onClick={crearMateria}>Crear</button>
        <p className="cerrar" onClick={close}>Cerrar</p>
      </div>
    </div>
  );
}

export default CrearMateriaModal;
