import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/IA.css";

export default function IA() {
  const [mensaje, setMensaje] = useState("");
  const [historial, setHistorial] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();


  // Scroll automático
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historial]);

  const enviarMensaje = () => {
    if (!mensaje.trim() && !archivo) return;

    // Mensaje del usuario
    setHistorial(prev => [
      ...prev,
      { rol: "user", texto: mensaje, archivo: archivo?.name || null }
    ]);

    // Limpiar
    setMensaje("");
    setArchivo(null);

    // Simular respuesta del bot (solo front)
    setTimeout(() => {
      setHistorial(prev => [
        ...prev,
        { rol: "agent", texto: "Esta es una respuesta simulada del bot." }
      ]);
    }, 800);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") enviarMensaje();
  };

  return (
    <div className="IA-container">
      
      {/* SIDEBAR */}
      <aside className="IA-sidebar">
        <h2>BoardAI</h2>
        <button className="new-chat">➕ New Chat</button>
        <ul>
          <li>📁 Mis archivos</li>
          <li>⚙ Configuración</li>
          <li
            onClick={() => navigate("/Start")}>
              ↩︎ Inicio
          </li>
          
        </ul>
      </aside>

      {/* CHAT AREA */}
      <div className="IA-chat">

        <div className="IA-messages">
          {historial.map((m, i) => (
            <div key={i} className={`msg ${m.rol === "user" ? "user" : "agent"}`}>
              <p>{m.texto}</p>

              {/* Si se envió archivo */}
              {m.archivo && (
                <span className="archivo-preview">📎 {m.archivo}</span>
              )}
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="IA-input">

          {/* Botón para subir archivo */}
          <label className="file-btn">
            📎
            <input 
              type="file"
              onChange={(e) => setArchivo(e.target.files[0])}
              hidden
            />
          </label>

          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={handleKey}
          />

          <button className="send-btn" onClick={enviarMensaje}>➤</button>
        </div>

      </div>
    </div>
  );
}
