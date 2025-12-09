import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/teacher.css";
import CrearClase from "./CrearClase";
import CrearTarea from "./CrearTarea";

export default function PerfilProfesor() {
  const navigate = useNavigate();

  const [profesor, setProfesor] = useState(null);
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [mostrarCrearClase, setMostrarCrearClase] = useState(false);
  const [mostrarClases, setMostrarClases] = useState(false);
  const [clases, setClases] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

  const [mostrarEstudiantes, setMostrarEstudiantes] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);

  const [mostrarCrearTarea, setMostrarCrearTarea] = useState(false);
  const [tareas, setTareas] = useState([]);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    foto_perfil: ""
  });

  // Traer datos del profesor al cargar
  useEffect(() => {
    const fetchProfesor = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile", { credentials: "include" });
        const data = await res.json();
        if (data.success) {
          setProfesor(data.usuario);
          setFormData({
            nombre: data.usuario.nombre,
            email: data.usuario.email,
            foto_perfil: data.usuario.foto_perfil || ""
          });
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Error al traer datos del profesor");
      }
    };
    fetchProfesor();
  }, []);

  // Cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Guardar perfil
  const handleGuardar = async () => {
    try {
      const res = await fetch("http://localhost:5000/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        alert("Perfil actualizado");
        setProfesor({ ...profesor, ...formData });
        setEditarPerfil(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al actualizar perfil");
    }
  };

  // Traer clases
  const fetchClases = async () => {
    try {
      const res = await fetch("http://localhost:5000/clases", { credentials: "include" });
      const data = await res.json();
      if (data.success) {
        setClases(data.clases);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al traer las clases");
    }
  };

  const handleEliminarClase = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/clases/${id}`, { method: "DELETE", credentials: "include" });
      const data = await res.json();
      if (data.success) {
        setClases(clases.filter((clase) => clase.id_materia !== id));
        alert("Clase eliminada");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la clase");
    }
  };

  // Traer estudiantes de la clase
  const fetchEstudiantes = async () => {
    try {
      const res = await fetch(`http://localhost:5000/estudiantes?idProfesor=${profesor.id_usuario}`, { credentials: "include" });
      const data = await res.json();
      if (data.success) {
        setEstudiantes(data.estudiantes);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al traer estudiantes");
    }
  };
  
  

  const handleEliminarEstudiante = async (idInscripcion) => {
    try {
      const res = await fetch(`http://localhost:5000/eliminar-inscripcion/${idInscripcion}`, {
        method: "DELETE",
        credentials: "include"
      });
  
      const data = await res.json();
  
      if (data.success) {
        alert("Estudiante eliminado");
  
        
        fetchEstudiantes(claseSeleccionada.id_materia);
  
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };
  
  

  // Tareas
  const fetchTareas = async (id_materia) => {
    try {
      const res = await fetch(`http://localhost:5000/tareas/${id_materia}`, { credentials: "include" });
      const data = await res.json();
      if (data.success) {
        setTareas(data.tareas);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al traer las tareas");
    }
  };

  const handleEliminarTarea = async (id_tarea) => {
    try {
      const res = await fetch(`http://localhost:5000/tareas/${id_tarea}`, { method: "DELETE", credentials: "include" });
      const data = await res.json();
      if (data.success) {
        setTareas(tareas.filter((t) => t.id_tarea !== id_tarea));
        alert("Tarea eliminada");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la tarea");
    }
  };

  if (!profesor) return <p>Cargando perfil...</p>;

  return (
    <div className="fondoProfe">
      <div className="bloque-elegante">
        <div className="header-profe">
          <img
            src={profesor.foto_perfil || "https://i.pinimg.com/564x/7e/9e/2a/7e9e2aac5baa2e951b5e8f302ff7f6fd.jpg"}
            alt="Foto del profesor"
            className="foto-profe"
          />
          <h1 className="titulo-profe">Perfil del Profesor</h1>
        </div>

        {!editarPerfil ? (
          <div className="info-profe">
            <p><span>Nombre:</span> {profesor.nombre}</p>
            <p><span>Correo:</span> {profesor.email}</p>
            <p><span>Área:</span> Profe</p>
          </div>
        ) : (
          <div className="info-profe">
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo" />
            <input type="text" name="foto_perfil" value={formData.foto_perfil} onChange={handleChange} placeholder="URL de la foto" />
            <button onClick={handleGuardar} className="btn-profe verde">Guardar Cambios</button>
            <button onClick={() => setEditarPerfil(false)} className="btn-profe rojo">Cancelar</button>
          </div>
        )}

        <div className="botones-profe">
          <button
            className="btn-profe azul"
            onClick={() => {
              setMostrarClases(!mostrarClases);
              if (!mostrarClases) fetchClases();
            }}
          >
            Ver Mis Clases
          </button>

          <button
            className="btn-profe verde"
            onClick={() => setMostrarCrearClase(true)}
          >
            Crear nueva clase
          </button>

          <button
            onClick={() => setEditarPerfil(true)}
            className="btn-profe amarillo"
          >
            Editar perfil
          </button>

          <button
            onClick={() => navigate("/start")}
            className="btn-profe rojo"
          >
            Ir al Inicio
          </button>
        </div>
      </div>

      {mostrarClases && (
        <div className="panel-clases">
          <h2>Mis Clases</h2>
          <ul className="lista-clases">
            {clases.map((clase) => (
              <li key={clase.id_materia} className="item-clase">
                {clase.nombre}
                <button onClick={() => handleEliminarClase(clase.id_materia)} className="btn-eliminar">Eliminar</button>
                <button
                  className="btn-profe azul"
                  onClick={() => {
                    setClaseSeleccionada(clase);
                    fetchEstudiantes(clase.id_materia);
                    setMostrarEstudiantes(true);
                  }}
                >
                  Ver Estudiantes
                </button>
                <button
                  className="btn-profe verde"
                  onClick={() => {
                    setClaseSeleccionada(clase);
                    fetchTareas(clase.id_materia);
                  }}
                >
                  Ver Tareas
                </button>
                <button
                  className="btn-profe azul"
                  onClick={() => {
                    setClaseSeleccionada(clase);
                    setMostrarCrearTarea(true);
                  }}
                >
                  Crear Tarea
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mostrarEstudiantes && claseSeleccionada && (
        <div className="panel-estudiantes">
          <h2>Estudiantes de {claseSeleccionada.nombre}</h2>
          <ul className="lista-estudiantes">
          {estudiantes.map((est) => (
            <li key={est.id_usuario}>
              {est.nombre} - {est.email}
              <button onClick={() => handleEliminarEstudiante(est.id_inscripcion)}>Eliminar</button>
            </li>
          ))}    
          </ul>
        </div>
      )}

      {claseSeleccionada && tareas.length > 0 && (
        <div className="panel-tareas">
          <h3>Tareas de {claseSeleccionada.nombre}</h3>
          <ul className="lista-tareas">
            {tareas.map((tarea) => (
              <li key={tarea.id_tarea} className="item-tarea">
                {tarea.titulo} - Entrega: {tarea.fecha_entrega}
                <button onClick={() => handleEliminarTarea(tarea.id_tarea)} className="btn-eliminar">
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mostrarCrearClase && (
        <CrearClase onClose={() => { setMostrarCrearClase(false); fetchClases(); }} />
      )}

      {mostrarCrearTarea && claseSeleccionada && (
        <CrearTarea
          idMateria={claseSeleccionada.id_materia}
          onClose={() => { setMostrarCrearTarea(false); fetchTareas(claseSeleccionada.id_materia); }}
          onTareaCreada={() => fetchTareas(claseSeleccionada.id_materia)}
        />
      )}
    </div>
  );
}
