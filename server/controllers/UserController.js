const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const jwtSecret = process.env.JWT_SECRET

// Gerar token do usuario

const generateToken = id => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '7d'
  })
}

//Registrar e logar

const register = async (req, res) => {
  const { name, email, password } = req.body

  //checar se usuario existe
  const user = await User.findOne({ email })

  if (user) {
    res
      .status(422)
      .json({ erros: ['Email já utilizado, por favor utilize outro'] })
    return
  }

  //Gerar hash da senha
  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(password, salt)

  //Criar usuario
  const newUser = await User.create({
    name,
    email,
    password: passwordHash
  })

  //If usuario foi criado, retornar o token
  if (!newUser) {
    res
      .status(422)
      .json({ erros: ['Houve um erro, tente novamente mais tarde'] })
    return
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id)
  })
}

//Login
const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404).json({ erros: ['Usuário não existe, tente outro email'] })
    return
  }

  //Checkar se a senha bate
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ erros: ['Senha Inválida'] })
    return
  }

  //Retornar usuario com token
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id)
  })
}

//Get usuario logado
const getCurrentUser = async (req, res) => {
  const user = req.user

  res.status(200).json(user)
}

// Update de usuario
const update = async (req, res) => {
  const { name, password, bio } = req.body

  let profileImage = null
  if (req.file) {
    profileImage = req.file.filename
  }

  const reqUser = req.user
  const user = await User.findById(reqUser._id).select('-password')

  if (name) {
    user.name = name
  }

  if (password) {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    user.password = passwordHash
  }

  if (profileImage) {
    user.profileImage = profileImage
  }

  if (bio) {
    user.bio = bio
  }

  await user.save()

  res.status(200).json(user)
}

//Get user por id

const getUserById = async(req, res) => {
  const {id} = req.params

  try {
    const user = await User.findById(id).select('-password')
    
  if(!user) {
    res.status(404).json({errors: ["Usuário não encontrado"]})

    return
  }
  res.status(200).json(user)
  } catch (error) {
    res.status(404).json({errors: ["Usuário não encontrado"]})

    return
  }




 

}

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById
}
