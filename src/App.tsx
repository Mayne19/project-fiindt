import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigationType,
  useParams,
} from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { MayneFadeIn, cx } from '@mayne/ui-kit'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  AiChipIcon,
  AiLaptopIcon,
  AlarmClockIcon,
  Apple01Icon,
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  Atom01Icon,
  Backpack01Icon,
  BankIcon,
  BikeIcon,
  BinocularsIcon,
  BookOpen01Icon,
  BookOpenTextIcon,
  BrainIcon,
  BriefcaseBusinessIcon,
  Calculator01Icon,
  Calendar01Icon,
  CatIcon,
  Certificate01Icon,
  ChartLineData01Icon,
  Coffee01Icon,
  Coins01Icon,
  Compass01Icon,
  ComputerTerminal01Icon,
  CookingPotIcon,
  CreditCardIcon,
  Dna01Icon,
  Dumbbell01Icon,
  EnergyIcon,
  Film01Icon,
  FlaskConicalIcon,
  FlowerIcon,
  FolderLibraryIcon,
  FootballIcon,
  Gamepad2Icon,
  GlobeIcon,
  GraduationCapIcon,
  HangerIcon,
  HealthIcon,
  HeadphonesIcon,
  HeartPulseIcon,
  Home01Icon,
  Hospital01Icon,
  Idea01Icon,
  JusticeScale01Icon,
  LanguageCircleIcon,
  Leaf01Icon,
  LegalDocument01Icon,
  Medal01Icon,
  Megaphone01Icon,
  Menu01Icon,
  Message01Icon,
  Moon02Icon,
  News01Icon,
  PlaneIcon,
  RocketIcon,
  RunningShoesIcon,
  Satellite01Icon,
  Search01Icon,
  Settings01Icon,
  Shield01Icon,
  SmartPhone01Icon,
  StarIcon,
  Timer01Icon,
  Tree03Icon,
  UserGroupIcon,
  WorkoutStretchingIcon,
} from '@hugeicons/core-free-icons'
import {
  getArticlesByNiche,
  getArticlesByVertical,
  getSubNicheBySlug,
  getVerticalBySlug,
  type VerticalArticle,
  verticals,
} from './data/knowledgeArchitecture'
import { type FAQItem, verticalFaqs } from './data/verticalFaqs'
import { legalPages as fiindtLegalPages, type LegalPageRecord } from './data/fiindtLegalPages'
import { mockArticles as fiindtArticles } from './data/fiindtMockArticles'
import type { Article as FiindtArticle } from './types/content'
import AboutPage from './pages/AboutPage'
import './App.css'

const routes = {
  home: '/',
  about: '/about',
  faq: '/faq',
  stem: '/project/stem',
  code: '/project/code',
  health: '/health',
}

const primaryExplorePath = '/tech'
const scrollPositions = new Map<string, number>()

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const assets = {
  howHero:
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=2200&q=86',
  codeHero:
    'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=2200&q=86',
  stemHero:
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2200&q=86',
  aboutVideo:
    'https://framerusercontent.com/assets/FqE6J8ykSd2msbXsSwNoCRGBZ4.mp4',
  aboutOffice:
    'https://framerusercontent.com/images/8KmTeSaw0hV1A07L0O7dDeq6e8s.jpg?scale-down-to=1024&width=1920&height=1080',
  howCards: [
    'https://framerusercontent.com/images/xvl4i0BeCA4Kv7FVftmrHvxKeI.svg?width=272&height=158',
    'https://framerusercontent.com/images/rC6TZg4fLIphTKXZwQo2mRQQAjE.svg?width=272&height=158',
    'https://framerusercontent.com/images/Qd2qVPknASMh0sEMa7dQOTE8.svg?width=272&height=158',
  ],
  blogImages: [
    'https://framerusercontent.com/images/c7IR0Kn94HesJN3cwOzhg4E9Q.jpg?scale-down-to=1024&width=1960&height=1100',
    'https://framerusercontent.com/images/WFy0B2DIthLxSbNEot71Ahp8A.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/tg59DUNmUj84l4hmt8pSuK5PdI8.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/46kce4sgV2is5KzUfaVylNiG4.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/suypZWPfhjHMwSd1KlDpsUchM3g.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/uN3rLs5RB4DCx1cOMTeMZ3W20.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/cone0lOMhgMMLB74HdFNZqrC02I.jpg?width=1960&height=1100',
    'https://framerusercontent.com/images/3pgFSAmlNtt6yMGcwoJ2aRZRzI.jpg?width=1960&height=1100',
  ],
}


const processSteps = [
  { value: '12',   title: 'Active verticals',    copy: 'Expert domains actively publishing',  icon: Compass01Icon,    tone: 'blue'   },
  { value: '50+',  title: 'Sub-niches',          copy: 'Specialised knowledge areas',         icon: FolderLibraryIcon, tone: 'yellow' },
  { value: '600+', title: 'Guides & resources',  copy: 'Practical, structured knowledge',     icon: BookOpen01Icon,   tone: 'green'  },
]

const homeFaqs = [
  {
    question: 'What is Fiindt?',
    answer:
      'Fiindt is a structured knowledge platform that publishes original, research-based guides across focused topics like tech, health, finance, education, science, lifestyle and business.',
  },
  {
    question: 'How is Fiindt different from Wikipedia or WikiHow?',
    answer:
      'Wikipedia documents established knowledge, and WikiHow explains common methods. Fiindt focuses on unclear, missing or fragmented answers that are not well explained elsewhere online.',
  },
  {
    question: 'What topics does Fiindt cover?',
    answer:
      'Fiindt organizes content into focused verticals, including Tech, Health, Finance, Education, Business, Lifestyle, Science and Culture, with dedicated sub-niches, categories and practical guides.',
  },
  {
    question: 'Are Fiindt articles based on research?',
    answer:
      'Yes. Fiindt resources are built from research, sources, comparisons, data, analysis and editorial review to provide clear and useful answers.',
  },
  {
    question: 'How is Fiindt content organized?',
    answer:
      'Fiindt uses a clear structure: verticals, sub-niches, categories and articles. This helps readers find specific answers faster and explore related topics more easily.',
  },
  {
    question: 'Why should I use Fiindt instead of regular search results?',
    answer:
      'Fiindt saves time by turning scattered information into clear, structured and research-based resources focused on questions that the internet does not answer well.',
  },
]

const subNicheIcons: Record<string, typeof StarIcon> = {
  // Tech
  'ai': BrainIcon,
  'development': ComputerTerminal01Icon,
  'software': AiLaptopIcon,
  'automation': Settings01Icon,
  'cybersecurity': Shield01Icon,
  'consumer-tech': SmartPhone01Icon,
  // Lifestyle
  'home-and-living': Home01Icon,
  'food-and-cooking': CookingPotIcon,
  'style': HangerIcon,
  'relationships': Message01Icon,
  'personal-organization': AlarmClockIcon,
  'shopping-guides': Coins01Icon,
  // Finance
  'personal-finance': BankIcon,
  'budgeting': Calculator01Icon,
  'saving': Coins01Icon,
  'investing-basics': ChartLineData01Icon,
  'fintech-tools': AiChipIcon,
  'taxes-and-admin': LegalDocument01Icon,
  'business-finance': BriefcaseBusinessIcon,
  // Entertainment
  'movies-and-series': Film01Icon,
  'music': HeadphonesIcon,
  'gaming': Gamepad2Icon,
  'books': BookOpenTextIcon,
  'creator-culture': Megaphone01Icon,
  'streaming-guides': Satellite01Icon,
  // Nature
  'plants-and-gardening': Leaf01Icon,
  'flowers': FlowerIcon,
  'animals-and-pets': CatIcon,
  'wildlife': BinocularsIcon,
  'environment': Tree03Icon,
  'outdoor-living': Compass01Icon,
  // Education
  'study-systems': BookOpenTextIcon,
  'learning-tools': BookOpen01Icon,
  'exams': Certificate01Icon,
  'certifications': GraduationCapIcon,
  'language-learning': LanguageCircleIcon,
  'career-learning': Medal01Icon,
  // Health
  'wellness': HeartPulseIcon,
  'nutrition': Apple01Icon,
  'sleep': Moon02Icon,
  'fitness': Dumbbell01Icon,
  'mental-health-basics': BrainIcon,
  'preventive-health': Hospital01Icon,
  'recovery': WorkoutStretchingIcon,
  // Travel
  'travel-planning': PlaneIcon,
  'budget-travel': Coins01Icon,
  'destination-guides': GlobeIcon,
  'local-experiences': Compass01Icon,
  'digital-nomad': AiLaptopIcon,
  'travel-tools': Backpack01Icon,
  // Society
  'politics': GlobeIcon,
  'civic-life': UserGroupIcon,
  'social-trends': ChartLineData01Icon,
  'public-issues': JusticeScale01Icon,
  'rights-and-law-basics': LegalDocument01Icon,
  'media-literacy': News01Icon,
  // Science
  'space': RocketIcon,
  'climate': Leaf01Icon,
  'everyday-science': FlaskConicalIcon,
  'research-explainers': Dna01Icon,
  'energy': EnergyIcon,
  'future-science': AiChipIcon,
  // Business
  'entrepreneurship': Idea01Icon,
  'marketing': Megaphone01Icon,
  'sales': ChartLineData01Icon,
  'e-commerce': CreditCardIcon,
  'remote-work': AiLaptopIcon,
  'career-growth': Medal01Icon,
  'business-tools': BriefcaseBusinessIcon,
  // Sports
  'training': Dumbbell01Icon,
  'running': RunningShoesIcon,
  'football-soccer': FootballIcon,
  'equipment': BikeIcon,
  'sports-tech': Timer01Icon,
  'performance': Medal01Icon,
}

const explorerMenuItems = verticals.map((vertical) => ({
  label: vertical.label,
  slug: vertical.slug,
  href: `/${vertical.slug}`,
  description: vertical.description,
  color: vertical.color,
}))

const verticalIcons: Record<string, typeof StarIcon> = {
  tech: AiLaptopIcon,
  finance: BankIcon,
  education: BookOpenTextIcon,
  health: HealthIcon,
  business: BriefcaseBusinessIcon,
  lifestyle: Coffee01Icon,
  nature: Tree03Icon,
  sports: FootballIcon,
  travel: PlaneIcon,
  society: UserGroupIcon,
  science: Atom01Icon,
  entertainment: Film01Icon,
}

const verticalHeroImages: Record<string, string> = {
  tech: 'https://images.unsplash.com/photo-1576633587217-5c9b4930956b?auto=format&fit=crop&w=2400&q=86',
  finance: 'https://images.unsplash.com/photo-1723095816936-fcda04ba0ece?auto=format&fit=crop&w=2400&q=86',
  education: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=2200&q=86',
  health: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=2400&q=86',
  business: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=2400&q=86',
  lifestyle: 'https://images.unsplash.com/photo-1484446991649-77f7fbd73f1f?auto=format&fit=crop&w=2400&q=86',
  nature: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2200&q=86',
  sports: 'https://images.unsplash.com/photo-1622629797619-c100e3e67e2e?auto=format&fit=crop&w=2400&q=86',
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2200&q=86',
  society: 'https://images.unsplash.com/photo-1555993538-2befa9c02a60?auto=format&fit=crop&w=2400&q=86',
  science: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=2200&q=86',
  entertainment: 'https://images.unsplash.com/photo-1756726343711-22af8b452649?auto=format&fit=crop&w=2400&q=86',
}

const verticalHeroPositions: Record<string, string> = {
  tech: '62% center',
  finance: '56% center',
  education: '64% center',
  health: '68% center',
  business: '62% center',
  lifestyle: '66% center',
  nature: '58% center',
  sports: '64% center',
  travel: '62% center',
  society: '64% center',
  science: '64% center',
  entertainment: '66% center',
}

const mindriftLegalPages: Record<string, string> = {
  '/legal/privacy': 'Privacy Notice',
  '/legal/terms': 'Toloka Platforms Terms of Use',
  '/legal/addendum': 'Data Processing Addendum',
  '/legal/eligibility-and-geographic-restrictions':
    'Eligibility and Geographic Restrictions',
  '/legal/cookie-notice/': 'Cookie Notice',
}

const overlayHeaderRoutes = [routes.stem, routes.code]

const isHeaderOverlayRoute = (pathname: string) =>
  overlayHeaderRoutes.includes(pathname) ||
  verticals.some((vertical) => pathname === `/${vertical.slug}`)

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <PageFrame />
    </BrowserRouter>
  )
}

function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  useLayoutEffect(() => {
    const html = document.documentElement
    const previousScrollBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'

    if (navigationType === 'POP') {
      window.scrollTo(0, scrollPositions.get(location.key) ?? 0)
    } else if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }

    html.style.scrollBehavior = previousScrollBehavior

    return () => {
      scrollPositions.set(location.key, window.scrollY)
    }
  }, [location.hash, location.key, navigationType])

  return null
}

function PageFrame() {
  const { pathname } = useLocation()
  const isOverlay = isHeaderOverlayRoute(pathname)

  return (
    <main className={cx('page-frame', isOverlay && 'page-frame-overlay')}>
      <SiteHeader key={pathname} />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="legal" element={<LegalHubPage />} />
        <Route path="privacy" element={<FiindtLegalPage page={fiindtLegalPages.find((page) => page.route === '/privacy-policy')!} />} />
        <Route path="project/stem" element={<ProjectPage kind="stem" />} />
        <Route path="project/code" element={<ProjectPage kind="code" />} />
        {fiindtLegalPages.map((page) => (
          <Route
            key={page.route}
            path={page.route.replace(/^\//, '')}
            element={<FiindtLegalPage page={page} />}
          />
        ))}
        {Object.entries(mindriftLegalPages).map(([path, title]) => (
          <Route
            key={path}
            path={path.replace(/^\//, '')}
            element={<LegalPage title={title} />}
          />
        ))}

        <Route path=":vertical/:subNiche/:slug" element={<ArticlePage />} />
        <Route path=":vertical" element={<VerticalPage />} />
        <Route path=":vertical/:subNiche" element={<VerticalSubNichePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </main>
  )
}

function SiteHeader() {
  const { pathname } = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOverDarkHero, setIsOverDarkHero] = useState(false)
  const [isExplorerOpen, setIsExplorerOpen] = useState(false)
  const [isExplorerHoverSuppressed, setIsExplorerHoverSuppressed] = useState(false)
  const explorerRef = useRef<HTMLDivElement>(null)
  const isProjectActive =
    explorerMenuItems.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
  const nav = [['About Us', routes.about]] as const

  useEffect(() => {
    let frame = 0
    const updateHeader = () => {
      frame = 0
      setIsScrolled(window.scrollY > 8)

      const darkHero = document.querySelector(
        '.vertical-media-hero, .media-hero:not(.media-hero-light)',
      )
      const header = document.querySelector<HTMLElement>('.site-header')
      const headerRect = header?.getBoundingClientRect()
      const isOverDarkCard = headerRect
        ? [0.2, 0.5, 0.8].some((position) =>
            document
              .elementsFromPoint(
                headerRect.left + headerRect.width * position,
                headerRect.top + headerRect.height / 2,
              )
              .some((element) => element.closest('.pinned-map-card')),
          )
        : false

      setIsOverDarkHero(
        Boolean(darkHero && darkHero.getBoundingClientRect().bottom > 108) || isOverDarkCard,
      )
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader)
    }

    updateHeader()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [pathname])

  useEffect(() => {
    if (!isExplorerOpen) return

    const closeExplorer = () => {
      setIsExplorerOpen(false)
      setIsExplorerHoverSuppressed(true)
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!explorerRef.current?.contains(event.target as Node)) closeExplorer()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeExplorer()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isExplorerOpen])

  const toggleExplorer = () => {
    setIsExplorerHoverSuppressed(isExplorerOpen)
    setIsExplorerOpen(!isExplorerOpen)
  }

  const closeExplorer = () => {
    setIsExplorerOpen(false)
    setIsExplorerHoverSuppressed(true)
  }

  return (
    <header
      className={cx(
        'site-header',
        isScrolled && 'site-header-scrolled',
        isOverDarkHero && 'site-header-on-dark',
      )}
    >
      <Logo variant={isOverDarkHero ? 'cream' : 'brown'} />
      <div className="header-actions">
        <nav className="desktop-nav" aria-label="Main navigation">
          <div
            className={cx(
              'nav-dropdown',
              isExplorerOpen && 'is-open',
              isExplorerHoverSuppressed && 'is-hover-suppressed',
            )}
            ref={explorerRef}
            onMouseLeave={() => setIsExplorerHoverSuppressed(false)}
          >
            <button
              className={cx('nav-link explorer-trigger', isProjectActive && 'active')}
              type="button"
              aria-haspopup="true"
              aria-expanded={isExplorerOpen}
              aria-controls="explorer-menu"
              onClick={toggleExplorer}
            >
              <HugeiconsIcon icon={ArrowDown01Icon} size={12} strokeWidth={2} />
              Explorer
            </button>
            <div className="project-menu" id="explorer-menu">
              {explorerMenuItems.map((item) => {
                const Icon = verticalIcons[item.slug] ?? StarIcon
                return (
                  <Link
                    className="project-menu-item"
                    to={item.href}
                    key={item.href}
                    onClick={closeExplorer}
                  >
                    <div className="project-menu-icon" style={{ color: item.color }}>
                      <HugeiconsIcon icon={Icon} size={20} strokeWidth={1.6} />
                      <strong>{item.label}</strong>
                    </div>
                    <small>{item.description}</small>
                  </Link>
                )
              })}
            </div>
          </div>
          {nav.map(([label, href]) => (
            <NavLink
              key={href}
              className={({ isActive }) => cx('nav-link', isActive && 'active')}
              to={href}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink className="button button-green" to="/contact">
          Contact
        </NavLink>
      </div>
      <button className="menu-button" type="button" aria-label="Open menu">
        <HugeiconsIcon icon={Menu01Icon} size={18} strokeWidth={2} />
      </button>
    </header>
  )
}

function FiindtLogo({
  variant = 'brown',
  className,
}: {
  variant?: 'brown' | 'cream'
  className?: string
}) {
  return (
    <img
      className={cx('fiindt-logo-image', className)}
      src={variant === 'cream' ? '/logo-cream.svg' : '/logo-brun.svg'}
      alt="Fiindt"
    />
  )
}

function Logo({ variant = 'brown' }: { variant?: 'brown' | 'cream' }) {
  return (
    <Link className="logo" to="/" aria-label="Fiindt home" style={{ textDecoration: 'none' }}>
      <FiindtLogo variant={variant} />
    </Link>
  )
}

function FiindtStats() {
  return (
    <section className="process wrap" style={{ paddingTop: 64, paddingBottom: 64, marginTop: 0 }}>
      <div className="process-heading">
        <h2>
          Why Fiindt exists
          <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 16, whiteSpace: 'nowrap', fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
            Fiindt is built around clarity, structure and practical usefulness.
          </span>
        </h2>
        <p>Fiindt organizes original, research-based guides across focused knowledge verticals to give clear answers on topics the internet does not explain well.</p>
      </div>
      <div className="step-grid">
        {processSteps.map((step) => (
          <article className="step-card" data-tone={step.tone} key={step.title}>
            <div>
              <strong>{step.value}</strong>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
            <HugeiconsIcon icon={step.icon} size={58} strokeWidth={1.4} />
          </article>
        ))}
        <article className="step-card step-cta">
          <div>
            <strong>4</strong>
            <h3>Content layers</h3>
            <p>Vertical → Sub-niche → Category → Article</p>
          </div>
        </article>
      </div>
    </section>
  )
}


function LatestArticles() {
  const articles = [...fiindtArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6)

  return (
    <section style={{ paddingTop: 80, paddingBottom: 64, paddingLeft: 40, paddingRight: 40, marginTop: 0, background: 'var(--cream-2)', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', lineHeight: 1.1, marginBottom: 40 }}>
          Latest from Fiindt
          <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
            Recent resources from the Fiindt editorial system.
          </span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 20 }}>
          {articles.map((article) => {
            const vertical = getVerticalBySlug(toSlug(article.vertical))
            const accentColor = vertical?.color ?? 'var(--brand-green)'
            return (
              <Link
                key={article.id}
                to={getFiindtArticlePath(article)}
                className="card-hover"
                style={{ '--card-accent': accentColor, borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column' } as CSSProperties}
              >
                <p style={{ fontSize: 12, color: 'rgba(67,38,29,.40)', marginBottom: 8, fontWeight: 500 }}>
                  {article.vertical} › {article.subNiche}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ display: 'inline-block', borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 600, background: accentColor, color: '#fff' }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(67,38,29,.40)' }}>{article.readingTime} min read</span>
                </div>
                <h3 className="card-heading card-title">{article.title}</h3>
                <p className="line-clamp-2" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'rgba(67,38,29,.55)', flex: 1 }}>
                  {article.excerpt}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 20, fontSize: 12, color: 'rgba(67,38,29,.40)' }}>
                  <time>{formatArticleDate(article.publishedAt)}</time>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    'Discover',
    'Investigate',
    'Verify',
    'Structure',
    'Update',
  ]
  return (
    <section className="journey wrap journey-5step" style={{ marginTop: 0, paddingTop: 80, paddingBottom: 80 }}>
      <JourneySection
        title="How Fiindt works"
        subtitle="Fiindt structures every topic like a clear knowledge tree, from broad domains to precise resources."
        steps={steps}
        detail={(_, i) => [
          'Find real questions, knowledge gaps and outdated answers.',
          'Collect sources, examples, tools, data and user signals.',
          'Check relevance, accuracy and practical usefulness.',
          'Organize findings into verticals, sub-niches, categories and articles.',
          'Refresh important content when tools, habits or facts evolve.',
        ][i]}
      />
    </section>
  )
}

function NewsletterCTA() {
  return (
    <section className="wrap" style={{ marginTop: 0, paddingTop: 64, paddingBottom: 64, fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        background: '#26221e', padding: '32px 40px', minHeight: 132,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
      }}>
        <div>
          <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#fbf4eb', lineHeight: 1.1 }}>
            Get answers before everyone else.
            <span style={{ display: 'block', color: 'rgba(251,244,235,.35)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              New investigations published every week across 12 domains.
            </span>
          </h2>
        </div>
        <form style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,.08)', borderRadius: 999,
          padding: '6px 6px 6px 18px', flexShrink: 0,
        }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{
              width: 220, border: 0, outline: 0, background: 'transparent',
              fontSize: 14, color: '#fbf4eb', fontFamily: "'Inter', sans-serif",
            }}
          />
          <button type="submit" style={{
            background: '#47c971', color: '#fff', border: 0,
            borderRadius: 999, padding: '9px 18px',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
          }}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <NewHomeHero />
      <FiindtStats />
      <Projects />
      <LatestArticles />
      <HowItWorks />
      <HomeFAQ />
      <NewsletterCTA />
    </>
  )
}

function SearchBar({
  ariaLabel,
  placeholder,
  className,
}: {
  ariaLabel: string
  placeholder: string
  className?: string
}) {
  return (
    <form
      className={cx('site-search', className)}
      onSubmit={(event) => event.preventDefault()}
    >
      <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={2} />
      <input aria-label={ariaLabel} placeholder={placeholder} />
      <button type="submit">Search</button>
    </form>
  )
}

function NewHomeHero() {
  const heroVerticals = [
    {n:'Tech',          dot:'#3B5BDB',bg:'#E8EEFF',tx:'#2840B0'},
    {n:'Nature',        dot:'#47c971',bg:'#DFFFDC',tx:'#1E7A3A'},
    {n:'Health',        dot:'#F04828',bg:'#FFE0D8',tx:'#B82000'},
    {n:'Science',       dot:'#00A890',bg:'#D8FFF5',tx:'#007060'},
    {n:'Education',     dot:'#D97706',bg:'#FFF3D0',tx:'#92500E'},
    {n:'Entertainment', dot:'#E03870',bg:'#FFE0EE',tx:'#A01040'},
    {n:'Lifestyle',     dot:'#F07020',bg:'#FFECD8',tx:'#B84000'},
    {n:'Finance',       dot:'#5BAF1A',bg:'#EAFFD0',tx:'#347808'},
    {n:'Society',       dot:'#9B55D0',bg:'#F5E8FF',tx:'#6E35A8'},
    {n:'Sports',        dot:'#E04030',bg:'#FFE2D8',tx:'#A81808'},
    {n:'Travel',        dot:'#C8980A',bg:'#FFF5CC',tx:'#8A6000'},
    {n:'Business',      dot:'#CC5830',bg:'#FFE8D8',tx:'#963010'},
  ]
  const SNAPS = [[0,1,2],[3,4,5],[6,7,8],[9,10,11]]

  const [, setCurSnap] = useState(0)
  const [slots, setSlots] = useState([
    heroVerticals[0], heroVerticals[1], heroVerticals[2]
  ])
  const [animating, setAnimating] = useState([false,false,false])

  useEffect(() => {
    const init = setTimeout(() => {
      const interval = setInterval(() => {
        setCurSnap(prev => {
          const next = (prev + 1) % 4
          const nextGroup = SNAPS[next];
          [0,1,2].forEach(i => {
            setTimeout(() => {
              setAnimating(a => { const n=[...a]; n[i]=true; return n })
              setTimeout(() => {
                setSlots(s => {
                  const ns=[...s]
                  ns[i] = heroVerticals[nextGroup[i]]
                  return ns
                })
                setAnimating(a => { const n=[...a]; n[i]=false; return n })
              }, 220)
            }, i * 900)
          })
          return next
        })
      }, 5000)
      return () => clearInterval(interval)
    }, 2500)
    return () => clearTimeout(init)
  }, [])

  return (
    <section style={{
      minHeight:'calc(100svh - 52px)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      textAlign:'center',
      paddingTop:'32px', paddingBottom:'32px',
      paddingLeft:'40px', paddingRight:'40px',
      background:'var(--cream)', fontFamily:"'Inter', sans-serif"
    }}>
      <p style={{
        fontSize:'clamp(48px,6vw,80px)', fontWeight:700,
        lineHeight:.93, letterSpacing:'-.046em',
        color:'var(--text-dark)', marginBottom:8,
        fontFamily:"'Inter', sans-serif"
      }}>
        The answers
      </p>

      <div style={{
        display:'flex', alignItems:'center',
        justifyContent:'center', flexWrap:'wrap',
        gap:10, marginBottom:8, minHeight:56
      }}>
        {slots.map((v,i) => (
          <span key={i} style={{
            display:'inline-flex', alignItems:'center', gap:7,
            borderRadius:999, padding:'14px 28px',
            fontSize:21, fontWeight:600, letterSpacing:'-.02em',
            background:v.bg, color:v.tx,
            opacity: animating[i] ? 0 : 1,
            transform: animating[i] ? 'translateY(8px)' : 'translateY(0)',
            transition:'opacity .22s ease, transform .22s ease',
            fontFamily:"'Inter', sans-serif"
          }}>
            <span style={{
              width:12, height:12, borderRadius:'50%',
              background:v.dot, flexShrink:0, display:'inline-block'
            }}/>
            {v.n}
          </span>
        ))}
        <span style={{
          fontSize:'clamp(48px,6vw,80px)', fontWeight:700,
          lineHeight:.93, letterSpacing:'-.046em',
          color:'var(--text-dark)', fontFamily:"'Inter', sans-serif"
        }}>
          &amp; more
        </span>
      </div>

      <p style={{
        fontSize:'clamp(48px,6vw,80px)', fontWeight:700,
        lineHeight:.93, letterSpacing:'-.046em',
        color:'rgba(67,38,29,.32)', marginBottom:28,
        fontFamily:"'Inter', sans-serif"
      }}>
        never gave you.
      </p>

      <p style={{
        fontSize:18, color:'rgba(67,38,29,.50)',
        lineHeight:1.52, maxWidth:460, marginBottom:32,
        letterSpacing:'-.01em', fontFamily:"'Inter', sans-serif"
      }}>
        We investigate the questions Internet never answered clearly —
        with data, sources, surveys and original analysis across every
        domain that matters.
      </p>

      <SearchBar
        className="site-search-home"
        ariaLabel="Search a question, topic or domain"
        placeholder="Search a question, topic or domain..."
      />

      <p style={{
        fontSize:10, color:'rgba(67,38,29,.28)',
        letterSpacing:'.06em', textTransform:'uppercase',
        fontFamily:"'Inter', sans-serif"
      }}>
        12 domains · 50+ sub-niches · original research only
      </p>
    </section>
  )
}

function Projects() {
  return (
    <section className="projects wrap" style={{ paddingTop: 64, paddingBottom: 100, marginTop: 0 }}>
      <div className="section-heading centered">
        <h2>
          Explore verticals that match your needs
          <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
            Open a focused domain and browse its guides, categories and resources.
          </span>
        </h2>
      </div>
      <div className="project-grid">
        {verticals.map((vertical) => {
          const Icon = verticalIcons[vertical.slug] ?? StarIcon

          return (
            <Link
              className="project-card vertical-project-card"
              style={{ '--vertical-color': vertical.color } as CSSProperties}
              to={`/${vertical.slug}`}
              key={vertical.slug}
            >
              <div className="project-title">
                <h3>{vertical.label}</h3>
                <span className="project-icon" aria-hidden="true">
                  <HugeiconsIcon icon={Icon} size={31} strokeWidth={1.85} />
                </span>
              </div>
              <p className="vertical-project-description">{vertical.description}</p>
              <div className="project-footer">
                <span>{vertical.subNiches.length} sub-niches</span>
                <span>Explore →</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}


function HomeFAQ() {
  return (
    <section className="faq wrap" style={{ paddingTop: 80, paddingBottom: 64, marginTop: 0 }}>
      <h2>
        Frequently asked questions
        <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
          Everything you need to know about how Fiindt works.
        </span>
      </h2>
      <FAQList items={homeFaqs} />
    </section>
  )
}

function FAQList({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="faq-list">
      {items.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <article className={cx('faq-item', isOpen && 'open')} key={faq.question}>
            <button
              className="faq-question"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="faq-symbol" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
              <span>{faq.question}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}

function VerticalFAQ({ verticalSlug }: { verticalSlug: string }) {
  const items = verticalFaqs[verticalSlug] ?? []

  if (!items.length) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="faq vertical-faq wrap">
      <h2>
        Frequently asked questions
        <span>
          Clear answers to common questions about how Fiindt researches, explains and updates this topic.
        </span>
      </h2>
      <FAQList items={items} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  )
}

function JourneySection({
  title,
  subtitle,
  steps,
  detail,
}: {
  title: string
  subtitle?: string
  steps: string[]
  detail: (step: string, index: number) => string
}) {
  return (
    <>
      <div className="section-heading">
        <h2>
          {title}
          {subtitle && (
            <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>{subtitle}</span>
          )}
        </h2>
      </div>
      <div className="journey-track">
        {steps.map((step, index) => (
          <article key={step}>
            <span>{index + 1}</span>
            <p>{step}</p>
          </article>
        ))}
      </div>
      <div className="timeline-list">
        {steps.map((step, index) => (
          <article key={step}>
            <strong>Step {index + 1}</strong>
            <h3>{step}</h3>
            <p>{detail(step, index)}</p>
          </article>
        ))}
      </div>
    </>
  )
}


function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

function getFiindtArticlePath(article: FiindtArticle) {
  return `/${toSlug(article.vertical)}/${toSlug(article.subNiche)}/${article.slug}`
}

function VerticalPage() {
  const params = useParams()
  const currentVertical = getVerticalBySlug(params.vertical)

  if (!currentVertical) {
    return <HomePage />
  }

  const articles = getArticlesByVertical(currentVertical.slug)
  const featuredArticle =
    articles.find((article) => article.featured) ?? articles[0]
  const latestArticles = articles
    .filter((article) => article.id !== featuredArticle?.id)
    .slice(0, 6)
  const importedArticles = fiindtArticles
    .filter((article) => toSlug(article.vertical) === currentVertical.slug)
    .slice(0, 6)
  const mostReadArticles = articles
    .filter((article) => article.id !== featuredArticle?.id)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 3)

  return (
    <div
      className="vertical-page"
      style={
        {
          '--vertical-color': currentVertical.color,
          '--vertical-hero-position':
            verticalHeroPositions[currentVertical.slug] ?? '62% center',
        } as CSSProperties
      }
    >
      <section className="vertical-media-hero">
        <img
          src={verticalHeroImages[currentVertical.slug] ?? verticalHeroImages.tech}
          alt=""
        />
        <div className="wrap">
          <div className="vertical-hero-copy">

            <h1>{currentVertical.label}</h1>
            <p>{currentVertical.description}</p>
            <SearchBar
              className="site-search-vertical"
              ariaLabel={`Search ${currentVertical.label}`}
              placeholder={`Search ${currentVertical.label} guides, tools or workflows...`}
            />
            <div className="vertical-actions">
              <a
                className="vertical-button vertical-button-primary"
                href="#sub-niches"
              >
                Explore {currentVertical.label} topics
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={2} />
              </a>
              <a
                className="vertical-button vertical-button-outline"
                href="#latest-vertical-articles"
              >
                Latest articles
              </a>
            </div>
          </div>
        </div>
      </section>

      <PinnedCardsMap
        id="sub-niches"
        title={`Open a focused ${currentVertical.label} file`}
        description="Each sub-niche narrows the vertical into a practical area with its own guides, categories and resources."
        items={currentVertical.subNiches.map((subNiche) => {
          const Icon = subNicheIcons[subNiche.slug] ?? StarIcon
          return {
            title: subNiche.label,
            description: subNiche.description,
            href: `/${currentVertical.slug}/${subNiche.slug}`,
            icon: <HugeiconsIcon icon={Icon} size={26} strokeWidth={1.8} />,
            color: currentVertical.color,
          }
        })}
        accentColor={currentVertical.color}
      />

      <section className="vertical-featured wrap">
        <div className="vertical-section-heading centered">
          <h2>
            Featured guide
            <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              A selected resource from the {currentVertical.label} archive.
            </span>
          </h2>
        </div>
        <div className="vertical-featured-grid">
          <Link
            to={`/${currentVertical.slug}/${featuredArticle.subNicheSlug}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(253,249,245,0.78)',
              border: '1px solid rgba(67,38,29,.08)',
              borderRadius: 16,
              padding: '28px 32px',
              boxShadow: '0 2px 16px rgba(67,38,29,.05)',
              textDecoration: 'none',
              minHeight: 320,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(67,38,29,.50)', lineHeight: 1.4 }}>
              {currentVertical.label} › {featuredArticle.subNiche}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
              <span style={{
                padding: '5px 12px',
                borderRadius: 999,
                background: currentVertical.color,
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}>
                {featuredArticle.category}
              </span>
              <span style={{ fontSize: 13, color: 'rgba(67,38,29,.45)' }}>{featuredArticle.readingTime} min read</span>
            </div>
            <h3 style={{ marginTop: 20, fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 700, color: '#26221e', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
              {featuredArticle.title}
            </h3>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.55, color: 'rgba(67,38,29,.60)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
              {featuredArticle.excerpt}
            </p>
            <time style={{ marginTop: 'auto', paddingTop: 28, fontSize: 14, color: 'rgba(67,38,29,.40)' }}>
              {formatArticleDate(featuredArticle.publishedAt)}
            </time>
          </Link>
          <aside style={{ paddingTop: 4 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#26221e', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Most Read Articles
            </h3>
            <div>
              {mostReadArticles.map((article, index) => (
                <Link
                  to={`/${currentVertical.slug}/${article.subNicheSlug}`}
                  key={article.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2.5rem 1fr',
                    gap: 12,
                    padding: '14px 0',
                    borderTop: index === 0 ? 'none' : '1px solid rgba(67,38,29,.08)',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: 28, fontWeight: 900, lineHeight: 1, color: `color-mix(in srgb, ${currentVertical.color} 28%, transparent)`, paddingTop: 2 }}>
                    {index + 1}
                  </span>
                  <span>
                    <b style={{ display: 'block', fontSize: 14, fontWeight: 700, lineHeight: 1.35, color: '#26221e' }}>
                      {article.title}
                    </b>
                    <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px', fontSize: 12, color: 'rgba(67,38,29,.42)', marginTop: 6 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <HugeiconsIcon icon={AlarmClockIcon} size={13} strokeWidth={2} />
                        {article.readingTime} min
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <HugeiconsIcon icon={Calendar01Icon} size={13} strokeWidth={2} />
                        {formatArticleDate(article.publishedAt)}
                      </span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="latest-vertical-articles" className="latest-vertical wrap">
        <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', lineHeight: 1.1, marginBottom: 40, maxWidth: 1100, marginInline: 'auto' }}>
          Latest {currentVertical.label} articles
          <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
            Recent resources from the {currentVertical.label} editorial archive.
          </span>
        </h2>
        <div className="article-grid">
          {(importedArticles.length ? importedArticles : latestArticles).map((article) =>
            'slug' in article ? (
              <FiindtArticleCard article={article} key={article.id} />
            ) : (
              <VerticalArticleCard article={article} key={article.id} />
            ),
          )}
        </div>
      </section>

      <VerticalFAQ verticalSlug={currentVertical.slug} />
      <VerticalNewsletter vertical={currentVertical.label} />
    </div>
  )
}

function FiindtArticleCard({ article }: { article: FiindtArticle }) {
  const vertical = getVerticalBySlug(toSlug(article.vertical))

  return (
    <Link
      className="vertical-article-card card-hover"
      style={{ '--article-color': vertical?.color ?? '#2563eb', '--card-accent': vertical?.color ?? '#2563eb' } as CSSProperties}
      to={getFiindtArticlePath(article)}
    >
      <p className="vertical-article-path">
        {article.vertical} › {article.subNiche}
      </p>
      <div className="vertical-article-meta">
        <span>{article.category}</span>
        <small>{article.readingTime} min read</small>
      </div>
      <h3 className="card-heading card-title">{article.title}</h3>
      <p className="line-clamp-2" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'rgba(67,38,29,.55)', flex: 1 }}>{article.excerpt}</p>
      <time>{formatArticleDate(article.publishedAt)}</time>
    </Link>
  )
}

function ArticlePage() {
  const { vertical, subNiche, slug } = useParams()
  const article = fiindtArticles.find(
    (item) =>
      toSlug(item.vertical) === vertical &&
      toSlug(item.subNiche) === subNiche &&
      item.slug === slug,
  )

  if (!article) {
    return <VerticalSubNichePage />
  }

  const currentVertical = getVerticalBySlug(toSlug(article.vertical))
  const paragraphs = article.content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <article
      className="article-page wrap"
      style={{ '--article-color': currentVertical?.color ?? '#2563eb' } as CSSProperties}
    >
      <header>
        <p>{article.vertical} › {article.subNiche}</p>
        <h1>{article.title}</h1>
        <div>
          <span>{article.category}</span>
          <small>{article.readingTime} min read</small>
          <time>{formatArticleDate(article.publishedAt)}</time>
        </div>
      </header>
      <section>
        {paragraphs.map((line, index) => {
          if (line.startsWith('### ')) return <h3 key={index}>{line.replace('### ', '')}</h3>
          if (line.startsWith('## ')) return <h2 key={index}>{line.replace('## ', '')}</h2>
          return <p key={index}>{line}</p>
        })}
      </section>
    </article>
  )
}

function VerticalArticleCard({ article }: { article: VerticalArticle }) {
  const vertical = getVerticalBySlug(article.vertical)

  return (
    <Link
      className="vertical-article-card card-hover"
      style={{ '--article-color': vertical?.color ?? '#2563eb', '--card-accent': vertical?.color ?? '#2563eb' } as CSSProperties}
      to={`/${article.vertical}/${article.subNicheSlug}`}
    >
      <p className="vertical-article-path">
        {vertical?.label ?? article.vertical} › {article.subNiche}
      </p>
      <div className="vertical-article-meta">
        <span>{article.category}</span>
        <small>{article.readingTime} min read</small>
      </div>
      <h3 className="card-heading card-title">{article.title}</h3>
      <p className="line-clamp-2" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'rgba(67,38,29,.55)', flex: 1 }}>{article.excerpt}</p>
      <time>{formatArticleDate(article.publishedAt)}</time>
    </Link>
  )
}

function VerticalSubNichePage() {
  const { vertical: verticalSlug, subNiche } = useParams()
  const vertical = getVerticalBySlug(verticalSlug)

  if (!vertical) {
    return <HomePage />
  }

  const currentSubNiche =
    getSubNicheBySlug(vertical.slug, subNiche) ?? vertical.subNiches[0]
  const articles = getArticlesByNiche(vertical.slug, currentSubNiche.slug)
  const articleCatalog = currentSubNiche.categories.map((category) => ({
    category,
    articles: articles.filter((article) => article.category === category),
  }))
  const Icon = subNicheIcons[currentSubNiche.slug as keyof typeof subNicheIcons] ?? StarIcon

  return (
    <div
      className="vertical-page"
      style={{ '--vertical-color': vertical.color } as CSSProperties}
    >
      <section className="vertical-sub-hero wrap">
        <Link to={`/${vertical.slug}`}>{vertical.label}</Link>
        <span>
          <HugeiconsIcon icon={Icon} size={34} strokeWidth={1.7} />
        </span>
        <h1>{currentSubNiche.label}</h1>
        <p>{currentSubNiche.description}</p>
      </section>
      <section className="sub-category-grid wrap">
        {currentSubNiche.categories.map((category) => (
          <article key={category}>
            <h2>{category}</h2>
            <p>
              Focused guides, checklists and practical resources for {category.toLowerCase()}.
            </p>
          </article>
        ))}
      </section>
      <section className="niche-catalog wrap">
        <div className="vertical-section-heading">

          <h2>
            {currentSubNiche.label} articles by category
            <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              Browse all guides organized by topic within {currentSubNiche.label.toLowerCase()}.
            </span>
          </h2>
        </div>
        <div className="niche-catalog-list">
          {articleCatalog.map(({ category, articles: categoryArticles }) => (
            <article className="niche-category-row" key={category}>
              <div>
                <h3>{category}</h3>
                <p>{categoryArticles.length} article{categoryArticles.length > 1 ? 's' : ''}</p>
              </div>
              <div>
                {(categoryArticles.length ? categoryArticles : articles.slice(0, 1)).map((article) => (
                  <Link to={`/${article.vertical}/${article.subNicheSlug}`} key={article.id}>
                    {article.title}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="latest-vertical wrap">
        <div className="vertical-section-heading">
          <h2>
            Latest in {currentSubNiche.label}
            <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              Recently published guides and resources in {currentSubNiche.label.toLowerCase()}.
            </span>
          </h2>
        </div>
        <div className="article-grid">
          {(articles.length ? articles : getArticlesByVertical(vertical.slug).slice(0, 3)).map((article) => (
            <VerticalArticleCard article={article} key={article.id} />
          ))}
        </div>
      </section>
      <VerticalNewsletter vertical={currentSubNiche.label} />
    </div>
  )
}

function VerticalNewsletter({ vertical }: { vertical: string }) {
  return (
    <section className="vertical-newsletter wrap">
      <div style={{ background: '#26221e', padding: '32px 40px', minHeight: 132, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
        <div>
          <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#fbf4eb', lineHeight: 1.1, margin: 0 }}>
            Follow {vertical} updates
            <span style={{ display: 'block', color: 'rgba(251,244,235,.35)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              Get new {vertical.toLowerCase()} guides, resources and practical decisions from Fiindt.
            </span>
          </h2>
        </div>
        <form style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.08)', borderRadius: 999, padding: '6px 6px 6px 18px', flexShrink: 0 }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{ width: 220, border: 0, outline: 0, background: 'transparent', fontSize: 14, color: '#fbf4eb', fontFamily: 'inherit' }}
          />
          <button type="submit" style={{ background: '#47c971', color: '#fff', border: 0, borderRadius: 999, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

function ProjectPage({ kind }: { kind: 'stem' | 'code' }) {
  const isStem = kind === 'stem'
  const detailCards = isStem
    ? [
        ['Biology', 'Create sequence, scoring, and validation challenges.'],
        ['Engineering', 'Model simulations with thermal, mechanical, or system constraints.'],
        ['Physics', 'Build multi-step scenarios with boundary and eigenvalue checks.'],
        ['Mathematics', 'Design reasoning tasks that require rigorous numerical validation.'],
      ]
    : [
        ['Code quality review', 'Evaluate generated code for correctness and maintainability.'],
        ['Test case writing', 'Design tests that capture edge cases and behavior.'],
        ['Bug identification', 'Find logical errors automated tests may miss.'],
        ['Architecture assessment', 'Judge whether generated systems are scalable and clean.'],
      ]

  return (
    <>
      <MediaHero
        image={isStem ? assets.stemHero : assets.codeHero}
        title={
          isStem
            ? 'Turn scientific expertise into smarter AI'
            : 'AI coding projects. Review & improve AI-generated code'
        }
        subtitle={
          isStem
            ? 'Join remote scientific projects and design research-level challenges.'
            : 'Help build safer, more reliable AI with senior-level code judgment.'
        }
        cta="Apply now"
      />
      <section className="project-detail wrap">
        <article>
          <h2>About the project</h2>
          <p>
            {isStem
              ? 'Professionals in STEM domains create, verify, and refine complex scientific tasks that help AI reason through difficult problems.'
              : 'Experienced developers review AI-generated solutions, compare implementations, spot bugs, and explain what should improve.'}
          </p>
        </article>
        <div className="detail-stats">
          {(isStem
            ? ['Up to $6,000+/month', 'Flexible remote project', 'Research-level AI tasks', 'Performance bonus']
            : ['Up to $90 per hour', 'Flexible remote project', 'Global community', 'Hands-on AI experience']
          ).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      <section className="split-section wrap">
        <h2>{isStem ? 'How you might contribute' : 'Types of AI code review tasks'}</h2>
        <div className="mini-grid detail">
          {detailCards.map(([title, copy]) => (
            <article className="mini-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      {!isStem ? <LanguageCloud /> : null}
      <EarningPotential isStem={isStem} />
    </>
  )
}

function LanguageCloud() {
  return (
    <section className="language-cloud wrap">
      <h2>Programming languages in demand</h2>
      <p>Python is required for most opportunities and often unlocks higher-paid work.</p>
      <div>
        {['Python', 'C', 'Java', 'TypeScript', 'C#', 'Rust', 'Go', 'JavaScript', 'C++', 'Kotlin', 'Ruby', 'PHP'].map(
          (lang) => (
            <span key={lang}>{lang}</span>
          ),
        )}
      </div>
    </section>
  )
}

function EarningPotential({ isStem }: { isStem: boolean }) {
  const values = isStem
    ? ['$3,000/mo', '$6,000/mo', '$12,000/mo']
    : ['$3,600/mo', '$7,200/mo', '$12,600/mo']
  return (
    <section className="earning wrap">
      <h2>Earning potential</h2>
      <p>
        Estimates depend on specialization, time contributed, and accepted
        tasks.
      </p>
      <div>
        {values.map((value, index) => (
          <article key={value}>
            <span>Up to</span>
            <strong>{value}</strong>
            <p>{[10, 20, 35][index]} hours/week</p>
          </article>
        ))}
      </div>
    </section>
  )
}


function MediaHero({
  image,
  title,
  subtitle,
  cta,
  tone = 'dark',
}: {
  image: string
  title: string
  subtitle: string
  cta?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <section className={cx('media-hero', tone === 'light' && 'media-hero-light')}>
      <img src={image} alt="" />
      <div className="wrap">

        <h1>{title}</h1>
        <p>{subtitle}</p>
        {cta ? (
          <Link className="button button-green" to={primaryExplorePath}>
            {cta}
          </Link>
        ) : null}
      </div>
    </section>
  )
}

function FAQPage() {
  return (
    <>
      <PageHero
        className="faq-page-hero"
        title="Frequently asked questions"
        subtitle="Clear answers about Fiindt, its research approach and every knowledge vertical."
      />
      <section className="faq-directory wrap">
        <section className="faq faq-directory-section" id="general">
          <h2>
            About Fiindt
            <span>General questions about the platform, its research and its content structure.</span>
          </h2>
          <FAQList items={homeFaqs} />
        </section>
        {verticals.map((vertical) => (
          <section
            className="faq faq-directory-section"
            id={`${vertical.slug}-faq`}
            key={vertical.slug}
          >
            <h2>
              {vertical.label}
              <span>Questions about Fiindt’s {vertical.label.toLowerCase()} research and guidance.</span>
            </h2>
            <FAQList items={verticalFaqs[vertical.slug] ?? []} />
          </section>
        ))}
      </section>
    </>
  )
}

function LegalPage({ title }: { title: string }) {
  return (
    <>
      <PageHero

        title={title}
        subtitle="Reference page for platform policies and contributor information."
      />
      <section className="legal wrap">
        <article>
          <HugeiconsIcon icon={LegalDocument01Icon} size={42} />
          <h2>{title}</h2>
          <p>
            This cloned route is present so the site navigation, footer, and
            legal links behave like the original. Replace this placeholder with
            approved legal copy before production use.
          </p>
        </article>
      </section>
    </>
  )
}

const legalHubGroups = [
  {
    label: 'Essentials',
    pages: ['Legal Notice', 'Privacy Policy', 'Cookie Policy', 'Terms of Use', 'Editorial Policy', 'Content Disclaimer'],
  },
  {
    label: 'Transparency',
    pages: ['Affiliate Disclosure', 'Advertising Policy', 'AI Policy'],
  },
  {
    label: 'Rights & community',
    pages: ['Copyright Policy', 'Content Reporting', 'Community Guidelines', 'Accessibility Statement'],
  },
  {
    label: 'Future services',
    pages: ['Course and Paid Content Terms', 'Privacy Preferences'],
  },
]

const legalHubIcon: Record<string, typeof LegalDocument01Icon> = {
  'Legal Notice': Home01Icon,
  'Privacy Policy': Shield01Icon,
  'Cookie Policy': ComputerTerminal01Icon,
  'Terms of Use': Certificate01Icon,
  'Editorial Policy': BookOpen01Icon,
  'Content Disclaimer': Idea01Icon,
  'Affiliate Disclosure': Megaphone01Icon,
  'Advertising Policy': StarIcon,
  'AI Policy': AiChipIcon,
  'Copyright Policy': LegalDocument01Icon,
  'Content Reporting': Message01Icon,
  'Community Guidelines': UserGroupIcon,
  'Course and Paid Content Terms': CreditCardIcon,
  'Privacy Preferences': Settings01Icon,
  'Accessibility Statement': Certificate01Icon,
}

function LegalHubPage() {
  const findPage = (label: string) => fiindtLegalPages.find((p) => p.title === label)

  return (
    <div className="fiindt-legal-page wrap">
      <header className="fiindt-legal-header">
        <h1>Legal Center</h1>
        <p>All policies, terms, disclosures and statements governing the use of Fiindt.</p>
      </header>
      <section className="legal-hub">
        {legalHubGroups.map((group) => (
          <div key={group.label} className="legal-hub-group">
            <p className="legal-hub-group-label">{group.label}</p>
            <div className="legal-hub-grid">
              {group.pages.map((label) => {
                const page = findPage(label)
                if (!page) return null
                const Icon = legalHubIcon[label] ?? LegalDocument01Icon
                return (
                  <Link to={page.route} key={label} className="legal-hub-card">
                    <span className="legal-hub-card-icon">
                      <HugeiconsIcon icon={Icon} size={26} strokeWidth={1.4} />
                    </span>
                    <span className="legal-hub-card-body">
                      <span className="legal-hub-card-title">{page.title}</span>
                      <span className="legal-hub-card-desc">{page.subtitle}</span>
                    </span>
                    <span className="legal-hub-card-arrow">→</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

function legalSectionIcon(id: string): typeof LegalDocument01Icon {
  // Legal Notice
  if (id.includes('site-publisher')) return Home01Icon
  if (id.includes('hosting') || id.includes('technical-provider')) return Settings01Icon
  if (id.includes('editorial-responsibility')) return BookOpen01Icon
  if (id.includes('intellectual-property')) return Shield01Icon
  if (id.includes('contact-and-reporting')) return Message01Icon
  if (id.includes('applicable-law')) return JusticeScale01Icon
  // Privacy
  if (id.includes('introduction')) return Idea01Icon
  if (id.includes('data-we-may-collect')) return FolderLibraryIcon
  if (id.includes('why-we-use-data')) return Compass01Icon
  if (id.includes('legal-bases')) return LegalDocument01Icon
  if (id.includes('services-and-providers')) return ComputerTerminal01Icon
  if (id.includes('cookies-and-similar')) return Shield01Icon
  if (id.includes('international-transfers')) return GlobeIcon
  if (id.includes('retention-periods')) return Timer01Icon
  if (id.includes('security')) return Shield01Icon
  if (id.includes('your-rights')) return Certificate01Icon
  if (id.includes('exercise-rights')) return UserGroupIcon
  if (id.includes('policy-updates')) return Calendar01Icon
  // Cookies
  if (id.includes('what-cookies')) return Idea01Icon
  if (id.includes('why-cookies')) return Compass01Icon
  if (id.includes('cookie-categories')) return FolderLibraryIcon
  if (id.includes('cookie-list')) return LegalDocument01Icon
  if (id.includes('consent-management')) return Settings01Icon
  if (id.includes('browser-controls')) return ComputerTerminal01Icon
  if (id.includes('cookie-updates')) return Calendar01Icon
  // Terms
  if (id.includes('acceptance')) return Certificate01Icon
  if (id.includes('description')) return BookOpen01Icon
  if (id.includes('user-obligations')) return UserGroupIcon
  if (id.includes('accounts')) return BriefcaseBusinessIcon
  if (id.includes('content')) return News01Icon
  if (id.includes('paid-services')) return CreditCardIcon
  if (id.includes('-ip-')) return Shield01Icon
  if (id.includes('liability')) return JusticeScale01Icon
  if (id.includes('termination')) return StarIcon
  if (id.includes('governing-law')) return LegalDocument01Icon
  // Editorial
  if (id.includes('mission')) return Compass01Icon
  if (id.includes('editorial-structure')) return FolderLibraryIcon
  if (id.includes('creation-process')) return FlaskConicalIcon
  if (id.includes('sources')) return Search01Icon
  if (id.includes('sensitive-topics')) return Atom01Icon
  if (id.includes('corrections')) return Message01Icon
  if (id.includes('independence')) return StarIcon
  // Other pages
  if (id.includes('affiliate') || id.includes('advertis') || id.includes('sponsor')) return Megaphone01Icon
  if (id.includes('recommend') || id.includes('partner') || id.includes('editorial-independen')) return StarIcon
  if (id.includes('ai') || id.includes('human') || id.includes('automat') || id.includes('transparen')) return AiChipIcon
  if (id.includes('limitation') || id.includes('data-and-ai')) return BinocularsIcon
  if (id.includes('paid') || id.includes('course') || id.includes('payment') || id.includes('refund')) return CreditCardIcon
  if (id.includes('community') || id.includes('moderat') || id.includes('allowed') || id.includes('prohibited')) return UserGroupIcon
  if (id.includes('purpose') || id.includes('scope')) return Idea01Icon
  if (id.includes('report') || id.includes('complaint') || id.includes('contact')) return Message01Icon
  if (id.includes('access') || id.includes('commit') || id.includes('current-meas')) return Certificate01Icon
  if (id.includes('future') || id.includes('account-req')) return BriefcaseBusinessIcon
  if (id.includes('known') || id.includes('external-link') || id.includes('third')) return GlobeIcon
  if (id.includes('manage') || id.includes('preference') || id.includes('current-status')) return Settings01Icon
  if (id.includes('data-request')) return FolderLibraryIcon
  return LegalDocument01Icon
}

function FiindtLegalPage({ page }: { page: LegalPageRecord }) {
  const [activeId, setActiveId] = useState(page.sections[0]?.id ?? '')
  const clicking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (clicking.current) return
      const elements = page.sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
      const offset = 140
      let current = elements[0]?.id ?? ''
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= offset) current = el.id
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page.sections])

  return (
    <div className="fiindt-legal-page wrap">
      {/* Page header */}
      <header className="fiindt-legal-header">
        <h1>{page.title}</h1>
        <p>{page.subtitle}</p>
        {page.lastUpdatedLabel && <small>{page.lastUpdatedLabel}</small>}
      </header>

      {/* TOC + content */}
      <div className="fiindt-legal-body">
        <aside>
          {page.sections.map((section) => (
            <a
              href={`#${section.id}`}
              key={section.id}
              data-active={section.id === activeId ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault()
                setActiveId(section.id)
                clicking.current = true
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setTimeout(() => { clicking.current = false }, 1200)
              }}
            >{section.title}</a>
          ))}
          {page.relatedLink && (
            <Link to={page.relatedLink.href} style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(67,38,29,.10)', color: 'var(--brand-green)', fontSize: 13, fontWeight: 600, display: 'block', letterSpacing: '-0.01em' }}>
              {page.relatedLink.label} →
            </Link>
          )}
        </aside>
        <div>
          {page.sections.map((section) => (
            <article id={section.id} key={section.id}>
              <span className="legal-section-icon" aria-hidden="true">
                <HugeiconsIcon icon={legalSectionIcon(section.id)} size={32} strokeWidth={1.4} />
              </span>
              <h2>{section.title}</h2>
              {section.intro && <p className="section-intro">{section.intro}</p>}
              {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {section.items?.length ? <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul> : null}
              {section.subsections?.map((subsection) => (
                <section key={subsection.id}>
                  <h3>{subsection.title}</h3>
                  {subsection.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {subsection.items?.length ? (
                    <ul>{subsection.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  ) : null}
                </section>
              ))}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

import PinnedCardsMap, { type PinnedCardItem } from './components/PinnedCardsMap'

function ContactPage() {
  const contactPaths: PinnedCardItem[] = [
    { title: 'General support', description: 'Questions, feedback, access issues or technical help.', icon: <HugeiconsIcon icon={Search01Icon} size={26} strokeWidth={1.8} />, color: '#3B82F6' },
    { title: 'Partnership', description: 'Collaborations, sponsors or editorial opportunities.', icon: <HugeiconsIcon icon={BriefcaseBusinessIcon} size={26} strokeWidth={1.8} />, color: '#47c971' },
    { title: 'Editorial', description: 'Sources, corrections or topic suggestions.', icon: <HugeiconsIcon icon={BookOpenTextIcon} size={26} strokeWidth={1.8} />, color: '#ffc524' },
  ]

  return (
    <>
      <section style={{ minHeight: 'calc(100svh - 52px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 60px' }}>
          <h1 style={{ fontSize: 'clamp(48px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.046em', color: '#26221e', lineHeight: 1.1, margin: '0 auto 20px' }}>
            Tell us what needs to be clearer.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, letterSpacing: '-0.01em', color: 'rgba(67,38,29,.55)', margin: '0 auto 32px', maxWidth: 540 }}>
            Questions, corrections, partnerships, topic suggestions, and editorial feedback all start here.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:hello@fiindt.com" className="contact-btn-primary">Email us</a>
            <a href="mailto:hello@fiindt.com" className="contact-btn-outline">hello@fiindt.com</a>
          </div>
        </div>
      </section>

      <div style={{ paddingBottom: 80, marginTop: -48 }}>
        <PinnedCardsMap
          title="How to reach us."
          description="Choose the right path for your message."
          items={contactPaths}
        />
      </div>

      <section style={{ paddingTop: 64, paddingBottom: 64, background: 'var(--cream-2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 60px', display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px,2.8vw,38px)', fontWeight: 600, letterSpacing: '-0.03em', color: '#26221e', lineHeight: 1.1, margin: 0 }}>
              Clear context gets better replies.
              <span style={{ display: 'block', color: 'rgba(67,38,29,.32)', marginTop: 6, fontSize: '0.75em', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
                Help us help you faster.
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Add the article URL', 'Be specific', 'Share useful context', 'Include sources'].map((rule) => (
              <span key={rule} style={{ fontSize: 12, fontWeight: 600, padding: '5px 11px', borderRadius: 999, background: 'rgba(67,38,29,.06)', color: 'rgba(67,38,29,.45)', letterSpacing: '-0.01em' }}>
                {rule}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function PageHero({
  className,
  title,
  subtitle,
}: {
  className?: string
  title: string
  subtitle: string
}) {
  return (
    <MayneFadeIn>
      <section className={cx('page-hero wrap', className)}>
        <div>

          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>
    </MayneFadeIn>
  )
}

function Footer() {
  const half = Math.ceil(verticals.length / 2)
  const columns = [
    verticals.slice(0, half).map(v => [v.label, `/${v.slug}`]),
    verticals.slice(half).map(v => [v.label, `/${v.slug}`]),
    [
      ['Home', '/'],
      ['About', routes.about],
      ['FAQ', routes.faq],
      ['Contact', '/contact'],
    ],
    [
      ['Legal Notice', '/legal-notice'],
      ['Privacy Policy', '/privacy-policy'],
      ['Cookie Policy', '/cookie-policy'],
      ['Terms', '/terms'],
      ['Editorial Policy', '/editorial-policy'],
      ['Legal Hub', '/legal'],
    ],
  ]
  return (
    <footer className="footer wrap">
      <Link to="/" aria-label="Fiindt home" style={{ textDecoration: 'none', alignSelf: 'start', marginTop: -14 }}>
        <FiindtLogo className="fiindt-logo-footer" />
      </Link>
      <div className="footer-links">
        {columns.map((links, index) => (
          <div className="footer-column" key={index}>
            {links.map(([label, href]) => (
              <Link to={href} key={label}>{label}</Link>
            ))}
          </div>
        ))}
      </div>
      <small>© 2026 Fiindt</small>
    </footer>
  )
}

export default App
