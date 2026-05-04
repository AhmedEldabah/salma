import { useState, Component } from 'react'
import PageWelcome from './components/PageWelcome'
import PagePhoto from './components/PagePhoto'
import PageWishes from './components/PageWishes'
import PageLove from './components/PageLove'
import ScrollProgress from './components/ScrollProgress'
import Grain from './components/Grain'
import TapBurst from './components/TapBurst'
import IdleMascot from './components/IdleMascot'

const PAGES = [PageWelcome, PagePhoto, PageWishes, PageLove]

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #4A0080 0%, #9C0064 40%, #E91E8C 75%, #FF6DB4 100%)',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '4rem' }}>🎂</span>
          <h1 style={{ fontFamily: 'Pacifico, cursive', color: '#fff', fontSize: '2rem', marginTop: '1rem' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.75rem', fontFamily: 'Nunito, sans-serif' }}>
            Please refresh the page to try again 💖
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #FF4081, #FF69B4)',
              border: 'none',
              borderRadius: '9999px',
              color: '#fff',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Refresh 🔄
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

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
    <ErrorBoundary>
      <ScrollProgress />
      <Grain />
      <TapBurst />
      <IdleMascot />
      <div className={animClass} key={key} style={{ minHeight: '100vh' }}>
        <PageComponent onNext={goNext} onBack={goBack} onRestart={goStart} />
      </div>
    </ErrorBoundary>
  )
}
