import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/MisEstudiantes.css";

export default function MisEstudiantes() {
  const [materias, setMaterias] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  useEffect(() => {
    const cargarMaterias = async () => {
      const res = await fetch("http://localhost:5000/materias/profesor", {
        credentials: "include"
      });

      const data = await res.json();
      if (data.success) setMaterias(data.materias);
    };

    cargarMaterias();
  }, []);

  const cargarEstudiantes = async (id_materia, nombreMateria) => {
    setMateriaSeleccionada(nombreMateria);

    const res = await fetch(
      `http://localhost:5000/profesor/materia/${id_materia}/estudiantes`,
      { credentials: "include" }
    );

    const data = await res.json();
    if (data.success) setEstudiantes(data.estudiantes);
  };

  return (
    <div className="estudiantes-container">
      <p className="VolverAtras">
            <Link to="/ProfesorStart" className="VolverAtrasLink">
            ↩︎  volver 
            </Link>
      </p>
      <h2 className="titulo">👥 Estudiantes por Materia</h2>

      {/* Lista de materias */}
      <div className="lista-materias">
        {materias.map((m) => (
          <button
            key={m.id_materia}
            className="btn-materia"
            onClick={() => cargarEstudiantes(m.id_materia, m.nombre)}
          >
            📚 {m.nombre}
          </button>
        ))}
      </div>

      {/* Lista de estudiantes */}
      {materiaSeleccionada && (
        <div className="contenedor-estudiantes">
          <h3 className="subtitulo">
            Estudiantes de <span>{materiaSeleccionada}</span>
          </h3>


          {estudiantes.length === 0 ? (
            <p className="sin-estudiantes">No hay estudiantes inscritos.</p>
          ) : (
            <ul className="lista-estudiantes">
              {estudiantes.map((e) => (
                <li key={e.id_usuario} className="estudiante-card">
                  <h4>{e.nombre}</h4>
                  <p>{e.email}</p>
                </li>
              ))}
            </ul>
          )}
          


        </div>
      )}
    </div>
  );
}
