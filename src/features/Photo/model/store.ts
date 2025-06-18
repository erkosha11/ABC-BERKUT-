import { getPhotoById } from 'shared/api'
import { create } from 'zustand'

type Photo = {
  id: string
  alt_description: string
  urls: { full: string }
  user: { name: string; links: { html: string } }
}

type State = {
  photo: Photo | null
  isLoading: boolean
  fetchPhoto: (id: string) => Promise<void>
}

export const usePhotoPageStore = create<State>((set) => ({
  photo: null,
  isLoading: false,

  fetchPhoto: async (id) => {
    set({ isLoading: true })
    try {
      const res = await getPhotoById(id)
      set({ photo: res.data, isLoading: false })
    } catch (e) {
      console.error('Ошибка при загрузке фото:', e)
      set({ isLoading: false })
    }
  }
}))
