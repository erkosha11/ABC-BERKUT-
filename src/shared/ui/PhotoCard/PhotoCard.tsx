import { Heart, Search } from 'assets/icons'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import s from './PhotoCard.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

type Props = {
  id?: string
  url?: string
  alt?: string
  isFavorite?: boolean
  onToggleFavorite?: () => void
  isLoading?: boolean
}

export const PhotoCard = ({
  id,
  url,
  alt = '',
  isFavorite,
  onToggleFavorite,
  isLoading = false
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className={s.card}>
      {isLoading || !url || !imageLoaded ? (
        <Skeleton className={s.skeleton} />
      ) : (
        <>
          <img
            src={url}
            alt={alt}
            className={s.image}
            onLoad={() => setImageLoaded(true)}
          />
          <div className={s.buttons}>
            <button className={s.favoriteBtn} onClick={onToggleFavorite}>
              <Heart className={`${s.heart} ${isFavorite ? s.active : ''}`} />
            </button>
            <Link to={`/photo/${id}`} className={s.viewBtn}>
              <Search />
            </Link>
          </div>
        </>
      )}
      {url && !isLoading && (
        <img
          src={url}
          alt={alt}
          className={s.hiddenImage}
          onLoad={() => setImageLoaded(true)}
          style={{ display: 'none' }}
        />
      )}
    </div>
  )
}
