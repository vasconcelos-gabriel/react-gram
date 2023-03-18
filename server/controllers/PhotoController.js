const Photo = require('../models/Photo')
const User = require('../models/User')
const { default: mongoose } = require('mongoose')

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
  const reqPhoto = req.photo

  const reqUser = req.user
  try {
    const photo = await Photo.findById(id)
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

//Pegar todas as fotos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([['createdAt', -1]])
    .exec()
  return res.status(200).json(photos)
}

//Pegar fotoos do usuario

const getUserPhotos = async (req, res) => {
  const { id } = req.params
  const photos = await Photo.find({ userId: id })
    .sort([['createdAt', -1]])
    .exec()

  return res.status(200).json(photos)
}

// Pegar foto por id

const getPhotoById = async (req, res) => {
  const { id } = req.params
  const photo = await Photo.findById(id)
  if (!photo) {
    res.status(404).json({ erros: ['Foto não encontrada!'] })
    return
  }
  res.status(200).json(photo)
}

// Atualizar foto

const updatePhoto = async (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const reqUser = req.user
  const photo = await Photo.findById(id)

  //checar se a foto existe

  if (!photo) {
    res.status(404).json({ erros: ['Foto não encontrada!'] })
    return
  }
  //checar se a foto pertence ao usuário
  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ erros: ['Ocorreu um erro, tente novamente mais tarde!'] })
    return
  }

  if (title) {
    photo.title = title
  }
  if (image) {
    photo.image = image
  }

  await photo.save()

  res.status(200).json({ photo, message: 'Foto atualizada com sucesso' })
}

//Like em fotos
const likePhoto = async (req, res) => {
  const { id } = req.params

  const reqUser = req.user

  const photo = await Photo.findById(id)

  // checar se a foto existe
  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada!'] })
    return
  }

  // checar se o usuario ja curtiu a foto
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ['Você já curtiu esta foto.'] })
    return
  }

  // colocar usuario em um array de likes
  photo.likes.push(reqUser._id)

  await photo.save()

  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: 'A foto foi curtida!' })
}

//Comentario em fotos
const commentPhoto = async (req, res) => {
  const { id } = req.params
  const { comment } = req.body

  const reqUser = req.user

  const user = await User.findById(reqUser._id)

  const photo = await Photo.findById(id)

  // checar se a foto existe
  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada!'] })
    return
  }

  // colocar comentario em um array de comentarios
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id
  }

  photo.comments.push(userComment)

  await photo.save()

  res.status(200).json({
    comment: userComment,
    message: 'Comentário adicionado com sucesso!'
  })
}

//Procurar foto pelo titulo

const searchPhotos = async (req, res) => {
  const { q } = req.query

  const photos = await Photo.find({ title: new RegExp(q, 'i') }).exec()

  res.status(200).json(photos)
}

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos
}
