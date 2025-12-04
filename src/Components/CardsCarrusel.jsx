import React from "react";
import "../style/cards.css"; 

function CardsCarrusel() {
  const tarjetas = [
    {
      id: 1,
      titulo: "Clase de Matemáticas",
      subtitulo: "Álgebra básica",
      img: "https://i.pinimg.com/736x/47/c4/db/47c4db57e9a285a1a4f6d146f677de49.jpg"
    },
    {
      id: 2,
      titulo: "Historia Universal",
      subtitulo: "Edad Moderna",
      img: "https://i.pinimg.com/1200x/18/49/45/184945d69714c0f5c7531e1443f826fb.jpg"
    },
    {
      id: 3,
      titulo: "Programación",
      subtitulo: "JavaScript Avanzado",
      img: "https://i.pinimg.com/736x/7d/c0/09/7dc009ab8c4f27f597ca10f47e4408bf.jpg"
    },
    {
      id: 4,
      titulo: "Bases de Datos",
      subtitulo: "MySQL & Node",
      img: "https://i.pinimg.com/736x/a9/1f/45/a91f455a96acb53cdd453a845db95d63.jpg"
    },
    {
        id: 5,
        titulo: "Bases de Datos",
        subtitulo: "MySQL & Node",
        img: "https://i.pinimg.com/736x/a9/1f/45/a91f455a96acb53cdd453a845db95d63.jpg"
      }
  ];

  return (
    <div className="carrusel-contenedor">
      <div className="carrusel">
        {tarjetas.map((t) => (
          <div key={t.id} className="tarjeta">
            <img src={t.img} alt={t.titulo} className="tarjeta-img" />
            <div className="tarjeta-info">
              <h3>{t.titulo}</h3>
              <p>{t.subtitulo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsCarrusel;
