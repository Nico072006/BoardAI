import "../style/Register.css";

export default function Register() {
  return (
    <div className="RegistroCon">
      {/* Sección del formulario */}
      <div className="RegistroForm">
        <form className="RegistroF">
          <h1>BoardAI</h1>

          <div className="Form">
            <label>Full Name</label>
            <input
              type="text"
              name="Name"
              id="Name"
              placeholder="Nicolas Muñoz "
            />
          </div>

          <div className="Form">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" Ejemplo@gmail.com"
              required
            />
          </div>

          <div className="Form">
            <label>Rol</label>
            <select name="RolUsu" id="RolUsu">
              <option value="one">Student</option>
              <option value="two">Teacher</option>
            </select>
          </div>

          <div className="Form">
            <label>Password</label>
            <input type="password" name="password" id="password" required />
          </div>

          <div className="Form">
            <button href="" type="submit" name="submit" id="submit">
            Register
            </button>
          </div>
        </form>
      </div>

      {/* Sección de la imagen */}
      <div className="RegistroImg">
        <img
          src="https://i.pinimg.com/736x/cd/2c/de/cd2cde0acd7fe399e5f3b0f66e431125.jpg"
          alt="Login Illustration"
        />
      </div>
    </div>
  );
}
