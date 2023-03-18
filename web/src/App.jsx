import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Home from './Pages/Home/Home'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
    <div className="container">
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
