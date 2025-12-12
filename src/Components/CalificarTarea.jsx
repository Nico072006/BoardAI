import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/CalificarTarea.css";

export default function CalificarTarea() {
  const { id_tarea } = useParams();
  const navigate = useNavigate();
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    cargarEntregas();
  }, []);

  const cargarEntregas = async () => {
    const res = await fetch(`http://localhost:5000/profe/tarea/${id_tarea}/entregas`);
    const data = await res.json();
    if (data.success) setEntregas(data.entregas);
  };

  const calificar = async (id_entrega, calificacion) => {
    const res = await fetch("http://localhost:5000/profe/tarea/calificar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_entrega, calificacion })
    });

    const data = await res.json();
    if (data.success) {
      alert("Calificación guardada");
      cargarEntregas();
    }
  };

  return (
    <div className="calificaciones-container">
      
      <div className="header">
        <button className="btn-volver" onClick={() => navigate(-1)}>⬅ Volver</button>
        <h2>Calificaciones de la tarea {id_tarea}</h2>
      </div>

      {entregas.map((e) => (
        <div key={e.id_entrega} className="entrega-item">

          <p><strong>Estudiante:</strong> {e.estudiante}</p>
          <p><strong>Texto:</strong> {e.texto_entrega || "Sin texto"}</p>

          {e.archivo_entregado && (
            <a href={`http://localhost:5000/uploads/${e.archivo_entregado}`} download className="btn-descargar">
              📥 Descargar archivo
            </a>
          )}

          <div className="calificar-box">
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Calificación"
              defaultValue={e.calificacion}
              id={`nota-${e.id_entrega}`}
            />

            <button
              className="btn-calificar"
              onClick={() => {
                const valor = document.getElementById(`nota-${e.id_entrega}`).value;
                calificar(e.id_entrega, valor);
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
