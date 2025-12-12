import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../style/MenuLateralProfesor.css";


function MenuLateralProfesor({ openCrearMateria }) {

  const navigate = useNavigate();

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

          <Link to="/profe/tareas/crear" className="menu-item">
            ➕ Crear Tarea
          </Link>


          <Link to="/profe/tareas" className="menu-item">
          ⭐ Calificaciones
          </Link>


          <li
                className="item-opcion cerrar-sesion"
                onClick={() => navigate("/")}>
                ⛔ Cerrar sesión
          </li>

        </nav>
      </aside>
    </div>
  );
}

export default MenuLateralProfesor;
