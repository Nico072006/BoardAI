import { useState } from "react";

export default function EditarPerfil({ profesor, onActualizar }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [nombre, setNombre] = useState(profesor.nombre);
  const [email, setEmail] = useState(profesor.email);
  const [foto, setFoto] = useState(null);
  const [contrasena, setContrasena] = useState(""); // Nuevo estado para la contraseña

  const handleGuardar = async () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("email", email);
    if (foto) formData.append("foto", foto);
    if (contrasena) formData.append("contrasena", contrasena); // Solo se envía si hay cambio

    try {
      const res = await fetch("http://localhost:5000/update-profile", {
        method: "PUT",
        body: formData,
        credentials: "include", // para enviar la sesión
      });

      const data = await res.json();

      if (data.success) {
        onActualizar(data.usuario); // Actualiza la info en el front
        setModalOpen(false);
      } else {
        alert(data.message || "Error al actualizar perfil");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn-profe amarillo">
        Editar perfil
      </button>

      {modalOpen && (
        <div className="modal-fondo">
          <div className="modal">
            <h2>Editar Perfil</h2>

            <label>
              Nombre:
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>

            <label>
              Correo:
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
              Foto:
              <input type="file" onChange={(e) => setFoto(e.target.files[0])} />
            </label>

            <label>
              Nueva Contraseña:
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Dejar en blanco para no cambiar"
              />
            </label>

            <div className="modal-botones">
              <button onClick={handleGuardar} className="btn verde">
                Guardar
              </button>
              <button onClick={() => setModalOpen(false)} className="btn rojo">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
