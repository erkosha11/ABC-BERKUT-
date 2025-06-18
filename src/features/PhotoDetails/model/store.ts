import { getPhotoById } from 'shared/api'
import { create } from 'zustand'
import { type Photo } from 'shared/types'

type State = {
  photo: Photo | null
  isLoading: boolean
  fetchPhoto: (id: string) => Promise<void>
}

export const usePhotoDetailsStore = create<State>((set) => ({
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
