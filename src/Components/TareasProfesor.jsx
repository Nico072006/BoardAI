import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/TareasProfesor.css";

export default function TareasProfesor() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    const res = await fetch("http://localhost:5000/profe/tareas", {
      credentials: "include"
    });

    const data = await res.json();
    if (data.success) setTareas(data.tareas);
    else alert("No autorizado");
  };

  return (
    <div className="lista-tareas-profe">
      <h2>📚 Todas las Tareas</h2>

      {tareas.length === 0 && <p>No hay tareas registradas.</p>}

      {tareas.map((t) => (
        <div key={t.id_tarea} className="tarea-card">
          <p><strong>{t.titulo}</strong></p>
          <p>📅 {t.fecha_entrega}</p>

          <Link 
            to={`/profe/tarea/${t.id_tarea}/calificar`}
            className="btn-calificar"
          >
            ⭐ Calificar esta tarea
          </Link>
        </div>
      ))}
    </div>
  );
}
