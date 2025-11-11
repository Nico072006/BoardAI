import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "./Components/Register"
import Login from "./Components/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
