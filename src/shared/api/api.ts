import axios from 'axios'

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
  }
})

export const getRandomPhotos = (count = 8) =>
  unsplash.get('/photos/random', { params: { count } })

export const searchPhotos = (query: string, page = 1) =>
  unsplash.get('/search/photos', { params: { query, per_page: 12, page } })

export const getPhotoById = (id: string) => unsplash.get(`/photos/${id}`)
