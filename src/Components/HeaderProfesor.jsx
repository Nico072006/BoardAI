import { useState, useEffect } from "react";
import "../style/HeaderProfesor.css";

function HeaderProfesor({ openProfile }) {
  const [profesor, setProfesor] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/userinfo", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProfesor(data.usuario);
        }
      });
  }, []);

  return (
    <header className="ProfesorHeader">
      <h1 className="TituloProfesor">Panel del Profesor</h1>

      <div className="ProfesorPerfilCont">
        <button className="ProfesorBtnPerfil" onClick={openProfile}>
          <img
            src={
              profesor?.foto_perfil
                ? `http://localhost:5000${profesor.foto_perfil}`
                : "/default.jpg"
            }
            alt="Perfil"
            className="ProfesorFotoPerfil"
          />
        </button>
      </div>
    </header>

  );
}

export default HeaderProfesor;
