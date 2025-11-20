import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "./Components/Register"
import Login from "./Components/Login"
import Start from "./Page/Index"

function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Start" element={<Start />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
