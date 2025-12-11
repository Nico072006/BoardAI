import TarjetasMateriasProfe from "../Components/TarjetasMateriasProfe";
import HeaderProfesor from "../Components/HeaderProfesor";
import MenuLateralProfesor from "../Components/MenuLateralProfe";
import { useState } from "react";

function MateriasProfesor() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openCrearMateria, setOpenCrearMateria] = useState(false);

  return (
    <div className="contenedor-principal">
      <HeaderProfesor openProfile={() => setOpenProfile(true)} />
      <MenuLateralProfesor openCrearMateria={() => setOpenCrearMateria(true)} />

      <h1 style={{ marginLeft: "260px" }}>📚 Mis Materias</h1>

      <TarjetasMateriasProfe />
    </div>
  );
}

export default MateriasProfesor;
