import { useState } from "react";
import "../style/teacher.css";

export default function CrearTarea({ idMateria, onClose, onTareaCreada }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [fechaEntrega, setFechaEntrega] = useState("");

  const handleCrear = async () => {
    const formData = new FormData();
    formData.append("id_materia", idMateria);
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("fecha_entrega", fechaEntrega);
    if (archivo) formData.append("archivo", archivo);

    try {
      const res = await fetch("http://localhost:5000/tareas", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        alert("Tarea creada correctamente");
        onTareaCreada();
        onClose();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear la tarea");
    }
  };

  return (
    <div className="modal-fondo">
      <div className="modal">
        <h2>Crear Tarea</h2>
        <label>
          Título:
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </label>
        <label>
          Descripción:
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <label>
          Archivo:
          <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
        </label>
        <label>
          Fecha de entrega:
          <input type="date" value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} />
        </label>
        <div className="modal-botones">
          <button onClick={handleCrear} className="btn verde">Crear</button>
          <button onClick={onClose} className="btn rojo">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
