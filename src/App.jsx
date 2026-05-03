import { useState } from 'react'
import PageWelcome from './components/PageWelcome'
import PagePhoto from './components/PagePhoto'
import PageWishes from './components/PageWishes'
import PageLove from './components/PageLove'
import ScrollProgress from './components/ScrollProgress'
import Grain from './components/Grain'
import TapBurst from './components/TapBurst'
import IdleMascot from './components/IdleMascot'

const PAGES = [PageWelcome, PagePhoto, PageWishes, PageLove]

export default function App() {
  const [page, setPage] = useState(0)
  const [key, setKey] = useState(0)
  const [direction, setDirection] = useState('forward')

  const navigate = (next) => {
    setDirection(next > page ? 'forward' : 'back')
    setPage(next)
    setKey((k) => k + 1)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const goNext = () => navigate(Math.min(page + 1, PAGES.length - 1))
  const goBack = () => navigate(Math.max(page - 1, 0))
  const goStart = () => navigate(0)

  const PageComponent = PAGES[page]
  const animClass = direction === 'forward' ? 'animate-page-slide' : 'animate-page-slide-back'

  return (
    <>
      <ScrollProgress />
      <Grain />
      <TapBurst />
      <IdleMascot />
      <div className={animClass} key={key} style={{ minHeight: '100vh' }}>
        <PageComponent onNext={goNext} onBack={goBack} onRestart={goStart} />
      </div>
    </>
  )
}
