import TarjetasMateriasProfe from "../Components/TarjetasMateriasProfe";
import HeaderProfesor from "../Components/HeaderProfesor";
import MenuLateralProfesor from "../Components/MenuLateralProfe";

export default function ProfeMaterias() {
  return (
    <div className="contenedor-principal">
      <HeaderProfesor />
      <MenuLateralProfesor />

      <div style={{ padding: "20px" }}>
        <h1>Mis Materias</h1>
        <TarjetasMateriasProfe />
      </div>
    </div>
  );
}
