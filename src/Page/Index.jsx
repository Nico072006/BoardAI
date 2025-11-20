import Robot from "../Components/Robot.jsx"
import ImgRobot from "../Img/ImgRobot.jpg"
import "../style/index.css"

function Start(){
    return(
        <div>
            <h1>Welcome</h1>
            <Robot image={ImgRobot} />
        </div>
        
    )
}

export default Start