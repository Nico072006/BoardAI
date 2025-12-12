import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/VerTareaProfe.css";

export default function VerTareaProfe() {

  const { id_tarea } = useParams();
  const [tarea, setTarea] = useState(null);
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/tareas/${id_tarea}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log("DATA TAREA:", data);
        if (data.success) {
          setTarea(data.tarea);
          setEntregas(data.entregas);
        }
      });
  }, [id_tarea]);


  const calificarEntrega = async (id_entrega, nuevaNota) => {
    const res = await fetch(`http://localhost:5000/entregas/calificar/${id_entrega}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ calificacion: nuevaNota })
    });

    const data = await res.json();

    if (data.success) {
      setEntregas(prev =>
        prev.map(e =>
          e.id_entrega === id_entrega ? { ...e, calificacion: nuevaNota } : e
        )
      );
    }
  };


  const comentarEntrega = async (id_entrega, texto) => {
    const res = await fetch(`http://localhost:5000/entregas/comentar/${id_entrega}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ comentario: texto })
    });

    return await res.json();
  };


  if (!tarea) return <p className="cargando">Cargando tarea...</p>;

  return (
    <div className="contenedor-tarea-profe">
      <h2 className="titulo-tarea">{tarea.titulo}</h2>
      <p className="descripcion-tarea">{tarea.descripcion}</p>
      <p className="fecha">📅 Fecha entrega: {tarea.fecha_entrega}</p>

      <h3 className="subtitulo">📘 Entregas de estudiantes</h3>

      {entregas.length === 0 ? (
        <p>No hay entregas todavía.</p>
      ) : (
        entregas.map(ent => (
          <div key={ent.id_entrega} className="entrega-card">
            <p><strong>Alumno:</strong> {ent.nombre_estudiante}</p>
            <a href={ent.archivo_entregado} target="_blank" className="archivo-link">
              📎 Ver archivo
            </a>

            <p><strong>Calificación:</strong> {ent.calificacion ?? "Sin calificar"}</p>

            <button
              className="btn-calificar"
              onClick={() => {
                const nueva = prompt("Ingrese la calificación:");
                if (nueva) calificarEntrega(ent.id_entrega, nueva);
              }}
            >
              Calificar
            </button>

            <button
              className="btn-comentar"
              onClick={() => {
                const comentario = prompt("Escribe un comentario para el alumno:");
                if (comentario) comentarEntrega(ent.id_entrega, comentario);
              }}
            >
              Comentar
            </button>
          </div>
        ))
      )}
    </div>
  );
}
