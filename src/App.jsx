import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ControllRegister from "./Page/ControllRegister"
import ControllLogin from "./Page/ControllLogin"
import Start from "./Page/Index"
import Teacher from "./Components/ProfileTeacher"
import Student from "./Components/ProfileStudent"

function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/" element={<ControllLogin />} />
        <Route path="/Register" element={<ControllRegister />} />
        <Route path="/Start" element={<Start />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
