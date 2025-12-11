import { useEffect, useState } from "react";
import "../style/TarjetasMaterias.css";

export default function TarjetasMateriasProfe() {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/materias/profesor", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log("Materias:", data);
        if (data.success) {
          setMaterias(data.materias);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔥 Funcion para eliminar materia
  const eliminarMateria = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta materia?")) return;

    const res = await fetch(`http://localhost:5000/materias/eliminar/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    const data = await res.json();

    if (data.success) {
      // quitar de la lista sin recargar
      setMaterias((prev) => prev.filter(m => m.id_materia !== id));
    } else {
      alert("Error al eliminar materia");
    }
  };
  
  if (loading) return <p>Cargando...</p>;

  return (
    <div className="materias-grid">
      {materias.length === 0 ? (
        <p className="sin-materias">No tienes materias creadas.</p>
      ) : (
        materias.map((m) => (
          <div key={m.id_materia} className="materia-card">
            <h3>{m.nombre}</h3>
            <p>{m.descripcion}</p>
            <button className="btn-tarea">➕ Agregar Tarea</button>


            {/* 🔥 Botón Eliminar */}
            <button
                className="btn-eliminar"
                onClick={() => eliminarMateria(m.id_materia)}
              >
                🗑 Eliminar
              </button>
          </div>
        ))
      )}

<button className="btn-salir" onClick={() => {
  fetch("http://localhost:5000/logout", {
    credentials: "include"
  })
  .then(() => {
    window.location.href = "/ProfesorStart";  
  });
}}>
  🚪 Salir
</button>

    </div>

    
  );
}
