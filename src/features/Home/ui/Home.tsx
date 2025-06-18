import { Search } from 'assets/icons'
import s from './Home.module.scss'
import { usePhotoStore } from 'features/Photos'

export const Home = () => {
  const { searchQuery, setSearchQuery, fetchSearchPhotos } = usePhotoStore()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchSearchPhotos(searchQuery)
    }
  }

  return (
    <div className={s.home}>
      <div className={s.searchBlock}>
        <input
          type='text'
          placeholder='Поиск'
          className={s.input}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className={s.button} onClick={handleSearch}>
          <Search />
        </button>
      </div>
    </div>
  )
}
