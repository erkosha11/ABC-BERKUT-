import s from 'features/PhotoGallery/ui/PhotoGallery.module.scss'
import { usePhotoStore } from 'features/PhotoGallery'
import { PhotoCard } from 'shared/ui'
import { useEffect } from 'react'

export const Favorites = () => {
  const {
    favoritePhotos,
    fetchFavoritePhotos,
    favorites,
    toggleFavorite,
    isLoading
  } = usePhotoStore()

  useEffect(() => {
    fetchFavoritePhotos()
  }, [fetchFavoritePhotos, favorites])

  return (
    <div className={s.PhotoGallery}>
      <div className={s.photos}>
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <PhotoCard key={i} isLoading />
            ))
          : favoritePhotos.map((photo) => (
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
