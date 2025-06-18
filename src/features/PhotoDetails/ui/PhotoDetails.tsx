import { usePhotoDetailsStore } from '../model/store'
import { useParams } from 'react-router-dom'
import { Download, Heart } from 'assets/icons'
import { useEffect } from 'react'
import s from './PhotoDetails.module.scss'
import { usePhotoStore } from 'features/PhotoGallery'

export const PhotoDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { photo, fetchPhoto, isLoading } = usePhotoDetailsStore()
  const { toggleFavorite, favorites } = usePhotoStore()

  useEffect(() => {
    if (id) {
      fetchPhoto(id)
    }
  }, [id, fetchPhoto])

  if (isLoading) {
    return <div className={s.loading}>Загрузка...</div>
  }

  if (!photo) {
    return <div className={s.error}>Фотография не найдена</div>
  }

  const isFavorite = favorites.includes(photo.id)

  return (
    <div className={s.photo}>
      <div className={s.containers}>
        <div className={s.title}>
          <div className={s.left}>
            <img
              src={photo.user.profile_image.small}
              alt={photo.user.name}
              className={s.avatar}
            />
            <div className={s.info}>
              <span className={s.name}>{photo.user.name}</span>
              <span className={s.username}>@{photo.user.username}</span>
            </div>
          </div>
          <div className={s.right}>
            <button
              className={s.favoriteBtn}
              onClick={() => toggleFavorite(photo.id)}
            >
              <Heart className={`${s.heart} ${isFavorite ? s.active : ''}`} />
            </button>
            <a href={photo.links.download} download className={s.downloadBtn}>
              <Download />
              <span className={s.buttonText}>Download</span>
            </a>
          </div>
        </div>
        <img
          src={photo.urls.regular}
          alt={photo.alt_description}
          className={s.image}
        />
      </div>
    </div>
  )
}
