import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ControllRegister from "./Page/ControllRegister"
import ControllLogin from "./Page/ControllLogin"
import Start from "./Page/Index"
import IA from "./Components/IA"
import ProfesorStart from "./Page/ProfesorStart";
import TarjetasMateriasProfe from "./Components/TarjetasMateriasProfe";
import ListaEstudiantes from './Components/MisEstudiantesProfe'
/*import "./style/index.css";*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ControllLogin />} />
        <Route path="/Register" element={<ControllRegister />} />
        <Route path="/Start" element={<Start />} />
        <Route path="/ProfesorStart" element={<ProfesorStart />} />
        <Route path="/profe/materias" element={<TarjetasMateriasProfe />} />
        <Route path="/profe/estudiantes" element={<ListaEstudiantes />} />

        <Route path="/IA" element={<IA />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
