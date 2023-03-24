import './App.css'

//Hooks
import { useAuth } from './hooks/ueAuth'

// Router
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'


// Components
import Footer from './components/Footer'
import Navbar from './components/Navbar'


// Pages
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Home from './Pages/Home/Home'
import EditProfile from './Pages/EditProfile/EditProfile'
import Profile from './Pages/Profile/Profile'

function App() {

  const {auth, loading} = useAuth()

  if(loading) {
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
    <div className="container">
    <Routes>
        <Route path='/' element={auth ? <Home /> : <Navigate to="/login" /> } />
        <Route path='/profile' element={auth ? <EditProfile /> : <Navigate to="/login" /> } />
        <Route path='/users/:id' element={auth ? <Profile /> : <Navigate to="/login" /> } />
        <Route path='/login' element={!auth ? <Login /> : <Navigate to="/" /> } />
        <Route path='/register' element={!auth ? <Register /> : <Navigate to="/" /> } />
      </Routes>
    </div>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
