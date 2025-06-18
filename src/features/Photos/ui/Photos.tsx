import { useEffect } from 'react'
import { usePhotoStore } from '../model/store'
import { PhotoCard } from 'shared/ui'
import s from './Photos.module.scss'

export const Photos = () => {
  const {
    photos,
    searchPhotos,
    searchQuery,
    favorites,
    fetchPhotos,
    toggleFavorite,
    isLoading
  } = usePhotoStore()

  useEffect(() => {
    if (!searchQuery) {
      fetchPhotos(9)
    }
  }, [fetchPhotos, searchQuery])

  const displayPhotos = searchQuery ? searchPhotos : photos

  return (
    <div className='container'>
      <div className={s.photos}>
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <PhotoCard key={i} isLoading />
            ))
          : displayPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                id={photo.id}
                url={photo.urls.regular}
                alt={photo.alt_description}
                isFavorite={favorites.includes(photo.id)}
                onToggleFavorite={() => toggleFavorite(photo.id)}
              />
            ))}
      </div>
    </div>
  )
}
