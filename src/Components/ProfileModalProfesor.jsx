import { useEffect, useState } from "react";
import "../style/PerfilModal.css";

function ProfileModalProfesor({ close }) {
  const [usuario, setUsuario] = useState(null);
  const [edit, setEdit] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/userinfo", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.usuario) setUsuario(data.usuario);
      })
      .catch(() => {});
  }, []);

  const actualizarPerfil = async () => {
    const response = await fetch("http://localhost:5000/update-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(usuario),
    });
    const data = await response.json();
    if (data.success) {
      alert("Perfil actualizado");
      setEdit(false);
    }
  };

  const subirImagen = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("foto", file);

    const res = await fetch("http://localhost:5000/upload-profile-pic", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setUsuario({ ...usuario, foto_perfil: data.foto });
    }
  };

  if (!usuario) return null;

  return (
    <div className="PM-overlay" onClick={close}>
      <div className="PM-box" onClick={(e) => e.stopPropagation()}>
        <div className="PM-top-row">
          <h2>Mi Perfil - Profesor</h2>
        </div>

        <div className="PM-photo-area">
          <img
            src={
              preview ||
              (usuario.foto_perfil
                ? `http://localhost:5000${usuario.foto_perfil}`
                : "/default.jpg")
            }
            alt="foto"
            className="PM-photo"
          />

          <label className="PM-upload">
            Cambiar foto
            <input type="file" hidden onChange={subirImagen} />
          </label>
        </div>

        <div className="PM-info">
          <label>Nombre</label>
          <input
            disabled={!edit}
            value={usuario.nombre}
            onChange={(e) =>
              setUsuario({ ...usuario, nombre: e.target.value })
            }
          />

          <label>Email</label>
          <input
            disabled={!edit}
            value={usuario.email}
            onChange={(e) =>
              setUsuario({ ...usuario, email: e.target.value })
            }
          />

          {edit && (
            <>
              <label>Nueva contraseña</label>
              <input
                type="password"
                placeholder="Opcional"
                onChange={(e) =>
                  setUsuario({ ...usuario, contrasena: e.target.value })
                }
              />
            </>
          )}

          <label>Rol</label>
          <input value={usuario.rol} disabled />
        </div>

        {!edit ? (
          <button className="PM-edit" onClick={() => setEdit(true)}>
            Editar Perfil
          </button>
        ) : (
          <button className="PM-save" onClick={actualizarPerfil}>
            Guardar Cambios
          </button>
        )}

        <p
          className="cerrar-modal"
          style={{ cursor: "pointer", color: "red" }}
          onClick={close}
        >
          Cerrar
        </p>
      </div>
    </div>
  );
}

export default ProfileModalProfesor;
