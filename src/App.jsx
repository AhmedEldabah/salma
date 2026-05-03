import { useState } from 'react'
import PageWelcome from './components/PageWelcome'
import PagePhoto from './components/PagePhoto'
import PageWishes from './components/PageWishes'
import PageLove from './components/PageLove'

const PAGES = [PageWelcome, PagePhoto, PageWishes, PageLove]

export default function App() {
  const [page, setPage] = useState(0)
  const [key, setKey] = useState(0)

  const navigate = (next) => {
    setPage(next)
    setKey((k) => k + 1)
  }

  const goNext = () => navigate(Math.min(page + 1, PAGES.length - 1))
  const goBack = () => navigate(Math.max(page - 1, 0))
  const goStart = () => navigate(0)

  const PageComponent = PAGES[page]

  return (
    <div className="animate-page-enter" key={key} style={{ minHeight: '100vh' }}>
      <PageComponent
        onNext={goNext}
        onBack={goBack}
        onRestart={goStart}
      />
    </div>
  )
}

