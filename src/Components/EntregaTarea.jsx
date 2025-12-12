import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/EntregaTarea.css";

export default function EntregaTarea() {

  const { id_tarea } = useParams();
  const navigate = useNavigate();

  const [tarea, setTarea] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [texto, setTexto] = useState("");
  const [entrega, setEntrega] = useState(null);

  useEffect(() => {
    cargarTarea();
  }, []);

  const cargarTarea = async () => {
    const res = await fetch(`http://localhost:5000/tareas/${id_tarea}`, {
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setTarea(data.tarea);
      setEntrega(data.entrega || null);
    }
  };

  const enviarEntrega = async () => {
    if (!archivo && texto.trim() === "") {
      alert("Debes enviar un archivo o escribir un texto.");
      return;
    }

    const formData = new FormData();
    if (archivo) formData.append("archivo", archivo);
    formData.append("texto", texto);

    const res = await fetch(`http://localhost:5000/tareas/${id_tarea}/entregar`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Entrega enviada correctamente 🎉");
      setArchivo(null);
      setTexto("");
      cargarTarea();
    }
  };

  if (!tarea) return <p>Cargando...</p>;

  return (
    <div className="entrega-container">
      
      <div className="card-tarea">
        <h2>{tarea.titulo}</h2>
        <p>{tarea.descripcion}</p>
        <p className="fecha">📅 Fecha límite: {tarea.fecha_entrega}</p>
      </div>

      <div className="card-entrega">
        <h3>📤 Tu entrega</h3>

        {entrega ? (
          <div className="entrega-realizada">
            <p>✅ Ya entregaste esta tarea.</p>

            {entrega.texto_entrega && (
              <p><strong>Texto:</strong> {entrega.texto_entrega}</p>
            )}

            {entrega.archivo_entregado && (
              <a
                href={`http://localhost:5000/uploads/${entrega.archivo_entregado}`}
                target="_blank"
              >
                📎 Ver archivo enviado
              </a>
            )}

            <ul>
              <li onClick={() => navigate("/Start")}>
                ↩︎ Volver
              </li>
            </ul>

          </div>
        ) : (
          <>
            <textarea
              placeholder="Agrega un texto si lo deseas..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setArchivo(e.target.files[0])}
            />

            <button className="btn-enviar" onClick={enviarEntrega}>
              🚀 Enviar entrega
            </button>
          </>
        )}
      </div>

    </div>
  );
}
