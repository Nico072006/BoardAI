import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/CrearTarea.css";

export default function CrearTarea() {
  const [materias, setMaterias] = useState([]);
  const [id_materia, setIdMateria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [fecha_entrega, setFechaEntrega] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();

  // 🔥 Obtener materias del profesor
  useEffect(() => {
    const cargarMaterias = async () => {
      try {
        const res = await fetch("http://localhost:5000/materias/profesor", {
          credentials: "include",
        });

        const data = await res.json();
        console.log("Materias del profesor:", data);

        if (data.success) {
          setMaterias(data.materias);
        }
      } catch (error) {
        console.error("Error obteniendo materias:", error);
      }
    };

    cargarMaterias();
  }, []);

  const crearTarea = async (e) => {
    e.preventDefault();
    setMensaje(null);

    if (!id_materia || !titulo || !descripcion || !fecha_entrega) {
      setMensaje("Completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("id_materia", id_materia);
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      if (archivo) formData.append("archivo", archivo);
      formData.append("fecha_entrega", fecha_entrega);

      const res = await fetch("http://localhost:5000/tareas", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      console.log("Respuesta /tareas:", data);

      if (data.success) {
        alert("Tarea creada correctamente");
        navigate("/ProfesorStart");
      } else {
        setMensaje(data.message || "Error al crear tarea");
      }
    } catch (err) {
      console.error("Error creando tarea:", err);
      setMensaje("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-tarea-container">
      <p className="VolverAtras">
        <Link to="/ProfesorStart" className="VolverAtrasLink">
          ↩︎ volver
        </Link>
      </p>

      <h2>📘 Crear Nueva Tarea</h2>

      {mensaje && <p style={{ color: "crimson" }}>{mensaje}</p>}

      <form onSubmit={crearTarea} className="form-tarea">

        {/* 🔥 SELECT DE MATERIAS */}
        <label>Selecciona la materia</label>
        <select
          value={id_materia}
          onChange={(e) => setIdMateria(e.target.value)}
          required
        >
          <option value="">-- Selecciona una materia --</option>
          {materias.map((m) => (
            <option key={m.id_materia} value={m.id_materia}>
              {m.nombre}
            </option>
          ))}
        </select>

        <label>Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label>Archivo</label>
        <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
        {archivo && <div className="file-info">Archivo: {archivo.name}</div>}

        <label>Fecha de entrega</label>
        <input
          type="date"
          value={fecha_entrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
          required
        />

        <button type="submit" className="btn-crear" disabled={loading}>
          {loading ? "Creando..." : "Crear Tarea"}
        </button>
      </form>
    </div>
  );
}
