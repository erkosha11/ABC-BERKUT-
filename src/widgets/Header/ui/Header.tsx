import { Heart, Logo, Search } from 'assets/icons'
import { NavLink } from 'react-router-dom'
import s from './Header.module.scss'

export const Header = () => {
  return (
    <header>
      <div className='container'>
        <NavLink to='/'>
          <Logo />
        </NavLink>
        <nav>
          <ul className={s.nav}>
            <li>
              <NavLink to='/' className={s.link}>
                <Search />
                <span className={s.navText}>Поиск</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/favorites' className={s.link}>
                <Heart className={s.heart} />
                <span className={s.navText}>Избранное</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
