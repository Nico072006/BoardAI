import React from "react";
import "../style/Login.css";

export default function Login({ handleSubmit, formRef, mensaje }) {
  return (
    <div className="LoginCon">
      <div className="LoginImg">
        <img
          src="https://i.pinimg.com/736x/cd/2c/de/cd2cde0acd7fe399e5f3b0f66e431125.jpg"
          alt="Login Illustration"
        />
      </div>

      <div className="LoginForm">
        <form className="LoginF" ref={formRef} onSubmit={handleSubmit}>
          <h1>BoardAI</h1>

          <div className="Form">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ejemplo@gmail.com"
              required
            />
          </div>

          <div className="Form">
            <label>Password</label>
            <input type="password" name="password" id="password" required />
          </div>

          <div className="Form">
            <button type="submit" id="submit">
              Login
            </button>
          </div>

          {mensaje && <p className="mensaje">{mensaje}</p>}

          <p className="CreateLogin">
            ¿Don't have an account?? <span onClick={() => window.location.href="/Register"}>Create one</span>
          </p>
        </form>
      </div>
    </div>
  );
}
