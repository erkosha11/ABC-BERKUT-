import { BrowserRouter } from 'react-router-dom'
import { Header } from 'widgets/Header'
import { Routing } from './Routing'

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routing />
    </BrowserRouter>
  )
}
