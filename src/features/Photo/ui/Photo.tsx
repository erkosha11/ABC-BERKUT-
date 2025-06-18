import { usePhotoStore } from 'features/Photos'
import { useParams } from 'react-router-dom'
import { Download, Heart } from 'assets/icons'
import { useEffect } from 'react'
import s from './Photo.module.scss'

export const Photo = () => {
  const { id } = useParams<{ id: string }>()
  const { currentPhoto, fetchPhotoById, isLoading, toggleFavorite, favorites } =
    usePhotoStore()

  useEffect(() => {
    if (id) {
      fetchPhotoById(id)
    }
  }, [id, fetchPhotoById])

  if (isLoading) {
    return <div className={s.loading}>Загрузка...</div>
  }

  if (!currentPhoto) {
    return <div className={s.error}>Фотография не найдена</div>
  }

  const isFavorite = favorites.includes(currentPhoto.id)

  return (
    <div className={s.photo}>
      <div className='container'>
        <div className={s.title}>
          <div className={s.left}>
            <img
              src={currentPhoto.user.profile_image.small}
              alt={currentPhoto.user.name}
              className={s.avatar}
            />
            <div className={s.info}>
              <span className={s.name}>{currentPhoto.user.name}</span>
              <span className={s.username}>@{currentPhoto.user.username}</span>
            </div>
          </div>
          <div className={s.right}>
            <button
              className={s.favoriteBtn}
              onClick={() => toggleFavorite(currentPhoto.id)}
            >
              <Heart className={`${s.heart} ${isFavorite ? s.active : ''}`} />
            </button>
            <a
              href={currentPhoto.links.download}
              download
              className={s.downloadBtn}
            >
              <Download />
              Downloand
            </a>
          </div>
        </div>
        <img
          src={currentPhoto.urls.regular}
          alt={currentPhoto.alt_description}
          className={s.image}
        />
      </div>
    </div>
  )
}
