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
import Photo from './Pages/Photo/Photo'
import Search from './Pages/Search/Search'

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
        <Route path='/search' element={auth ? <Search /> : <Navigate to="/login" /> } />
        <Route path='/photos/:id' element={auth ? <Photo /> : <Navigate to="/login" /> } />
        
      </Routes>
    </div>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
