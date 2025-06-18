import { Heart, Search } from 'assets/icons'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import s from './PhotoCard.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { type Photo } from 'shared/types'

type Props = {
  photo?: Photo
  isFavorite?: boolean
  onToggleFavorite?: () => void
  isLoading?: boolean
}

export const PhotoCard = ({
  photo,
  isFavorite,
  onToggleFavorite,
  isLoading = false
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className={s.card}>
      {isLoading || !photo ? (
        <Skeleton className={s.skeleton} />
      ) : (
        <>
          <img
            src={photo.urls.regular}
            alt={photo.alt_description}
            className={s.image}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
          {imageLoaded && (
            <div className={s.buttons}>
              <button className={s.favoriteBtn} onClick={onToggleFavorite}>
                <Heart className={`${s.heart} ${isFavorite ? s.active : ''}`} />
              </button>
              <Link to={`/photo/${photo.id}`} className={s.viewBtn}>
                <Search />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}
