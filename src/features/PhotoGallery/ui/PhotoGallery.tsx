import { useEffect } from 'react'
import { usePhotoStore } from '../model/store'
import { PhotoCard } from 'shared/ui'
import s from './PhotoGallery.module.scss'

export const PhotoGallery = () => {
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
    <div className={s.PhotoGallery}>
      <div className={s.photos}>
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <PhotoCard key={i} isLoading />
            ))
          : displayPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavorite={favorites.includes(photo.id)}
                onToggleFavorite={() => toggleFavorite(photo.id)}
              />
            ))}
      </div>
    </div>
  )
}
