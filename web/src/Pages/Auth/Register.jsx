import './Auth.css'

import { Link } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword
    }
    console.log(user);
  }
  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirme Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já possui uma conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  )
}

export default Register
