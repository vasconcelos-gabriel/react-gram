import './Auth.css'

import { Link } from 'react-router-dom'

//hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Message from '../../components/Message'

// redux
import { login, reset } from '../../slices/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const { loading, error } = useSelector(state => state.auth)

  const handleSubmit = e => {
    e.preventDefault()

    const user = {
      email,
      password
    }
    dispatch(login(user))
  }

  //Limpar todos os estados de auth
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça o login para ver o que há de novo</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Ainda não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  )
}

export default Login
