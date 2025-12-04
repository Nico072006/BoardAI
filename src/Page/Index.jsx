import Robot from "../Components/Robot.jsx";
import ImgRobot from "../Img/ImgRobot.jpg";
import MenuLateral from "../Components/MenuLateral.jsx";
import HeaderGamer from "../Components/Header.jsx";
import CardsCarrusel from "../Components/CardsCarrusel";
import "../style/index.css";

function Start() {
    return (
        <div className="contenedor-principal">
            <HeaderGamer />
            <MenuLateral />
            <div style={{ marginTop: "100px" }}>
                <CardsCarrusel />
            </div>            
            {/* Robot Section */}
            <section className="robotS">
                <Robot image={ImgRobot} />
            </section> 
        </div>
    );
}

export default Start;
