import { useNavigate } from "react-router-dom";
import "../style/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Register"); 
  };

  return (
    <div className="LoginCon">
      <div className="LoginImg">
        <img
          src="https://i.pinimg.com/736x/cd/2c/de/cd2cde0acd7fe399e5f3b0f66e431125.jpg"
          alt="Login Illustration"
        />
      </div>

      <div className="LoginForm">
        <form className="LoginF" onSubmit={handleSubmit}>
          <h1>BoardAI</h1>

          <div className="Form">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ejemplo@gmail.com"
            />
          </div>

          <div className="Form">
            <label>Password</label>
            <input type="password" name="password" id="password" />
          </div>

          <div className="Form">
            <button type="submit" id="submit">
              Next
            </button>
          </div>

          
          <p className="CreateLogin">
            ¿Don't have an account??{" "}
            <span onClick={() => navigate("/Register")}>Create one</span>
          </p>
        </form>
      </div>
    </div>
  );
}
