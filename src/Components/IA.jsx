import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/IA.css";

export default function IA() {
  const [mensaje, setMensaje] = useState("");
  const [historial, setHistorial] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historial]);

  const enviarMensaje = async () => {
    if (!mensaje.trim() && !archivo) return;

    // Agregar mensaje del usuario al chat
    setHistorial(prev => [
      ...prev,
      { rol: "user", texto: mensaje, archivo: archivo?.name || null }
    ]);

    // Enviar al backend
    try {
      const formData = new FormData();
      formData.append("mensaje", mensaje);

      if (archivo) formData.append("archivo", archivo);

      const res = await fetch("http://localhost:8000/chat", {

        method: "POST",
        body: formData
      });

      const data = await res.json();

      // Agregar respuesta del bot
      setHistorial(prev => [
        ...prev,
        { rol: "agent", texto: data.respuesta }
      ]);

    } catch (error) {
      setHistorial(prev => [
        ...prev,
        { rol: "agent", texto: "Error conectando con el servidor :(" }
      ]);
    }

    // Reset campos
    setMensaje("");
    setArchivo(null);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") enviarMensaje();
  };

  return (
    <div className="IA-container">

      <aside className="IA-sidebar">
        <h2>BoardAI</h2>
        <button className="new-chat">➕ New Chat</button>
        <ul>
          <li>📁 Mis archivos</li>
          <li>⚙ Configuración</li>
          <li onClick={() => navigate("/Start")}>↩︎ Inicio</li>
        </ul>
      </aside>

      <div className="IA-chat">

        <div className="IA-messages">
          {historial.map((m, i) => (
            <div key={i} className={`msg ${m.rol === "user" ? "user" : "agent"}`}>
              <p>{m.texto}</p>
              {m.archivo && <span className="archivo-preview">📎 {m.archivo}</span>}
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        <div className="IA-input">
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
