import './Photo.css'

import { uploads } from '../../utils/config'

// components
import Message from "../../components/Message";
 import PhotoItem from "../../components/PhotoItem";
//import LikeContainer from "../../components/LikeContainer";
import { Link } from "react-router-dom";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhoto, like, comment } from "../../slices/photoSlice";
import LikeContainer from '../../components/LikeContainer';


const Photo = () => {
  const {id} = useParams()
  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)
  
  const {user} = useSelector((state) => state.auth)
  const {photo, loading, error, message} = useSelector((state) => state.photo)

  //comentarios
  const [commentText, setComment] = useState("")

  // carregar dados da foto
  useEffect(() => {
    dispatch(getPhoto(id))
  }, [dispatch, id])


  //like e comentario
  const handleLike = () => {
      dispatch(like(photo._id))

      resetMessage()
  }

  const handleComment = (e) => {
    e.preventDefault()

    const commentData = {
      comment: commentText,
      id: photo._id
    }

    dispatch(comment(commentData))
    setComment("")

    resetMessage()
  }

  if(loading) {
    <p>Carregando...</p>
  }

  return (
    <div id='photo'>
      <PhotoItem photo={photo}/>
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
      {photo.comments && (
          <>
            <h3>Comentários ({photo.comments.length}):</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira seu comentário..."
                onChange={(e) => setComment(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Ainda não há comentários...</p>}
            {photo.comments.map((comment) => (
              <div className="comment" key={comment.comment}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Photo