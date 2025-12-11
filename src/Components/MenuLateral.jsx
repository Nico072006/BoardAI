import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import "../style/menuLateral.css";

function MenuLateral(){
    const [abierto,setAbierto]=useState(false);
    const navigate = useNavigate();


    return(
        <div className="MenuContenedor">
           { /*Boton tipo hamburguesa*/ }
        <button
        className={`hamburguesa ${abierto ? "activo" :""}`}
        onClick={()=>setAbierto(!abierto)}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>

        {/*Menu Lateral*/}
        <nav className={`MenuLateral ${abierto ? "mostrar" : ""}`}>
            <h2 className="MenuTitulo">Menu</h2>
            <ul className="Opciones">
                <li className="item-opcion">📢 Notificaciones</li>
                <li className="item-opcion">📚 Trabajos</li>
                <li className="item-opcion">👨🏽‍🎓 Clases</li>
                <li
                className="item-opcion "
                onClick={() => navigate("/IA")}>
                🤖 BoardAI
                </li>

                <li
                className="item-opcion cerrar-sesion"
                onClick={() => navigate("/")}>
                ⛔ Cerrar sesión
                </li>

            </ul>
        </nav>
       {/* Capa oscura cuando el menú está abierto */}
      {abierto && <div className="fondo-oscuro" onClick={() => setAbierto(false)}></div>}

        </div>

    )
}
export default MenuLateral;
