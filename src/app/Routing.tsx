import { FavoritesPage } from 'pages/FavoritesPage'
import { HomePage } from 'pages/HomePage'
import { PhotoPage } from 'pages/PhotoPage'
import { Route, Routes } from 'react-router-dom'

export const Routing = () => (
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/photo/:id' element={<PhotoPage />} />
    <Route path='/favorites' element={<FavoritesPage />} />
  </Routes>
)
