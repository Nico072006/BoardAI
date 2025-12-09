import React, { useEffect, useState } from "react";
import "../style/cards.css"; 

function CardsCarrusel({ rol }) {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        let url = "";
        if (rol === "estudiante") {
          url = "http://localhost:5000/tareas-estudiante"; // Backend que devuelve las tareas del estudiante
        } else {
          url = "http://localhost:5000/tareas-profesor"; // Opcional: tareas que creó el profesor
        }

        const res = await fetch(url, { credentials: "include" });
        const data = await res.json();
        if (data.success) setTareas(data.tareas);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };

    fetchTareas();
  }, [rol]);

  return (
    <div className="carrusel-contenedor">
      <div className="carrusel">
        {tareas.map((tarea) => (
          <div key={tarea.id_tarea} className="tarjeta">
            {/* Puedes mostrar imagen de tarea si existe */}
            {tarea.archivo && (
              <img 
                src={`http://localhost:5000/uploads/${tarea.archivo}`} 
                alt={tarea.titulo} 
                className="tarjeta-img" 
              />
            )}
            <div className="tarjeta-info">
              <h3>{tarea.titulo}</h3>
              <p>{tarea.descripcion}</p>
              <p><strong>Entrega:</strong> {new Date(tarea.fecha_entrega).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsCarrusel;
