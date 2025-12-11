import { useState, useEffect } from "react";
import ProfileModal from "../Components/PerfilModal.jsx";
import "../style/header.css";

function Header() {
  const [openProfile, setOpenProfile] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/userinfo", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsuario(data.usuario);
        }
      });
  }, []);

  return (
    <>
      <header className="Contheader">
        <h1 className="Titulo">BoardAI</h1>

        <div className="PerfilCont">
          <button
            className="BtnPerfil"
            onClick={() => setOpenProfile(true)}
          >
            <img
              src={
                usuario?.foto_perfil
                  ? "http://localhost:5000" + usuario.foto_perfil
                  : "/default.jpg"
              }
              alt="Perfil"
              className="icono-perfil"
            />
          </button>
        </div>
      </header>

      {openProfile && <ProfileModal close={() => setOpenProfile(false)} />}
    </>
  );
}

export default Header;
