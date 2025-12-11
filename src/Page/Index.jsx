import MenuLateral from "../Components/MenuLateral.jsx";
import HeaderGamer from "../Components/Header.jsx";
import CarruselMaterias from "../Components/CarruselMaterias.jsx";
import "../style/index.css";

function Start() {
    return (
        <div className="contenedor-principal">
            <HeaderGamer />
            <MenuLateral />
            <CarruselMaterias/>

                    
        </div>
    );
}

export default Start;
