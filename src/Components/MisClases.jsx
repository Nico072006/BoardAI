import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/MisClases.css";

export default function MisClases() {
  const [materias, setMaterias] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    cargarMaterias();
  }, []);

  const cargarMaterias = async () => {
    try {
      const res = await fetch("http://localhost:5000/materias/estudiante", {
        credentials: "include",
      });

      if (!res.ok) {
        console.error("❌ ERROR al cargar materias:", res.status);
        return;
      }

      const data = await res.json();
      if (data.success) setMaterias(data.materias);
    } catch (error) {
      console.error("❌ Error de red:", error);
    }
  };

  const eliminarMateria = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar esta materia?");
    if (!confirmar) return;

    const res = await fetch(`http://localhost:5000/materias/estudiante/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) {
      alert("Materia eliminada");
      cargarMaterias();
    }
  };

  const verTareas = async (id_materia, nombreMateria) => {
    setMateriaSeleccionada(nombreMateria);

    try {
      const res = await fetch(
        `http://localhost:5000/materias/${id_materia}/tareas`,
        { credentials: "include" }
      );

      if (!res.ok) {
        alert("No se pudieron cargar las tareas (Error " + res.status + ")");
        return;
      }

      const data = await res.json();

      if (data.success) {
        setTareas(data.tareas);
        setModalAbierto(true);
      } else {
        alert("No se pudieron cargar las tareas");
      }
    } catch (error) {
      console.error("❌ Error en verTareas:", error);
    }
  };

  return (
    <div className="misclases-container">
      <h2 className="titulo">📚 Mis Clases</h2>

      {materias.length === 0 ? (
        <p className="sin-materias">No estás inscrito en ninguna clase.</p>
      ) : (
        <ul className="lista-materias">
          {materias.map((m) => (
            <li key={m.id_materia} className="materia-card">
              <h3>{m.nombre}</h3>

              <div className="botones">
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarMateria(m.id_materia)}
                >
                  ❌ Eliminar
                </button>

                <button
                  className="btn-detalles"
                  onClick={() => verTareas(m.id_materia, m.nombre)}
                >
                  🔍 Ver
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link to="/Start" className="btn-volver">
        ↩︎ Volver
      </Link>

      {/* MODAL */}
      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>📌 Tareas de {materiaSeleccionada}</h2>

            {tareas.length === 0 ? (
              <p>No hay tareas para esta materia.</p>
            ) : (
              <ul className="lista-tareas">
                {tareas.map((t) => (
                  <li key={t.id_tarea} className="tarea-item">
                    <h4>{t.titulo}</h4>
                    <p>{t.descripcion}</p>
                    <p>📅 Entrega: {t.fecha_entrega}</p>

                    <button
                      className="btn-ir-entrega"
                      onClick={() => navigate(`/EntregaTarea/${t.id_tarea}`)}
                    >
                      🚀 Ir a entregar tarea
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              className="btn-cerrar"
              onClick={() => setModalAbierto(false)}
            >
              ❌ Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
