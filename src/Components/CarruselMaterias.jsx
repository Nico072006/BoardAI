import React, { useEffect, useState } from "react";
import "../style/carruselMaterias.css";

function CarruselMaterias() {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        // 1️⃣ Traer todas las materias disponibles
        const res1 = await fetch("http://localhost:5000/materias/disponibles", {
          credentials: "include",
        });
        const data1 = await res1.json();

        // 2️⃣ Traer las materias inscritas por el estudiante
        const res2 = await fetch("http://localhost:5000/mis-materias", {
          credentials: "include",
        });
        const data2 = await res2.json();

        if (data1.success && data2.success) {
          const inscritas = data2.materias;

          // 3️⃣ Marcar cuáles materias ya están inscritas
          const materiasMarcadas = data1.materias.map((m) => {
            const found = inscritas.find((i) => i.id_materia === m.id_materia);
            return {
              ...m,
              inscrito: !!found,
              id_inscripcion: found ? found.id_inscripcion : null,
            };
          });

          setMaterias(materiasMarcadas);
        }
      } catch (error) {
        console.error("Error al cargar materias:", error);
      }
    };

    fetchMaterias();
  }, []);

  // 👉 INSCRIBIRSE
  const inscribirse = async (id_materia) => {
    try {
      const res = await fetch(`http://localhost:5000/inscribirse/${id_materia}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        alert("Te inscribiste correctamente 📘✨");
        actualizarEstado(id_materia, true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 👉 SALIRSE (DELETE con id_inscripcion)
  const salirse = async (id_inscripcion, id_materia) => {
    try {
      const res = await fetch(`http://localhost:5000/inscripciones/${id_inscripcion}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        alert("Te saliste de la materia ❌");
        actualizarEstado(id_materia, false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 👉 Actualiza el estado en pantalla
  const actualizarEstado = (id_materia, inscrito) => {
    setMaterias((prev) =>
      prev.map((m) =>
        m.id_materia === id_materia
          ? { ...m, inscrito, id_inscripcion: inscrito ? "TEMP" : null }
          : m
      )
    );
  };

  return (
    <div className="carrusel-contenedor">
      <h2 className="titulo">Materias disponibles</h2>
      <div className="carrusel">
        {materias.map((m) => (
          <div
            key={m.id_materia}
            className={`tarjeta ${m.inscrito ? "inscrito" : ""}`}
          >
            <div className="tarjeta-info">
              <h3>{m.nombre}</h3>
              <p>{m.descripcion}</p>

              {m.inscrito ? (
                <button
                  className="btn-salirse"
                  onClick={() => salirse(m.id_inscripcion, m.id_materia)}
                >
                  ❌ Salirse
                </button>
              ) : (
                <button
                  className="btn-inscribirse"
                  onClick={() => inscribirse(m.id_materia)}
                >
                  ➕ Inscribirme
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarruselMaterias;
