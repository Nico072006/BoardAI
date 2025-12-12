import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ControllRegister from "./Page/ControllRegister"
import ControllLogin from "./Page/ControllLogin"
import Start from "./Page/Index"
import IA from "./Components/IA"
import ProfesorStart from "./Page/ProfesorStart"
import TarjetasMateriasProfe from "./Components/TarjetasMateriasProfe"
import ListaEstudiantes from './Components/MisEstudiantesProfe'
import MisClases from "./Components/MisClases"
import CrearTarea from './Components/CrearTarea'
import EntregaTarea from './Components/EntregaTarea'
import CalificarTarea from './Components/CalificarTarea'
import TareasProfesor from "./Components/TareasProfesor";


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
        <Route path="/MisClases" element={<MisClases />} />
        <Route path="/profe/tareas/crear" element={<CrearTarea />} />
        <Route path="/EntregaTarea/:id_tarea" element={<EntregaTarea />} />
        <Route path="/profe/tarea/:id_tarea" element={<CalificarTarea />} />
        <Route path="/profe/tareas" element={<TareasProfesor />} />
        <Route path="/profe/tarea/:id_tarea/calificar" element={<CalificarTarea />} />
        <Route path="/IA" element={<IA />} />
      </Routes>
  </BrowserRouter>
)
}

export default App
