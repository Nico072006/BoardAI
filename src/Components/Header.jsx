import "../style/Header.css";

function Header({ perfilLink }) {

    return (
        <header className="Contheader">
            <h1 className="Titulo">BoardAI</h1>

            <div className="PerfilCont">
                <button 
                    className="BtnPerfil"
                    onClick={() => window.location.href = perfilLink}
                >
                    <img 
                        src="https://i.pinimg.com/736x/c5/21/64/c521649a9f031192248c9a779e8713a8.jpg" 
                        alt="Perfil"
                        className="icono-perfil"
                    />
                </button>
            </div>
        </header>
    );
}

export default Header;
