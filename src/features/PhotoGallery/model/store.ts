import { create } from 'zustand'
import { getRandomPhotos, searchPhotos, getPhotoById } from 'shared/api'
import { type Photo } from 'shared/types'

type State = {
  photos: Photo[]
  searchPhotos: Photo[]
  searchQuery: string
  favoritePhotos: Photo[]
  favorites: string[]
  currentPhoto: Photo | null
  isLoading: boolean
  fetchPhotos: (count?: number) => Promise<void>
  fetchSearchPhotos: (query: string) => Promise<void>
  fetchPhotoById: (id: string) => Promise<void>
  fetchFavoritePhotos: () => Promise<void>
  setSearchQuery: (query: string) => void
  toggleFavorite: (id: string) => void
}

export const usePhotoStore = create<State>((set, get) => ({
  photos: [],
  searchPhotos: [],
  searchQuery: '',
  favoritePhotos: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  currentPhoto: null,
  isLoading: false,

  fetchPhotos: async (count = 9) => {
    set({ isLoading: true })
    try {
      const res = await getRandomPhotos(count)
      set({ photos: res.data, isLoading: false })
    } catch (error) {
      console.error('Ошибка загрузки рандомных фото:', error)
      set({ isLoading: false })
    }
  },

  fetchSearchPhotos: async (query: string) => {
    set({ isLoading: true })
    try {
      const res = await searchPhotos(query)
      set({ searchPhotos: res.data.results, isLoading: false })
    } catch (error) {
      console.error('Ошибка поиска фото:', error)
      set({ isLoading: false })
    }
  },

  fetchPhotoById: async (id: string) => {
    set({ isLoading: true })
    try {
      const res = await getPhotoById(id)
      set({ currentPhoto: res.data, isLoading: false })
    } catch (error) {
      console.error('Ошибка загрузки фото по ID:', error)
      set({ isLoading: false })
    }
  },

  fetchFavoritePhotos: async () => {
    const { favorites } = get()
    if (favorites.length === 0) {
      set({ favoritePhotos: [] })
      return
    }
    set({ isLoading: true })
    try {
      const promises = favorites.map((id) => getPhotoById(id))
      const results = await Promise.all(promises)
      set({ favoritePhotos: results.map((res) => res.data), isLoading: false })
    } catch (error) {
      console.error('Ошибка загрузки избранных фото:', error)
      set({ isLoading: false })
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },

  toggleFavorite: (id: string) => {
    const { favorites } = get()
    const isFav = favorites.includes(id)
    const updatedFavorites = isFav
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id]

    set({ favorites: updatedFavorites })
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }
}))
