import "../style/login.css"
export default function Login (){

    return(

        <form action="" method="POST">

            <div className="Form_Group">
                <h1>BoardAI</h1>
            </div>

            <div className="Form_Group">
               <label >Full Name</label>
               <input type="text" name="NameUsu" id="NameUsu" placeholder="Example... Mark " />

            </div>

            <div className="Form_Group">
                <label >Email</label>
                <input type="email" name="EmailUsu" id="EmailUsu" placeholder="Example... Mark@gmail.com " required />
            </div>

            <div className="Form_Group">
                <label >Rol</label>
                <select name="RolUsu" id="RolUsu" >
                    <option value="one">User</option>
                    <option value="two">Administrato</option>
                </select>
            </div>

            <div className="Form_Group">
                <label >Password</label>
                <input type="password" name="PasswUsu" id="PasswUsu" required />
            </div>
            
            <div className="Form_Group">
                <button  type="submit" name="SendUsu" id="SendUsu">Send</button>
            </div>

        </form>
    )
}