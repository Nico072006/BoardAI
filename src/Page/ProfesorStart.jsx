import { useState } from "react";
import HeaderProfesor from "../Components/HeaderProfesor";
import MenuLateralProfesor from "../Components/MenuLateralProfe";
import ProfileModalProfesor from "../Components/ProfileModalProfesor";
import CrearMateriaModal from "../Components/CrearMateriaModal";
import TarjetasMateriasProfe from "../Components/TarjetasMateriasProfe";
import MisEstudiantes from "../Components/MisEstudiantesProfe";

function ProfesorStart() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openCrearMateria, setOpenCrearMateria] = useState(false);

  return (
    <div className="contenedor-principal">
      <HeaderProfesor openProfile={() => setOpenProfile(true)} />
      <MenuLateralProfesor openCrearMateria={() => setOpenCrearMateria(true)} />

      {openProfile && (
        <ProfileModalProfesor close={() => setOpenProfile(false)} />
      )}

      {openCrearMateria && (
        <CrearMateriaModal close={() => setOpenCrearMateria(false)} />
      )}

      
      
     
    </div>
  );
}

export default ProfesorStart;
