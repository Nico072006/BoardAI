import { Link } from "react-router-dom";
import "../style/MenuLateralProfesor.css";

function MenuLateralProfesor({ openCrearMateria }) {
  return (
    <div className="menu-profe-container">
      <aside className="menu-profe">
        <h2 className="menu-titulo">Panel Profesor</h2>

        <nav className="menu-links">
        <Link to="/profe/materias" className="menu-item">
        📚 Mis Materias
        </Link>



          <button onClick={openCrearMateria}> ➕ Crear Materia</button>

          <Link to="/profe/estudiantes" className="menu-item">
            👥 Mis Estudiantes
          </Link>

          <Link to="/profe/tareas" className="menu-item">
            📝 Tareas
          </Link>

          <Link to="/profe/calificaciones" className="menu-item">
            ⭐ Calificaciones
          </Link>

          <Link to="/profe/perfil" className="menu-item">
            ⚙️ Ajustes / Perfil
          </Link>
        </nav>
      </aside>
    </div>
  );
}

export default MenuLateralProfesor;
