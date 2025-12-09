import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/student.css";

export default function PerfilEstudiante() {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [editar, setEditar] = useState(false); // editar perfil
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    foto_perfil: ""
  });

  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [inscripciones, setInscripciones] = useState([]); // clases donde está inscrito

  // 🔹 Traer datos del estudiante al cargar
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile", { credentials: "include" });
        const data = await res.json();
        if (data.success) {
          setFormData({
            nombre: data.usuario.nombre,
            email: data.usuario.email,
            contrasena: "",
            foto_perfil: data.usuario.foto_perfil || ""
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPerfil();
  }, []);

  // 🔹 Traer clases disponibles
  useEffect(() => {
    if (!modalOpen) return;

    const fetchClases = async () => {
      try {
        const res = await fetch("http://localhost:5000/clases-disponibles", { credentials: "include" });
        const data = await res.json();
        if (data.success) {
          setClasesDisponibles(data.clases);
          setInscripciones(data.inscripciones); // si el backend devuelve las clases donde ya está inscrito
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchClases();
  }, [modalOpen]);

  const handleInscribirse = async (id_materia) => {
    try {
      const res = await fetch("http://localhost:5000/inscribirse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id_materia })
      });
      const data = await res.json();
      if (data.success) {
        alert("Inscripción exitosa");
        setInscripciones([...inscripciones, id_materia]); // actualizar estado local
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al inscribirse");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        alert("Perfil actualizado correctamente");
        setEditar(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al actualizar perfil");
    }
  };

  return (
    <div className="fondo ContPrinci">
      <div className="tarjetaInfo contenedor">
        {/* Header */}
        <div className="encabezado">
          <img
            src={formData.foto_perfil || "https://i.pinimg.com/736x/1c/56/14/1c56148731f7117f0ae2adbc0fe803b6.jpg"}
            alt="Foto del estudiante"
            className="foto"
          />
          <h1 className="titulo">Perfil del Estudiante</h1>
        </div>

        {/* Info */}
        {!editar ? (
          <div className="info">
            <div className="caja-info">
              <p><span className="label">Nombre:</span> {formData.nombre}</p>
              <p><span className="label">Correo:</span> {formData.email}</p>
              <p><span className="label">Contraseña:</span> ********</p>
            </div>

            <div className="fila-botones">
              <button onClick={() => setModalOpen(true)} className="btn azul">
                Ver clases disponibles
              </button>

              <button onClick={() => setEditar(true)} className="btn rojo">
                Editar perfil
              </button>

              <button onClick={() => navigate("/start")} className="btn azul">
                Ir al Inicio
              </button>
            </div>
          </div>
        ) : (
          <div className="info">
            <div className="caja-info">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo"
              />
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                placeholder="Nueva contraseña"
              />
              <input
                type="text"
                name="foto_perfil"
                value={formData.foto_perfil}
                onChange={handleChange}
                placeholder="URL de la foto"
              />
            </div>

            <div className="fila-botones">
              <button onClick={handleGuardar} className="btn verde">
                Guardar Cambios
              </button>
              <button onClick={() => setEditar(false)} className="btn rojo">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-fondo">
          <div className="modal">
            <h2 className="modal-titulo">Clases Disponibles</h2>
            <ul className="lista">
              {clasesDisponibles.map((clase) => (
                <li key={clase.id_materia} className="item-lista">
                  {clase.nombre} - {clase.descripcion}{" "}
                  {!inscripciones.includes(clase.id_materia) && (
                    <button
                      className="btn verde small"
                      onClick={() => handleInscribirse(clase.id_materia)}
                    >
                      Inscribirse
                    </button>
                  )}
                  {inscripciones.includes(clase.id_materia) && (
                    <span style={{ color: "green", fontWeight: "bold" }}> Inscrito</span>
                  )}
                </li>
              ))}
            </ul>
            <button onClick={() => setModalOpen(false)} className="btn rojo cerrar">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
