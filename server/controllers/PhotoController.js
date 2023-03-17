const Photo = require('../models/Photo')
const User = require('../models/User')
const mongoose = require('mongoose')

//Inserir foto relacionada a um usuario

const insertPhoto = async (req, res) => {
  const { title } = req.body
  const image = req.file.filename

  const reqUser = req.user

  const user = await User.findById(reqUser._id)

  //Criar foto
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name
  })

  // Se a foto foi criada
  if (!newPhoto) {
    res.status(422).json({
      errors: ['Houve um problema, por favor tente novamente mais tarde']
    })
    return
  }

  res.status(201).json(newPhoto)
}

//Excluir foto
const deletePhoto = async (req, res) => {
  const { id } = req.params
  const reqPhoto = req._id

  const reqUser = req.user
  try {
    const photo = Photo.findById(reqPhoto)
    if (!photo) {
      res.status(404).json({ erros: ['Foto não encontrada!'] })
      return
    }

    //Checar se a foto é do usuario
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ erros: ['Oocrreu um erro por favor tente mais tarde!'] })
      return
    }

    await Photo.findByIdAndDelete(photo._id)
    res
      .status(200)
      .json({ id: photo._id, message: 'Foto excluida com sucesso' })
  } catch (error) {
    res.status(404).json({ erros: ['Foto não encontrada!'] })
  }
}

module.exports = {
  insertPhoto,
  deletePhoto
}
