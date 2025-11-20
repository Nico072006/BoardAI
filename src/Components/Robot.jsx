import React, {useState} from "react";
import "../style/Robot.css"

function Robot ({image}){
    const [open ,setOpen]=useState(false);


    return(
        <>
        <div className="btnRobot" onClick={()=> setOpen(!open)}>
            <img src={image} alt="Robot" className="ImgRobot" />
        </div>

        {open && (

            <div className="ChatRobot">
                <div className="HeaderRobot">
                    <span> Board AI</span>
                    <button className="btnRobotClose" onClick={()=> setOpen(false)}>X</button>
                </div>

                <div className="ChatMesage">
                    <p className="Mesage">
                        !Hello! I'm Board Ai, your assistant. How can I help you?
                    </p>
                </div>
                <input type="text" className="Chatinput" placeholder="Escribe un mensaje..." />
            </div>
        )}
                
        </>


    )

}


export default Robot