import Robot from "../Components/Robot.jsx";
import ImgRobot from "../Img/ImgRobot.jpg";
import { useState } from "react";

import "../style/index.css";

function Start() {

    return (
        <div className="inicioConta">

            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="sidebarTitulo">Helps</h2>
                <ul className="sidebarMenu">
                    <li>Notification</li>
                    <li>Private</li>
                    <li>Topics</li>
                </ul>

                
            </aside>

            {/* Contenedor principal */}
            <div className="content">

                {/* Header */}
                <header className="header">
                    <div className="logo">BoardAI</div>
                    <div className="PerfilIcon">👤</div>
                </header>


                {/* Robot Section */}
                <section className="robotS">
                    <Robot image={ImgRobot} />
                </section>

            </div>

        </div>
    );
}

export default Start;
